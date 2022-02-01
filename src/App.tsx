import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'
import { Routes, Route, Navigate } from 'react-router-dom';
import CssBaseLine from '@mui/material/CssBaseline'
import ProjectsPage from './components/projects/projects-page';
import BetaPokerPage from './components/betapoker/betapoker-page';


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseLine />
        <Routes>
          <Route
            path='/'
            element={<Navigate to='projects' />}
          />
          <Route
            path='/projects'
            element={<ProjectsPage />}
          />
          <Route
            path='/projects/betapoker'
            element={<BetaPokerPage />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
