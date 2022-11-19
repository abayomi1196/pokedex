import React, { ChangeEvent } from "react";
import {
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Box,
  Button,
  IconButton
} from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import PokemonTypeIcon from "../components/PokemonTypeIcon";
import {
  Field,
  usePokemonContext
} from "../components/Contexts/PokemonProvider";
import { Search, FavoriteBorder, Favorite, Close } from "@mui/icons-material";

const Home: React.FC = () => {
  const {
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
  } = usePokemonContext();

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    search(event.target.value);
  }

  const handleToggleFavourites = () => {
    if (filters[Field.favourite]) {
      removeFilter(Field.favourite);
    } else {
      addFilter(Field.favourite, true);
    }
  };

  return (
    <Container maxWidth='lg' sx={{ py: 2 }}>
      <Typography variant='h1'>
        What Pokemon <br />
        are you looking for?
      </Typography>
      <Box
        sx={{
          display: "flex",
          pt: 4,
          pb: 2
        }}
      >
        <TextField
          id='pokemon-search'
          placeholder='Search Pokemon'
          variant='outlined'
          value={query}
          onChange={handleQueryChange}
          InputProps={{
            sx: { pr: 0 },
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => search("")}>
                  <Close />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          startIcon={
            filters[Field.favourite] ? <Favorite /> : <FavoriteBorder />
          }
          color={filters[Field.favourite] ? "primary" : "secondary"}
          sx={{
            flexShrink: 0,
            ml: "2rem"
          }}
          onClick={handleToggleFavourites}
        >
          My Favourites ({favourites.length})
        </Button>
      </Box>

      <Box sx={{ display: "flex", pb: 4, flexWrap: "wrap", gap: "8px" }}>
        {types.map((type, idx) => (
          <Button
            key={type + idx}
            color={selectedTypes.includes(type) ? "primary" : "secondary"}
            onClick={() => {
              selectType(type);
            }}
          >
            <PokemonTypeIcon type={type} sx={{ mr: "8px" }} /> {type}
          </Button>
        ))}
      </Box>

      <Grid container spacing={2}>
        {pokemon.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} key={pokemon.name}>
            <PokemonCard
              pokemon={pokemon}
              isFavourite={favourites.includes(pokemon.name)}
              onAddFavourite={() => addFavourite(pokemon)}
              onRemoveFavourite={() => removeFavourite(pokemon)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
