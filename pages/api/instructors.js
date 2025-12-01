// GET all instructors or POST new instructor
export default function handler(req, res) {
  if (req.method === 'GET') {
    const instructors = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        specialization: 'Grammar and Writing',
        experience: 8,
        rating: 4.8,
        students: 45,
        certifications: ['TEFL', 'CELTA'],
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        specialization: 'Conversation and Pronunciation',
        experience: 6,
        rating: 4.9,
        students: 38,
        certifications: ['TESOL', 'DELTA'],
      },
      {
        id: 3,
        name: 'Michael Brown',
        email: 'michael@example.com',
        specialization: 'Business English',
        experience: 10,
        rating: 4.7,
        students: 52,
        certifications: ['TEFL', 'MBA'],
      },
    ];

    res.status(200).json({ success: true, data: instructors });
  } else if (req.method === 'POST') {
    const { name, email, specialization, experience, certifications } = req.body;

    if (!name || !email || !specialization) {
      return res
        .status(400)
        .json({ success: false, error: 'Missing required fields' });
    }

    const newInstructor = {
      id: Math.random(),
      name,
      email,
      specialization,
      experience: experience || 0,
      rating: 0,
      students: 0,
      certifications: certifications || [],
    };

    res.status(201).json({ success: true, data: newInstructor });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
