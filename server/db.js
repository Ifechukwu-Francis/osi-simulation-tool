const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function initDb() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    // Create Questions Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            option1 TEXT,
            option2 TEXT,
            option3 TEXT,
            option4 TEXT,
            answer TEXT,
            layer INTEGER
        )
    `);

    // Create Feedback Table
    await db.exec(`
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            message TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}

module.exports = initDb;