// GET, UPDATE, or DELETE a specific student
export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const student = {
      id: parseInt(id),
      name: 'Alice Johnson',
      email: 'alice@example.com',
      level: 'A1',
      joinDate: '2025-01-10',
      courseId: 1,
      progress: 45,
      completedLessons: 11,
      totalLessons: 24,
      assessmentScores: [75, 82, 78],
    };

    res.status(200).json({ success: true, data: student });
  } else if (req.method === 'PUT') {
    const { name, email, level, progress } = req.body;

    const updatedStudent = {
      id: parseInt(id),
      name: name || 'Alice Johnson',
      email: email || 'alice@example.com',
      level: level || 'A1',
      progress: progress || 45,
    };

    res.status(200).json({ success: true, data: updatedStudent });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ success: true, message: `Student ${id} deleted` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
