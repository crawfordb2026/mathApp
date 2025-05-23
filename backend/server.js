const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate math problem based on topic and difficulty
async function generateMathProblem(topic, difficulty) {
  const prompt = `Generate a ${difficulty} level math problem about ${topic}. 
    Include the question, correct answer, and a step-by-step hint.
    Format the response as JSON with the following structure:
    {
      "question": "the math problem",
      "answer": "the correct answer",
      "hint": "step-by-step hint",
      "explanation": "detailed explanation of the solution"
    }`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a math teacher creating problems for students. Always provide clear, step-by-step solutions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    return JSON.parse(response);
  } catch (error) {
    console.error('Error generating problem:', error);
    throw error;
  }
}

// Routes
app.post('/api/generate-problem', async (req, res) => {
  try {
    const { topic, difficulty } = req.body;
    const problem = await generateMathProblem(topic, difficulty);
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate problem' });
  }
});

// Assessment endpoint
app.post('/api/assess', async (req, res) => {
  try {
    const { answers } = req.body;
    
    const prompt = `Based on the following self-assessment answers, provide a learning plan:
    ${JSON.stringify(answers)}
    Format the response as JSON with the following structure:
    {
      "recommendedTopics": ["topic1", "topic2"],
      "difficultyLevel": "beginner/intermediate/advanced",
      "learningPath": ["step1", "step2"]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a math education expert creating personalized learning plans."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const assessment = JSON.parse(completion.choices[0].message.content);
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate assessment' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 