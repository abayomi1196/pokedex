import React, { useContext, useEffect, useState, useCallback } from "react";
import PokeAPI, { INamedApiResource, IPokemon } from "pokeapi-typescript";
import { getIdFromUrl, isOG } from "../../utils";

export enum Field {
  favourite = "favourite",
  type = "type"
}

type Filters = { [key in Field]: FilterValue };
type FilterValue = boolean | string | string[] | undefined;

interface PokemonContextData {
  pokemon: INamedApiResource<IPokemon>[];
  query: string;
  selectedTypes: PokemonType[];
  selectType: (type: PokemonType) => void;
  search: (query: string) => void;
  favourites: string[];
  addFavourite: (pokemon: INamedApiResource<IPokemon>) => void;
  removeFavourite: (pokemon: INamedApiResource<IPokemon>) => void;
  filters: Filters;
  addFilter: (field: Field, value: FilterValue) => void;
  removeFilter: (field: Field) => void;
  types: PokemonType[];
}

export const PokemonContext = React.createContext<
  PokemonContextData | undefined
>(undefined);

interface PokemonProviderProps {
  children: React.ReactNode;
}

export enum PokemonType {
  bug = "bug",
  dark = "dark",
  dragon = "dragon",
  electric = "electric",
  fairy = "fairy",
  fighting = "fighting",
  fire = "fire",
  flying = "flying",
  ghost = "ghost",
  grass = "grass",
  ground = "ground",
  ice = "ice",
  normal = "normal",
  poison = "poison",
  psychic = "psychic",
  rock = "rock",
  steel = "steel",
  water = "water"
}

export enum PokemonStat {
  hp = "hp",
  attack = "attack",
  defense = "defense",
  specialAttack = "special-attack",
  specialDefense = "special-defense",
  speed = "speed"
}

const PokemonProvider: React.FC<PokemonProviderProps> = ({ children }) => {
  const [data, setData] = useState<INamedApiResource<IPokemon>[]>();
  const [pokemon, setPokemon] = useState<INamedApiResource<IPokemon>[]>();
  const [favourites, setFavourites] = useState<string[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<PokemonType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({} as Filters);
  const [error, setError] = useState<any>();

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    fetchPokemonTypes();
  }, []);

  useEffect(() => {
    filterData();
  }, [filters, query, selectedTypes]);

  const filterData = async () => {
    if (!data) {
      return;
    }

    let filteredData = [...data];
    const fields = Object.keys(filters) as Field[];

    for (const field of fields) {
      switch (field) {
        case Field.favourite: {
          const value = filters[field];
          if (value) {
            filteredData = filteredData.filter((pokemon) =>
              favourites.includes(pokemon.name)
            );
          } else if (value === false) {
            filteredData = filteredData.filter(
              (pokemon) => !favourites.includes(pokemon.name)
            );
          }
          break;
        }
      }
    }

    if (query) {
      filteredData = filteredData.filter((pokemon) =>
        pokemon.name.includes(query)
      );
    }

    // This implementation isn't the best..but was the best i could come up with without manually redefining important project Type specifications.
    if (selectedTypes.length > 0) {
      filteredData = filteredData.filter(
        (pokemon) =>
          //@ts-ignore
          selectedTypes.includes(pokemon.types[0] as PokemonType) ||
          //@ts-ignore
          (pokemon.types[1] &&
            //@ts-ignore
            selectedTypes.includes(pokemon.types[1] as PokemonType)) ||
          //@ts-ignore
          (pokemon.types[2] &&
            //@ts-ignore
            selectedTypes.includes(pokemon.types[2] as PokemonType))
      );
    }

    filteredData.sort((a, b) => {
      const aId = getIdFromUrl(a.url);
      const bId = getIdFromUrl(b.url);

      if (aId > bId) {
        return 1;
      } else {
        return -1;
      }
    });

    setPokemon(filteredData);
  };

  const fetchPokemon = async () => {
    // had to 'enhance' each Pokemon with a types property to aid/simplify filtering
    try {
      const response = await PokeAPI.Pokemon.list(150, 0);
      const enhancedPokData = response.results.map(async (singleRes) => {
        const singlePokemonData = await PokeAPI.Pokemon.resolve(singleRes.name);

        const singlePokemonTypes = singlePokemonData.types.map(
          (type) => type.type.name
        );

        return {
          ...singleRes,
          types: [...singlePokemonTypes]
        };
      });

      Promise.all(enhancedPokData).then((res) => {
        setData(res);
        setPokemon(res);
      });
    } catch (error) {
      setError(error);
    }
  };

  const fetchPokemonTypes = async () => {
    try {
      const response = await PokeAPI.Type.list();
      const types = response.results.map((item) => item.name);
      setTypes(types as PokemonType[]);
    } catch (error) {
      setError(error);
    }
  };

  const search = (query: string) => {
    setQuery(query);
  };

  const selectType = (type: PokemonType) => {
    if (!selectedTypes.includes(type)) {
      setSelectedTypes((prev) => [...prev, type]);
    } else {
      setSelectedTypes((prev) => prev.filter((item) => item !== type));
    }
  };

  function addFavourite(pokemon: INamedApiResource<IPokemon>) {
    setFavourites([...favourites, pokemon.name]);
  }

  function removeFavourite(pokemon: INamedApiResource<IPokemon>) {
    setFavourites(favourites.filter((favourite) => favourite !== pokemon.name));
  }

  function addFilter(field: Field, value: FilterValue) {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  }

  function removeFilter(field: Field) {
    const newFilters = { ...filters };
    newFilters[field] = undefined;
    setFilters(newFilters);
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!pokemon) {
    return <div></div>;
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        query,
        search,
        selectType,
        selectedTypes,
        favourites,
        addFavourite,
        removeFavourite,
        filters,
        addFilter,
        removeFilter,
        types
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const pokemon = useContext(PokemonContext);

  if (!pokemon) {
    throw Error("Cannot use `usePokemonContext` outside of `PokemonProvider`");
  }

  return pokemon;
};

export default PokemonProvider;
