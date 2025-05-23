import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { generateProblem } from '../services/api';

function Practice() {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('algebra');
  const [difficulty, setDifficulty] = useState('beginner');

  const topics = [
    'algebra',
    'geometry',
    'calculus',
    'statistics',
    'probability',
  ];

  const difficulties = ['beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = async () => {
    setLoading(true);
    setUserAnswer('');
    setShowHint(false);
    setFeedback(null);
    
    try {
      const problem = await generateProblem(selectedTopic, difficulty);
      setCurrentProblem(problem);
    } catch (error) {
      console.error('Error generating problem:', error);
      // Fallback to a default problem if API fails
      setCurrentProblem({
        question: 'Solve for x: 2x + 5 = 13',
        answer: '4',
        hint: 'First, subtract 5 from both sides of the equation.',
        difficulty: 'beginner',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (userAnswer === currentProblem.answer) {
      setFeedback({
        correct: true,
        message: 'Correct! Great job!',
      });
      setStreak(streak + 1);
    } else {
      setFeedback({
        correct: false,
        message: 'Not quite. Try again or use the hint!',
      });
      setStreak(0);
    }
  };

  const handleNext = () => {
    generateNewProblem();
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Generating your next problem...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Practice</Typography>
          <Typography variant="h6" color="primary">
            Streak: {streak}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Topic</InputLabel>
            <Select
              value={selectedTopic}
              label="Topic"
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              {topics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic.charAt(0).toUpperCase() + topic.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={difficulty}
              label="Difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {difficulties.map((diff) => (
                <MenuItem key={diff} value={diff}>
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {currentProblem.question}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <TextField
                fullWidth
                label="Your Answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={feedback?.correct}
              />
              <IconButton
                onClick={() => setShowHint(!showHint)}
                sx={{ ml: 1 }}
                color="primary"
              >
                <HelpOutlineIcon />
              </IconButton>
            </Box>
            <Collapse in={showHint}>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Hint: {currentProblem.hint}
              </Typography>
            </Collapse>
          </CardContent>
        </Card>

        {feedback && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              color: feedback.correct ? 'success.main' : 'error.main',
            }}
          >
            {feedback.correct ? (
              <CheckCircleOutlineIcon sx={{ mr: 1 }} />
            ) : (
              <CancelOutlinedIcon sx={{ mr: 1 }} />
            )}
            <Typography>{feedback.message}</Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          {!feedback?.correct && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!userAnswer}
            >
              Submit
            </Button>
          )}
          {feedback && (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next Problem
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default Practice; 