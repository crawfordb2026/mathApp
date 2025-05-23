import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Math Learning Platform
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/assessment">
            Assessment
          </Button>
          <Button color="inherit" component={RouterLink} to="/practice">
            Practice
          </Button>
          <Button color="inherit" component={RouterLink} to="/progress">
            Progress
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 