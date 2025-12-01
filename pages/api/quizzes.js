// GET quizzes or POST new quiz
export default function handler(req, res) {
  if (req.method === 'GET') {
    const { courseId, studentId } = req.query;

    const quizzes = [
      {
        id: 1,
        courseId: 1,
        title: 'Beginner Grammar Quiz',
        questions: 10,
        passingScore: 70,
        duration: 30,
        difficulty: 'Beginner',
      },
      {
        id: 2,
        courseId: 1,
        title: 'Vocabulary Test - Unit 1',
        questions: 15,
        passingScore: 75,
        duration: 20,
        difficulty: 'Beginner',
      },
      {
        id: 3,
        courseId: 2,
        title: 'Intermediate Speaking Assessment',
        questions: 5,
        passingScore: 80,
        duration: 45,
        difficulty: 'Intermediate',
      },
    ];

    let filtered = quizzes;

    if (courseId) {
      filtered = filtered.filter((q) => q.courseId === parseInt(courseId));
    }

    res.status(200).json({ success: true, data: filtered });
  } else if (req.method === 'POST') {
    const { courseId, title, questions, passingScore, duration, difficulty } =
      req.body;

    if (!courseId || !title || !questions || !passingScore) {
      return res
        .status(400)
        .json({ success: false, error: 'Missing required fields' });
    }

    const newQuiz = {
      id: Math.random(),
      courseId,
      title,
      questions,
      passingScore,
      duration: duration || 30,
      difficulty: difficulty || 'Beginner',
    };

    res.status(201).json({ success: true, data: newQuiz });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
