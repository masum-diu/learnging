// GET, UPDATE, or DELETE a specific course
export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Mock data - replace with database query
    const course = {
      id: parseInt(id),
      name: 'Beginner English',
      level: 'A1',
      duration: '8 weeks',
      price: 99.99,
      students: 15,
      description: 'Perfect for absolute beginners',
      lessons: 24,
      instructor: 'John Smith',
      startDate: '2025-01-15',
    };

    res.status(200).json({ success: true, data: course });
  } else if (req.method === 'PUT') {
    const { name, level, duration, price, description } = req.body;

    const updatedCourse = {
      id: parseInt(id),
      name: name || 'Beginner English',
      level: level || 'A1',
      duration: duration || '8 weeks',
      price: price || 99.99,
      description: description || '',
    };

    res.status(200).json({ success: true, data: updatedCourse });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ success: true, message: `Course ${id} deleted` });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
