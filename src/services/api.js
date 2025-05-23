import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const generateProblem = async (topic, difficulty) => {
  try {
    const response = await axios.post(`${API_URL}/generate-problem`, {
      topic,
      difficulty,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating problem:', error);
    throw error;
  }
};

export const submitAssessment = async (answers) => {
  try {
    const response = await axios.post(`${API_URL}/assess`, { answers });
    return response.data;
  } catch (error) {
    console.error('Error submitting assessment:', error);
    throw error;
  }
}; 