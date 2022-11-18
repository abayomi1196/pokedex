import { Grid, LinearProgress, Typography } from "@mui/material"

interface PokemonStatsProps {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

const PokemonStats: React.FC<PokemonStatsProps> = ({
  hp,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed
}) => {
  return (
    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
      <Grid item sm={3}><Typography variant="caption">HP</Typography></Grid>
      <Grid item sm={2}><Typography>{hp}</Typography></Grid>
      <Grid item sm={7}><LinearProgress variant="determinate" value={hp / 150 * 100} /></Grid>

      <Grid item sm={3}><Typography variant="caption">Attack</Typography></Grid>
      <Grid item sm={2}><Typography>{attack}</Typography></Grid>
      <Grid item sm={7}><LinearProgress variant="determinate" value={attack / 150 * 100} /></Grid>

      <Grid item sm={3}><Typography variant="caption">Defense</Typography></Grid>
      <Grid item sm={2}><Typography>{defense}</Typography></Grid>
      <Grid item sm={7}><LinearProgress variant="determinate" value={defense / 150 * 100} /></Grid>

      <Grid item sm={3}><Typography variant="caption">Sp. Attack</Typography></Grid>
      <Grid item sm={2}><Typography>{specialAttack}</Typography></Grid>
      <Grid item sm={7}><LinearProgress variant="determinate" value={specialAttack / 200 * 100} /></Grid>

      <Grid item sm={3}><Typography variant="caption">Sp. Defense</Typography></Grid>
      <Grid item sm={2}><Typography>{specialDefense}</Typography></Grid>
      <Grid item sm={7}><LinearProgress variant="determinate" value={specialDefense / 150 * 100} /></Grid>

      <Grid item sm={3}><Typography variant="caption">Speed</Typography></Grid>
      <Grid item sm={2}><Typography>{speed}</Typography></Grid>
      <Grid item sm={7}><LinearProgress variant="determinate" value={speed / 150 * 100} /></Grid>
    </Grid>
  )
}

export default PokemonStats