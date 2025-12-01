// User enrolls in a course
import { withAuth } from './auth/middleware';

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        error: 'Course ID is required',
      });
    }

    // Mock enrollment data (replace with DB)
    const enrollment = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completed: false,
      certificateAwarded: false,
    };

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course',
      data: enrollment,
    });
  } else if (req.method === 'GET') {
    // Get user's enrolled courses
    const userId = req.user.id;

    // Mock data (replace with DB query)
    const enrollments = [
      {
        id: 'enr1',
        userId,
        courseId: 1,
        courseName: 'Beginner English',
        enrolledAt: '2025-01-15',
        progress: 45,
        completed: false,
        certificateAwarded: false,
      },
      {
        id: 'enr2',
        userId,
        courseId: 2,
        courseName: 'Intermediate English',
        enrolledAt: '2025-01-20',
        progress: 20,
        completed: false,
        certificateAwarded: false,
      },
    ];

    res.status(200).json({
      success: true,
      data: enrollments,
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default withAuth(handler);
