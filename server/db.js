const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initDb() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Questions table — matches exactly what index.js inserts
  await db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      option1  TEXT NOT NULL,
      option2  TEXT NOT NULL,
      option3  TEXT NOT NULL,
      option4  TEXT NOT NULL,
      answer   TEXT NOT NULL
    )
  `);

  // Feedback table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS feedback (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      user      TEXT,
      message   TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

module.exports = initDb;
