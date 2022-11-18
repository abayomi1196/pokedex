import React, { useContext, useEffect, useState } from 'react'
import PokeAPI, { INamedApiResource, IPokemon } from 'pokeapi-typescript'
import { getIdFromUrl, isOG } from '../../utils'

export enum Field {
  favourite = 'favourite',
}

type Filters = { [key in Field]: FilterValue }
type FilterValue = boolean | string | string[] | undefined

interface PokemonContextData {
  pokemon: INamedApiResource<IPokemon>[]
  query: string
  search: (query: string) => void
  favourites: string[]
  addFavourite: (pokemon: INamedApiResource<IPokemon>) => void
  removeFavourite: (pokemon: INamedApiResource<IPokemon>) => void
  filters: Filters
  addFilter: (field: Field, value: FilterValue) => void
  removeFilter: (field: Field) => void
}

export const PokemonContext = React.createContext<PokemonContextData | undefined>(undefined)

interface PokemonProviderProps {
  children: React.ReactNode
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
  water = "water",
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
  const [data, setData] = useState<INamedApiResource<IPokemon>[]>()
  const [pokemon, setPokemon] = useState<INamedApiResource<IPokemon>[]>()
  const [favourites, setFavourites] = useState<string[]>([])
  const [query, setQuery] = useState<string>('')
  const [filters, setFilters] = useState<Filters>({} as Filters)
  const [error, setError] = useState<any>()

  useEffect(() => {
    fetchPokemon()
  }, [])

  useEffect(() => {
    filterData()
  }, [filters, query, data])

  const filterData = async () => {
    if (!data) {
      return
    }

    let filteredData = [...data]
    const fields = Object.keys(filters) as Field[]

    for (const field of fields) {
      switch (field) {
        case Field.favourite: {
          const value = filters[field]
          if (value) {
            filteredData = filteredData.filter((pokemon) => favourites.includes(pokemon.name))
          } else if (value === false) {
            filteredData = filteredData.filter((pokemon) => !favourites.includes(pokemon.name))
          }
          break
        }
      }
    }

    if (query) {
      filteredData = filteredData.filter((pokemon) => pokemon.name.includes(query))
    }

    filteredData.sort((a, b) => {
      const aId = getIdFromUrl(a.url)
      const bId = getIdFromUrl(b.url)

      if (aId > bId) {
        return 1
      } else {
        return -1
      }
    })

    setPokemon(filteredData)
  }

  const fetchPokemon = async () => {
    try {
      const response = await PokeAPI.Pokemon.list(150, 0)
      setData(response.results)
      setPokemon(response.results)
    } catch (error) {
      setError(error)
    }
  }

  const search = (query: string) => {
    setQuery(query)
  }

  function addFavourite(pokemon: INamedApiResource<IPokemon>) {
    setFavourites([...favourites, pokemon.name])
  }

  function removeFavourite(pokemon: INamedApiResource<IPokemon>) {
    setFavourites(favourites.filter((favourite) => favourite !== pokemon.name))
  }

  function addFilter(field: Field, value: FilterValue) {
    const newFilters = {...filters, [field]: value}
    setFilters(newFilters)
  }

  function removeFilter(field: Field) {
    const newFilters = {...filters}
    newFilters[field] = undefined
    setFilters(newFilters)
  }

  if (error) {
    return <div>Error</div>
  }

  if (!pokemon) {
    return <div></div>
  }

  return (
    <PokemonContext.Provider value={{
      pokemon,
      query,
      search,
      favourites,
      addFavourite,
      removeFavourite,
      filters,
      addFilter,
      removeFilter
    }}>
      {children}
    </PokemonContext.Provider>
  )
}

export const usePokemonContext = () => {
  const pokemon = useContext(PokemonContext);

  if (!pokemon) {
    throw Error('Cannot use `usePokemonContext` outside of `PokemonProvider`');
  }

  return pokemon;
}

export default PokemonProvider;