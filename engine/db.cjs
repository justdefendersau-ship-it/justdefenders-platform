/**
 * JustDefenders ©
 * File: db.cjs
 * Description: SQLite database layer
 */

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("C:/dev/justdefenders/data.db");

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS saved_builds (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      part TEXT,
      data TEXT
    )
  `);
});

module.exports = db;