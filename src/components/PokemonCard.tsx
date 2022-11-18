import { Box, Card, CardActionArea, CardHeader, CardContent, CardMedia, Skeleton, Fade, Dialog, ThemeProvider } from "@mui/material"
import { PokemonStat, PokemonType } from "./Contexts/PokemonProvider"
import { useEffect, useRef, useState } from "react"
import PokemonModal from "./PokemonModal";
import { baseTheme, getTheme } from "../theme";
import PokeAPI, { IChainLink, INamedApiResource, IPokemon } from "pokeapi-typescript";
import { getIdFromUrl, isOG } from "../utils";

interface PokemonCardProps {
  pokemon: INamedApiResource<IPokemon>
  isFavourite: boolean
  onAddFavourite: () => void
  onRemoveFavourite: () => void
}

const DURATION = 1000;

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavourite,
  onAddFavourite,
  onRemoveFavourite
}) => {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(baseTheme)
  const [isVisible, setIsVisible] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [types, setTypes] = useState<PokemonType[]>([])
  const [experience, setExperience] = useState<number>()
  const [height, setHeight] = useState<number>()
  const [weight, setWeight] = useState<number>()
  const [moves, setMoves] = useState<any>()
  const [abilities, setAbilities] = useState<string[]>()
  const [hp, setHp] = useState<number>()
  const [attack, setAttack] = useState<number>()
  const [defense, setDefense] = useState<number>()
  const [specialAttack, setSpecialAttack] = useState<number>()
  const [specialDefense, setSpecialDefense] = useState<number>()
  const [speed, setSpeed] = useState<number>()
  const [description, setDescription] = useState<string>()
  const [evolutions, setEvolutions] = useState<IChainLink[]>()
  const ref = useRef<HTMLDivElement>(null)

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const id = getIdFromUrl(pokemon.url)
  const number = `#${('000' + id).slice(-3)}`
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting)
    )

    observer.observe(ref.current)
  }, [ref.current])

  useEffect(() => {
    // only fetch data for pokemon in view
    if (!isVisible) {
      return
    }

    PokeAPI.Pokemon.resolve(name)
      .then((pokemon) => {
        const types = pokemon.types.map((type) => type.type.name)
        const abilities = pokemon.abilities.map((ability) => ability.ability.name.replace('-', ' '))
        const theme = getTheme(types[0] as PokemonType)

        setTypes(types as PokemonType[])
        setTheme(theme)
        setExperience(pokemon.base_experience)
        setHeight(pokemon.height)
        setWeight(pokemon.weight)
        setAbilities(abilities)

        for (const stat of pokemon.stats) {
          switch (stat.stat.name) {
            case PokemonStat.hp:
              setHp(stat.base_stat)
              break

            case PokemonStat.attack:
              setAttack(stat.base_stat)
              break

            case PokemonStat.defense:
              setDefense(stat.base_stat)
              break

            case PokemonStat.specialAttack:
              setSpecialAttack(stat.base_stat)
              break

            case PokemonStat.specialDefense:
              setSpecialDefense(stat.base_stat)
              break

            case PokemonStat.speed:
              setSpeed(stat.base_stat)
              break
          }
        }

        const moves = pokemon.moves
          .filter((resource) => {
            return resource.version_group_details.some((version) => version.version_group.name === 'emerald')
          })
          .map((resource) => {
            const version = resource.version_group_details.find((version) => version.version_group.name === 'emerald')

            return {
              name: resource.move.name.replace('-', ' '),
              level: version!.level_learned_at
            }
          })
          .sort((a, b) => {
            if (a.level === b.level) {
              return 0
            } else if (a.level > b.level) {
              return 1
            } else {
              return -1
            }
          })

        setMoves(moves)

        return PokeAPI.PokemonSpecies.resolve(pokemon.species.name)
      })
      .then((species) => {
        const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'en' && flavor.version.name === 'emerald')
        setDescription(description?.flavor_text)

        const id = getIdFromUrl(species.evolution_chain.url)

        return PokeAPI.EvolutionChain.resolve(id)
      })
      .then((evolutions) => {
        const chain: IChainLink[] = []
        let link: IChainLink | undefined = evolutions.chain
        recurse(link)

        function recurse(link: IChainLink) {
          // only respect the OG pokemon
          if (!link.evolves_to.length) {
            return
          }

          link.evolves_to = link.evolves_to.filter((link) => isOG(link.species.url))

          // in some cases, non-OG pokemon evolve into OG pokemon (like Pichu)
          // don't include non-OG pokemon in our chain, but still process
          // their evolutions
          if (isOG(link.species.url)) {
            chain.push(link)
          }

          for (const child of link.evolves_to) {
            recurse(child)
          }
        }

        setEvolutions(chain)
      })
      .finally(() => setLoading(false))
  }, [isVisible, pokemon.url])

  function handleToggleFavourite() {
    if (isFavourite) {
      onRemoveFavourite()
    } else {
      onAddFavourite()
    }
  }

  function handleCardClick() {
    setIsDialogOpen(true)
  }

  function handleCloseDialog() {
    setIsDialogOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Card ref={ref}>
        <Fade in={loading} timeout={{ enter: 0, exit: DURATION }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height="100%"
            width="100%"
            sx={{ position: 'absolute', backgroundColor: '#dde4e4' }}
          />
        </Fade>

        <CardActionArea onClick={handleCardClick}>
          <CardHeader title={name} subheader={number}/>

          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Box
                sx={{
                  backgroundImage: 'url("/pokeball.svg")',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  height: '15rem',
                  width: '75%'
                }}
              >
                <Fade in={!loading} timeout={DURATION}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={imageUrl}
                  />
                </Fade>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        open={isDialogOpen}
        fullWidth={true}
        maxWidth="sm"
        scroll="body"
        onBackdropClick={handleCloseDialog}
        onClose={handleCloseDialog}
      >
        {loading ? (
          <div></div>
        ) : (
          <PokemonModal
            name={name}
            types={types}
            imageUrl={imageUrl}
            experience={experience!}
            height={height!}
            weight={weight!}
            moves={moves!}
            abilities={abilities!}
            hp={hp!}
            attack={attack!}
            defense={defense!}
            specialAttack={specialAttack!}
            specialDefense={specialDefense!}
            speed={speed!}
            description={description!}
            evolutions={evolutions!}
            isFavourite={isFavourite}
            onToggleFavourite={handleToggleFavourite}
            onClose={handleCloseDialog}
          />
        )}
      </Dialog>
    </ThemeProvider>
  )
}

export default PokemonCard