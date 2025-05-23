import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Personalized Learning',
      description:
        'Get a customized learning plan based on your initial assessment and progress.',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Track Progress',
      description:
        'Monitor your improvement with detailed statistics and visualizations.',
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Earn Achievements',
      description:
        'Stay motivated by earning badges and achievements as you learn.',
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          mb: 4,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Math Learning Platform
        </Typography>
        <Typography variant="h6" paragraph>
          Master mathematics with AI-powered personalized learning
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            backgroundColor: 'white',
            color: '#2196F3',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
          onClick={() => navigate('/assessment')}
        >
          Start Learning
        </Button>
      </Paper>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    color: 'primary.main',
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom align="center">
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Ready to Start Your Math Journey?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/assessment')}
          >
            Take Assessment
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/practice')}
          >
            Start Practice
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Dashboard; 