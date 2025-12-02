// Use SQLite for persistence via lib/db/courses.js
let dbModule = null;
let initError = null;
try {
  dbModule = require('../../lib/db/courses');
} catch (err) {
  initError = err;
  console.error('DB initialization error:', err);
}

export default function handler(req, res) {
  if (!dbModule) {
    const message = initError ? String(initError.message || initError) : 'Database not initialized. Run `npm install better-sqlite3`.';
    console.error('Courses API request but DB not ready:', message);
    return res.status(500).json({ success: false, error: message });
  }
  if (req.method === 'GET') {
    try {
      const data = dbModule.getCourses();
      return res.status(200).json({ success: true, data });
    } catch (err) {
      console.error('GET /api/courses error:', err);
      return res.status(500).json({ success: false, error: String(err) });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, level, duration, price, description } = req.body || {};
      if (!name || !level || !duration || price === undefined || price === null) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const created = dbModule.addCourse({
        name,
        level,
        duration,
        price: Number(price),
        students: 0,
        description: description || '',
      });

      return res.status(201).json({ success: true, data: created });
    } catch (err) {
      console.error('POST /api/courses error:', err);
      return res.status(500).json({ success: false, error: String(err) });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Method not allowed' });
}
