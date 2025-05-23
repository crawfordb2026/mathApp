import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { submitAssessment } from '../services/api';

const topics = [
  'Algebra',
  'Geometry',
  'Calculus',
  'Statistics',
  'Probability',
];

function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [learningPlan, setLearningPlan] = useState(null);

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion]: value,
    });
  };

  const handleNext = async () => {
    if (currentQuestion < topics.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);
      try {
        const assessment = await submitAssessment(answers);
        setLearningPlan(assessment);
        setCompleted(true);
      } catch (error) {
        console.error('Error submitting assessment:', error);
        // Fallback to a default learning plan if API fails
        setLearningPlan({
          recommendedTopics: ['Algebra', 'Geometry'],
          difficultyLevel: 'beginner',
          learningPath: ['Start with basic algebra concepts', 'Move on to geometry fundamentals'],
        });
        setCompleted(true);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Analyzing your results...
        </Typography>
      </Container>
    );
  }

  if (completed) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Assessment Complete!
          </Typography>
          <Typography variant="body1" paragraph>
            Based on your answers, we've created a personalized learning plan for you.
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Recommended Topics
            </Typography>
            <List>
              {learningPlan.recommendedTopics.map((topic, index) => (
                <ListItem key={index}>
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Learning Path
            </Typography>
            <List>
              {learningPlan.learningPath.map((step, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${index + 1}. ${step}`} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              href="/practice"
              sx={{ mt: 2 }}
            >
              Start Learning
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Initial Assessment
        </Typography>
        <Typography variant="body1" paragraph>
          Question {currentQuestion + 1} of {topics.length}
        </Typography>
        <Typography variant="h6" gutterBottom>
          How comfortable are you with {topics[currentQuestion]}?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
          >
            <FormControlLabel
              value="beginner"
              control={<Radio />}
              label="Beginner - I'm just starting to learn this topic"
            />
            <FormControlLabel
              value="intermediate"
              control={<Radio />}
              label="Intermediate - I understand the basics but need practice"
            />
            <FormControlLabel
              value="advanced"
              control={<Radio />}
              label="Advanced - I'm comfortable with most concepts"
            />
          </RadioGroup>
        </FormControl>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
          >
            {currentQuestion === topics.length - 1 ? 'Complete' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Assessment; 