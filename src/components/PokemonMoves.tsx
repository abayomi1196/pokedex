import { Divider, Stack, Box, Typography } from "@mui/material"
import { useState } from "react"

interface PokemonMove {
  name: string
  level: number
}

interface PokemonMovesProps {
  moves: PokemonMove[]
}

const PokemonMoves: React.FC<PokemonMovesProps> = ({
  moves
}) => {
  const [levels, setLevels] = useState(organizeByLevel())

  function organizeByLevel() {
    return moves.reduce((accum: { [key: string]: string[]}, move) => {
      const level = move.level.toString()
      if (accum[level]) {
        accum[level].push(move.name)
      } else {
        accum[level] = [move.name]
      }

      return accum
    }, {})
  }

  return (
    <Stack
      direction="column"
      divider={<Divider /> }
    >
      {Object.keys(levels).map((level) => (
        <Box py={2} key={level}>
          <Typography>Level {level}</Typography>
          <Typography variant="caption">{levels[level].join(', ')}</Typography>
        </Box>
      ))}
    </Stack>
  )
}

export default PokemonMoves