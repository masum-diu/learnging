/**
 * Account Service - All account operations
 * Handles user creation, updates, verification, etc.
 */

import crypto from 'crypto';

// Simulated database
const usersDB = {};

// ========== CREATE ACCOUNT ==========
export async function createAccount(data) {
  try {
    const { email, password, firstName, lastName, accountType } = data;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      throw new Error('Missing required fields');
    }

    // Check if email already exists
    if (usersDB[email]) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    const newUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      accountType: accountType || 'student',
      createdAt: new Date().toISOString(),
      status: 'active',
      emailVerified: false,
      enrolledCourses: [],
      completedCourses: [],
      stats: {
        lessonsCompleted: 0,
        certificatesCount: 0,
      },
    };

    // Store user (in production use database)
    usersDB[email] = newUser;

    return {
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        accountType: newUser.accountType,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========== GET ACCOUNT BY EMAIL ==========
export async function getAccountByEmail(email) {
  try {
    const user = usersDB[email];

    if (!user) {
      throw new Error('User not found');
    }

    // Don't return password hash
    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      data: userWithoutPassword,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========== GET ACCOUNT BY ID ==========
export async function getAccountById(userId) {
  try {
    const user = Object.values(usersDB).find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      data: userWithoutPassword,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========== UPDATE ACCOUNT ==========
export async function updateAccount(userId, updateData) {
  try {
    const user = Object.values(usersDB).find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Update allowed fields
    const allowedFields = [
      'firstName',
      'lastName',
      'phone',
      'bio',
      'dateOfBirth',
      'gender',
      'nationality',
      'englishLevel',
      'learningGoal',
      'address',
      'preferences',
    ];

    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    });

    user.updatedAt = new Date().toISOString();

    const { password, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Account updated successfully',
      data: userWithoutPassword,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========== CHANGE PASSWORD ==========
export async function changePassword(userId, oldPassword, newPassword) {
  try {
    const user = Object.values(usersDB).find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const hashedOldPassword = crypto
      .createHash('sha256')
      .update(oldPassword)
      .digest('hex');

    if (hashedOldPassword !== user.password) {
      throw new Error('Old password is incorrect');
    }

    if (newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters');
    }

    const hashedNewPassword = crypto
      .createHash('sha256')
      .update(newPassword)
      .digest('hex');

    user.password = hashedNewPassword;
    user.updatedAt = new Date().toISOString();

    return {
      success: true,
      message: 'Password changed successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========== VERIFY ACCOUNT ==========
export async function verifyAccount(userId) {
  try {
    const user = Object.values(usersDB).find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.emailVerified = true;
    user.status = 'active';

    return {
      success: true,
      message: 'Account verified successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========== ENROLL IN COURSE ==========
export async function enrollInCourse(userId, courseId) {
  try {
    const user = Object.values(usersDB).find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.enrolledCourses.includes(courseId)) {
      throw new Error('Already enrolled in this course');
    }

    user.enrolledCourses.push(courseId);
    user.updatedAt = new Date().toISOString();

    return {
      success: true,
      message: 'Successfully enrolled in course',
      data: {
        userId,
        courseId,
        enrolledAt: user.updatedAt,
        progress: 0,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========== GET USER STATISTICS ==========
export async function getUserStatistics(userId) {
  try {
    const user = Object.values(usersDB).find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      success: true,
      data: {
        userId: user.id,
        totalEnrolledCourses: user.enrolledCourses.length,
        totalCompletedCourses: user.completedCourses.length,
        lessonsCompleted: user.stats?.lessonsCompleted || 0,
        certificatesEarned: user.stats?.certificatesCount || 0,
        totalLearningHours: user.stats?.totalLearningHours || 0,
        memberSince: user.createdAt,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========== DELETE ACCOUNT ==========
export async function deleteAccount(userId, password) {
  try {
    const user = Object.values(usersDB).find((u) => u.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    if (hashedPassword !== user.password) {
      throw new Error('Password is incorrect');
    }

    delete usersDB[user.email];

    return {
      success: true,
      message: 'Account deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export default {
  createAccount,
  getAccountByEmail,
  getAccountById,
  updateAccount,
  changePassword,
  verifyAccount,
  enrollInCourse,
  getUserStatistics,
  deleteAccount,
};
