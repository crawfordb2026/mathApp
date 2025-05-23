import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Practice from './pages/Practice';
import Progress from './pages/Progress';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 