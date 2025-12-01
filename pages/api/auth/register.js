// User registration endpoint
import crypto from 'crypto';
import { addUser, userExists } from '../../../lib/db/users';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password, phone } = req.body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        error: 'First name, last name, email, and password are required',
      });
    }

    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      });
    }

    // Check password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long',
      });
    }

    // Check if email already exists
    if (userExists(email)) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered',
      });
    }

    // Hash password
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone: phone || '',
      accountType: 'student',
      enrolledCourses: [],
      completedCourses: [],
      createdAt: new Date().toISOString(),
      status: 'active',
      emailVerified: false,
      stats: {
        lessonsCompleted: 0,
        certificatesCount: 0,
      },
    };

    // Store user in database
    addUser(email, newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
