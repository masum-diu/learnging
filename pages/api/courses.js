// GET all courses or POST new course
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
      },
      {
        id: 2,
        name: 'Intermediate English',
        level: 'B1',
        duration: '10 weeks',
        price: 129.99,
        students: 22,
        description: 'For learners with basic knowledge',
      },
      {
        id: 3,
        name: 'Advanced English',
        level: 'C1',
        duration: '12 weeks',
        price: 159.99,
        students: 18,
        description: 'Advanced grammar and conversation',
      },
    ];
    res.status(200).json({ success: true, data: courses });
  } else if (req.method === 'POST') {
    const { name, level, duration, price, description } = req.body;

    if (!name || !level || !duration || !price) {
      return res
        .status(400)
        .json({ success: false, error: 'Missing required fields' });
    }

    const newCourse = {
      id: Math.random(),
      name,
      level,
      duration,
      price,
      students: 0,
      description: description || '',
    };

    res.status(201).json({ success: true, data: newCourse });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
