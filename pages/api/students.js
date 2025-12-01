// GET all students or POST new student
export default function handler(req, res) {
  if (req.method === 'GET') {
    const students = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        level: 'A1',
        joinDate: '2025-01-10',
        courseId: 1,
        progress: 45,
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob@example.com',
        level: 'B1',
        joinDate: '2025-01-05',
        courseId: 2,
        progress: 72,
      },
      {
        id: 3,
        name: 'Carol White',
        email: 'carol@example.com',
        level: 'A1',
        joinDate: '2025-01-15',
        courseId: 1,
        progress: 20,
      },
    ];

    res.status(200).json({ success: true, data: students });
  } else if (req.method === 'POST') {
    const { name, email, level, courseId } = req.body;

    if (!name || !email || !level || !courseId) {
      return res
        .status(400)
        .json({ success: false, error: 'Missing required fields' });
    }

    const newStudent = {
      id: Math.random(),
      name,
      email,
      level,
      courseId,
      joinDate: new Date().toISOString().split('T')[0],
      progress: 0,
    };

    res.status(201).json({ success: true, data: newStudent });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
