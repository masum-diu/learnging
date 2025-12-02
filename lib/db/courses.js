const path = require('path');
const fs = require('fs');

let db;
try {
  // better-sqlite3 is synchronous and works well for simple local apps
  const Database = require('better-sqlite3');
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const dbPath = path.join(dataDir, 'app.db');

  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  // Ensure courses table exists
  db.prepare(
    `CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      level TEXT,
      duration TEXT,
      price REAL,
      students INTEGER DEFAULT 0,
      description TEXT
    )`
  ).run();
} catch (err) {
  // If better-sqlite3 is not installed, throw a clear error so the API reports it.
  throw new Error(
    'SQLite initialization failed. Please install `better-sqlite3` in the project: `npm install better-sqlite3`\n' +
      String(err)
  );
}

module.exports = {
  getCourses: () => {
    return db.prepare('SELECT * FROM courses ORDER BY id').all();
  },

  addCourse: ({ name, level, duration, price, students = 0, description = '' }) => {
    const stmt = db.prepare(
      'INSERT INTO courses (name, level, duration, price, students, description) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const info = stmt.run(name, level, duration, price, students, description);
    return db.prepare('SELECT * FROM courses WHERE id = ?').get(info.lastInsertRowid);
  },
};
