// Dashboard stats endpoint
export default function handler(req, res) {
  if (req.method === 'GET') {
    const stats = {
      totalStudents: 127,
      totalCourses: 8,
      totalInstructors: 12,
      averageRating: 4.75,
      activeNow: 34,
      coursesThisMonth: 3,
      revenue: 12450.75,
      topCourse: 'Beginner English',
      topInstructor: 'Sarah Johnson',
      courseDistribution: {
        beginner: 45,
        intermediate: 52,
        advanced: 30,
      },
      studentsProgress: {
        excellent: 42,
        good: 58,
        needsImprovement: 27,
      },
    };

    res.status(200).json({ success: true, data: stats });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
