// Get available courses for enrollment
export default function handler(req, res) {
  if (req.method === 'GET') {
    const courses = [
      {
        id: 1,
        name: 'Beginner English',
        level: 'A1',
        duration: '8 weeks',
        price: 99.99,
        students: 15,
        description: 'Perfect for absolute beginners',
        rating: 4.8,
        instructor: 'John Smith',
        startDate: '2025-01-15',
        available: true,
      },
      {
        id: 2,
        name: 'Intermediate English',
        level: 'B1',
        duration: '10 weeks',
        price: 129.99,
        students: 22,
        description: 'For learners with basic knowledge',
        rating: 4.7,
        instructor: 'Sarah Johnson',
        startDate: '2025-02-01',
        available: true,
      },
      {
        id: 3,
        name: 'Advanced English',
        level: 'C1',
        duration: '12 weeks',
        price: 159.99,
        students: 18,
        description: 'Advanced grammar and conversation',
        rating: 4.9,
        instructor: 'Michael Brown',
        startDate: '2025-02-15',
        available: true,
      },
    ];

    const { level, search } = req.query;

    let filtered = courses;

    if (level) {
      filtered = filtered.filter((c) => c.level === level);
    }

    if (search) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({ success: true, data: filtered });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
