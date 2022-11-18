import { Box, Divider, Stack, Typography } from "@mui/material"
import { IChainLink, INamedApiResource, IPokemonSpecies } from "pokeapi-typescript"
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { getIdFromUrl } from "../utils";

interface PokemonEvolutionProps {
  name: string
  evolutions: IChainLink[]
}

const PokemonEvolution: React.FC<PokemonEvolutionProps> = ({
  name,
  evolutions
}) => {
  return (
    <Stack
      spacing={5}
      divider={<Divider />}
    >
      {!evolutions.length && (
        <Typography>{name} does not have any evolutions.</Typography>
      )}

      {[...Array(evolutions.length)].map((_, index) => (
        <EvolutionChain
            key={evolutions[index].species.name}
            from={evolutions[index].species}
            to={evolutions[index].evolves_to}
          />
      ))}
    </Stack>
  )
}

interface EvolutionChainProps {
  from: INamedApiResource<IPokemonSpecies>
  to: IChainLink[]
}

const EvolutionChain: React.FC<EvolutionChainProps> = ({
  from,
  to,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          flexBasis: '50%'
        }}
      >
        <Evolution
          name={from.name}
          url={from.url}
        />
      </Box>

      <Box
        sx={{
          flexBasis: '50%'
        }}
      >
        {to.map((link) => (
          <Box
            key={link.species.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ArrowForwardRoundedIcon />

            <Box
              sx={{
                alignSelf: 'center',
                flex: 1
              }}
            >
              <Evolution
                name={link.species.name}
                url={link.species.url}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

interface EvolutionProps {
  name: string,
  url: string
}

const Evolution: React.FC<EvolutionProps> = ({
  name,
  url
}) => {
  const id = getIdFromUrl(url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          backgroundImage: 'url("/pokeball.svg")',
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          filter: 'brightness(0.8)',
          position: 'absolute',
          height: '100%',
          width: '100%'
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          component="img"
          height={150}
          src={imageUrl}
        />
        <Typography align="center">{name}</Typography>
      </Box>
    </Box>
  )
}

export default PokemonEvolution