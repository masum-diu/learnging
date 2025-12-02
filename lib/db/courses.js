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
  
  getCourseById: (id) => {
    return db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
  },

  updateCourse: (id, { name, level, duration, price, students, description }) => {
    // Read existing course to merge fields
    const existing = db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
    if (!existing) return null;

    const updated = {
      name: name !== undefined ? name : existing.name,
      level: level !== undefined ? level : existing.level,
      duration: duration !== undefined ? duration : existing.duration,
      price: price !== undefined ? Number(price) : existing.price,
      students: students !== undefined ? Number(students) : existing.students,
      description: description !== undefined ? description : existing.description,
    };

    const stmt = db.prepare(
      'UPDATE courses SET name = ?, level = ?, duration = ?, price = ?, students = ?, description = ? WHERE id = ?'
    );
    stmt.run(updated.name, updated.level, updated.duration, updated.price, updated.students, updated.description, id);
    return db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
  },

  deleteCourse: (id) => {
    const stmt = db.prepare('DELETE FROM courses WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0;
  },
};
