const sqlite3 = require("sqlite3").verbose(); // enable verbose mode for more detailed error logging

const db = new sqlite3.Database("ideas.db");

// Initialize the table for ideas
db.run(`
    CREATE TABLE IF NOT EXISTS ideas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        idea TEXT,
        votes INTEGER DEFAULT 0
    )
`);

module.exports = db;
