import React from 'react';
import { ThemeProvider } from '@mui/material';
import PokemonProvider from './components/Contexts/PokemonProvider';
import Home from './pages/Home';
import { baseTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <PokemonProvider>
        <Home />
      </PokemonProvider>
    </ThemeProvider>
  );
}

export default App;
