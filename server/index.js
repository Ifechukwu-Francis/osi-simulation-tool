const express = require('express');
const cors = require('cors');
const initDb = require('./db'); // Use db.js properly

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Hold db connection
let db;

// Initialize DB then start server
initDb().then(database => {
  db = database;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize database:", err);
  process.exit(1);
});

// --- ROUTES ---

// 1. GET all questions (to verify your bank)
app.get('/api/questions', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM questions");
    res.json(rows);
  } catch (err) {
    console.error("GET /api/questions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET the fixed order for the Drag and Drop task
app.get('/api/questions/layers', (req, res) => {
  const layers = [
    "Application", "Presentation", "Session", 
    "Transport", "Network", "Data Link", "Physical"
  ];
  // We send them shuffled so the user has to reorder them
  const shuffled = [...layers].sort(() => Math.random() - 0.5);
  res.json({ correctOrder: layers, shuffled: shuffled });
});


// 2. GET 10 random questions (for quiz)
app.get('/api/questions/random', async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM questions ORDER BY RANDOM() LIMIT 10");
    if (rows.length === 0) {
      return res.status(404).json({ error: "No questions found in the database." });
    }
    res.json(rows);
  } catch (err) {
    console.error("GET /api/questions/random error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 3. POST a new question (from Admin panel)
app.post('/api/questions', async (req, res) => {
  const { question, options, answer } = req.body;

  // Server-side validation
  if (!question || !question.trim()) {
    return res.status(400).json({ error: "Question text is required." });
  }
  if (!Array.isArray(options) || options.length < 4 || options.some(o => !o.trim())) {
    return res.status(400).json({ error: "All four options are required." });
  }
  if (!answer || !answer.trim()) {
    return res.status(400).json({ error: "Answer is required." });
  }
  if (!options.includes(answer)) {
    return res.status(400).json({ error: "Answer must match one of the options exactly." });
  }

  try {
    const result = await db.run(
      `INSERT INTO questions (question, option1, option2, option3, option4, answer)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [question, options[0], options[1], options[2], options[3], answer]
    );
    res.status(201).json({ id: result.lastID, message: "Question saved!" });
  } catch (err) {
    console.error("POST /api/questions error:", err);
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE a question by ID
app.delete('/api/questions/:id', async (req, res) => {
  try {
    await db.run("DELETE FROM questions WHERE id = ?", [req.params.id]);
    res.json({ message: "Question deleted." });
  } catch (err) {
    console.error("DELETE /api/questions error:", err);
    res.status(500).json({ error: err.message });
  }
});
