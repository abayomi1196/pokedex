import { createTheme } from "@mui/material";
import { PokemonType } from "../components/Contexts/PokemonProvider";

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    white: true
    loading: true
  }
}

const greenLight = '#71ccb2'
const greenDark = '#269b79'
const yellowLight = '#f1cf77'
const yellowDark = '#d0a843'
const redLight = '#ea7571'
const redDark = '#c44f4b'
const blueLight = '#86bdf9'
const blueDark = '#497db6'
const purpleLight = '#a19cba'
const purpleDark = '#6d5fb4'
const pinkLight = '#f7ced3'
const pinkDark = '#de808b'
const brownLight = '#ceb182'
const brownDark = '#bc8939'
const greyLight = '#dde4e4'
const greyDark = '#bcc4c4'

const greenGradient = createGradient(greenLight, greenDark)
const yellowGradient = createGradient(yellowLight, yellowDark)
const redGradient = createGradient(redLight, redDark)
const blueGradient = createGradient(blueLight, blueDark)
const purpleGradient = createGradient(purpleLight, purpleDark)
const pinkGradient = createGradient(pinkLight, pinkDark)
const brownGradient = createGradient(brownLight, brownDark)
const greyGradient = createGradient(greyLight, greyDark)

function createGradient(light: string, dark: string) {
  return `linear-gradient(to right bottom, ${light}, ${dark} 120%)`
}

export const baseTheme = createTheme({
  palette: {
    secondary: {
      main: '#F5F5F5'
    }
  },
  typography: {
    fontFamily: '"Nunito", sans-serif',
    h1: {
      fontSize: '2rem',
      color: '#1F242D',
      fontWeight: 700
    },
    body1: {
      color: '#43484E',
      fontWeight: 700
    },
    caption: {
      fontSize: '1rem'
    },
    button: {
      fontWeight: 700
    }
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: 0,
          textTransform: 'capitalize',
        },
        title: {
          fontWeight: 700
        },
        subheader: {
          opacity: .7,
          fontSize: '1.4rem',
          fontWeight: 700
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingTop: 0
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
          position: 'relative',
          color: '#fff'
        },
      },
      variants: [
        {
          props: {variant: 'white' },
          style: {
            background: '#fff',
            color: 'grey'
          }
        },
      ]
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '30px',
          color: '#fff'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '3rem',
          paddingBottom: 0,
          paddingTop: 0,
          fontWeight: 700,
          textTransform: 'capitalize'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          color: '#fff',
          textTransform: 'capitalize',
          height: '28px',
          padding: '0 0.5rem'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        fullWidth: true
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',
          borderRadius: '20rem',
        },
        notchedOutline: {
          borderColor: 'transparent',
        },
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: '20rem',
          borderWidth: '1px',
          borderColor: 'transparent',
          borderStyle: 'solid',
          transitionDeration: 'unset'
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: '#F5F5F5',
            borderColor: 'rgba(0, 0, 0, 0.87)'
          }
        }
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorSecondary: {
          color: '#c5c5c5',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }
      }
    },
  }
})

export const greenTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: greenDark
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: greenGradient,
        }
      }
    }
  }
})

export const yellowTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: yellowDark
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: yellowGradient,
        }
      }
    }
  }
})

export const redTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: redDark
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: redGradient,
        }
      }
    }
  }
})

export const blueTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: blueDark
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: blueGradient,
        }
      }
    }
  }
})

export const purpleTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: purpleDark
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: purpleGradient,
        }
      }
    }
  }
})

export const pinkTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: pinkDark
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: pinkGradient,
        }
      }
    }
  }
})

export const brownTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: brownDark
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: brownGradient,
        }
      }
    }
  }
})

export const greyTheme = createTheme(baseTheme, {
  palette: {
    primary: {
      main: greyLight
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: greyGradient,
        }
      }
    }
  }
})

export function getTheme(type: PokemonType) {
  switch (type) {
    case PokemonType.bug:
    case PokemonType.flying:
    case PokemonType.grass:
      return greenTheme

    case PokemonType.electric:
    case PokemonType.fighting:
      return yellowTheme

    case PokemonType.fire:
    case PokemonType.dragon:
      return redTheme

    case PokemonType.ice:
    case PokemonType.normal:
    case PokemonType.steel:
    case PokemonType.water:
      return blueTheme

    case PokemonType.poison:
    case PokemonType.dark:
    case PokemonType.ghost:
      return purpleTheme

    case PokemonType.psychic:
    case PokemonType.fairy:
      return pinkTheme

    case PokemonType.ground:
    case PokemonType.rock:
      return brownTheme
  }
}