const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --- DATABASE LOGIC ---

// Function to load questions from the JSON file
const loadQuestions = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading questions.json:", err);
    return []; // Return empty array if file is missing or broken
  }
};

// --- ROUTES ---

// 1. Get 10 Random Questions
app.get('/api/questions/random', (req, res) => {
  const questionBank = loadQuestions();
  
  if (questionBank.length === 0) {
    return res.status(500).json({ error: "Question bank is empty or not found." });
  }

  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);
  res.json(selected);
});

// 2. Add a new question (for your Admin UI)
app.post('/api/questions', (req, res) => {
  const questionBank = loadQuestions();
  const newQuestion = { id: Date.now(), ...req.body };
  
  questionBank.push(newQuestion);
  
  // Save back to the file
  fs.writeFileSync(
    path.join(__dirname, 'questions.json'), 
    JSON.stringify(questionBank, null, 2)
  );
  
  res.status(201).json(newQuestion);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
