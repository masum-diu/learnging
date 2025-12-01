// GET all lessons or POST new lesson
export default function handler(req, res) {
  if (req.method === 'GET') {
    const { courseId } = req.query;

    const lessons = [
      {
        id: 1,
        courseId: 1,
        title: 'Greetings and Introductions',
        duration: 45,
        difficulty: 'Beginner',
        content: 'Learn how to introduce yourself and greet others',
        videoUrl: 'https://example.com/lesson1.mp4',
        completed: false,
      },
      {
        id: 2,
        courseId: 1,
        title: 'Basic Numbers and Counting',
        duration: 50,
        difficulty: 'Beginner',
        content: 'Master English numbers from 1 to 100',
        videoUrl: 'https://example.com/lesson2.mp4',
        completed: true,
      },
      {
        id: 3,
        courseId: 1,
        title: 'Days, Months, and Time',
        duration: 55,
        difficulty: 'Beginner',
        content: 'Learn calendar and time expressions',
        videoUrl: 'https://example.com/lesson3.mp4',
        completed: true,
      },
    ];

    const filtered = courseId
      ? lessons.filter((l) => l.courseId === parseInt(courseId))
      : lessons;

    res.status(200).json({ success: true, data: filtered });
  } else if (req.method === 'POST') {
    const { courseId, title, duration, difficulty, content, videoUrl } =
      req.body;

    if (!courseId || !title || !duration) {
      return res
        .status(400)
        .json({ success: false, error: 'Missing required fields' });
    }

    const newLesson = {
      id: Math.random(),
      courseId,
      title,
      duration,
      difficulty: difficulty || 'Beginner',
      content: content || '',
      videoUrl: videoUrl || '',
      completed: false,
    };

    res.status(201).json({ success: true, data: newLesson });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
