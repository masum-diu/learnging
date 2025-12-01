// Get user profile with enrolled courses
import { withAuth } from './auth/middleware';

const handler = (req, res) => {
  if (req.method === 'GET') {
    const userId = req.user.id;

    // Mock user profile (replace with DB query)
    const userProfile = {
      id: userId,
      name: req.user.name,
      email: req.user.email,
      phone: '+880 1234567890',
      joinDate: '2025-01-10',
      profilePicture: 'https://example.com/profile.jpg',
      enrolledCourses: [
        {
          courseId: 1,
          courseName: 'Beginner English',
          progress: 45,
          completed: false,
          certificateAwarded: false,
        },
        {
          courseId: 2,
          courseName: 'Intermediate English',
          progress: 20,
          completed: false,
          certificateAwarded: false,
        },
      ],
      totalCoursesEnrolled: 2,
      completedCourses: 0,
      certificatesEarned: 0,
    };

    res.status(200).json({
      success: true,
      data: userProfile,
    });
  } else if (req.method === 'PUT') {
    // Update user profile
    const { name, phone, profilePicture } = req.body;
    const userId = req.user.id;

    if (!name && !phone && !profilePicture) {
      return res.status(400).json({
        success: false,
        error: 'At least one field is required to update',
      });
    }

    // Mock update (replace with DB update)
    const updatedProfile = {
      id: userId,
      name: name || req.user.name,
      email: req.user.email,
      phone: phone || '+880 1234567890',
      profilePicture: profilePicture || 'https://example.com/profile.jpg',
      message: 'Profile updated successfully',
    };

    res.status(200).json({
      success: true,
      data: updatedProfile,
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default withAuth(handler);
