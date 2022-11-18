import React, { useState } from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'
import { PokemonType } from './Contexts/PokemonProvider'
import { ReactComponent as BugIcon } from '../assets/icons/bug.svg'
import { ReactComponent as DarkIcon } from '../assets/icons/dark.svg'
import { ReactComponent as DragonIcon } from '../assets/icons/dragon.svg'
import { ReactComponent as ElectricIcon } from '../assets/icons/electric.svg'
import { ReactComponent as FairyIcon } from '../assets/icons/fairy.svg'
import { ReactComponent as FightingIcon } from '../assets/icons/fighting.svg'
import { ReactComponent as FireIcon } from '../assets/icons/fire.svg'
import { ReactComponent as FlyingIcon } from '../assets/icons/flying.svg'
import { ReactComponent as GhostIcon } from '../assets/icons/ghost.svg'
import { ReactComponent as GrassIcon } from '../assets/icons/grass.svg'
import { ReactComponent as GroundIcon } from '../assets/icons/ground.svg'
import { ReactComponent as IceIcon } from '../assets/icons/ice.svg'
import { ReactComponent as NormalIcon } from '../assets/icons/normal.svg'
import { ReactComponent as PoisonIcon } from '../assets/icons/poison.svg'
import { ReactComponent as PsychicIcon } from '../assets/icons/psychic.svg'
import { ReactComponent as RockIcon } from '../assets/icons/rock.svg'
import { ReactComponent as SteelIcon } from '../assets/icons/steel.svg'
import { ReactComponent as WaterIcon } from '../assets/icons/water.svg'

interface PokemonTypeIconProps extends SvgIconProps {
  type: PokemonType
}

const PokemonTypeIcon: React.FC<PokemonTypeIconProps> = ({
  type,
  ...props
}) => {
  const [icon, setIcon] = useState<React.FC>(getIcon())

  function getIcon() {
    switch (type) {
      case PokemonType.bug:
        return BugIcon
      case PokemonType.dark:
        return DarkIcon
      case PokemonType.dragon:
        return DragonIcon
      case PokemonType.electric:
        return ElectricIcon
      case PokemonType.fairy:
        return FairyIcon
      case PokemonType.fighting:
        return FightingIcon
      case PokemonType.fire:
        return FireIcon
      case PokemonType.flying:
        return FlyingIcon
      case PokemonType.ghost:
        return GhostIcon
      case PokemonType.grass:
        return GrassIcon
      case PokemonType.ground:
        return GroundIcon
      case PokemonType.ice:
        return IceIcon
      case PokemonType.poison:
        return PoisonIcon
      case PokemonType.psychic:
        return PsychicIcon
      case PokemonType.rock:
        return RockIcon
      case PokemonType.steel:
        return SteelIcon
      case PokemonType.water:
        return WaterIcon
      case PokemonType.normal:
      default:
        return NormalIcon
    }
  }

  return (
    <SvgIcon component={icon} inheritViewBox {...props} />
  )
}

export default PokemonTypeIcon