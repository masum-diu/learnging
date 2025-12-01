/**
 * User Account Object & Schema
 * Contains all user-related data models and objects
 */

// ========== USER ACCOUNT OBJECT ==========
export const UserAccount = {
  // Basic User Information
  id: 'user_123456', // Unique identifier
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+880 1234567890',
  password: 'hashed_password_here', // Never store plain password
  
  // Account Status
  status: 'active', // active, inactive, suspended, banned
  accountType: 'student', // student, instructor, admin
  createdAt: '2025-01-10T10:30:00Z',
  updatedAt: '2025-01-15T14:45:00Z',
  lastLogin: '2025-12-01T09:00:00Z',
  
  // Profile Information
  profilePicture: 'https://example.com/profile/user_123456.jpg',
  bio: 'English learner from Bangladesh',
  dateOfBirth: '2000-05-15',
  gender: 'Male', // Male, Female, Other
  nationality: 'Bangladesh',
  
  // Contact Information
  address: {
    street: '123 Main Street',
    city: 'Dhaka',
    state: 'Dhaka',
    country: 'Bangladesh',
    zipCode: '1205',
  },
  
  // Learning Level
  englishLevel: 'A1', // A1, A2, B1, B2, C1, C2
  learningGoal: 'Conversational English',
  
  // Enrollment & Progress
  enrolledCourses: [1, 2, 5], // Course IDs
  completedCourses: [],
  certificatesEarned: [],
  totalLearningHours: 45,
  
  // Account Preferences
  preferences: {
    language: 'Bengali', // Display language
    timezone: 'Asia/Dhaka',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  },
  
  // Payment & Subscription
  subscription: {
    plan: 'premium', // free, basic, premium
    isActive: true,
    startDate: '2025-01-10',
    endDate: '2025-04-10',
    renewalDate: '2025-04-10',
    paymentMethod: 'card',
  },
  
  // Authentication & Security
  twoFactorEnabled: false,
  emailVerified: true,
  phoneVerified: false,
  accountRecoveryEmail: 'recovery@example.com',
  
  // Statistics
  stats: {
    lessonsCompleted: 12,
    quizzesAttempted: 8,
    quizzesPass: 6,
    averageScore: 78.5,
    certificatesCount: 0,
  },
};

// ========== CREATE ACCOUNT REQUEST OBJECT ==========
export const CreateAccountRequest = {
  // Required Fields
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'SecurePassword123!',
  confirmPassword: 'SecurePassword123!',
  
  // Optional Fields
  phone: '+880 1234567890',
  accountType: 'student', // student, instructor
  englishLevel: 'A1',
  learningGoal: 'Conversational English',
  
  // Profile Setup
  profilePicture: null, // File upload
  dateOfBirth: '2000-05-15',
  gender: 'Male',
  nationality: 'Bangladesh',
  
  // Address
  address: {
    street: '123 Main Street',
    city: 'Dhaka',
    state: 'Dhaka',
    country: 'Bangladesh',
    zipCode: '1205',
  },
  
  // Preferences
  preferences: {
    language: 'Bengali',
    timezone: 'Asia/Dhaka',
    emailNotifications: true,
    smsNotifications: false,
  },
  
  // Terms & Conditions
  acceptTerms: true,
  acceptPrivacyPolicy: true,
  acceptMarketing: false,
};

// ========== UPDATE ACCOUNT REQUEST OBJECT ==========
export const UpdateAccountRequest = {
  // Can Update These Fields
  firstName: 'John',
  lastName: 'Doe',
  phone: '+880 1234567890',
  bio: 'Updated bio',
  profilePicture: null, // File upload
  
  // Address Update
  address: {
    street: '456 New Street',
    city: 'Chittagong',
    state: 'Chittagong',
    country: 'Bangladesh',
    zipCode: '4100',
  },
  
  // Preferences Update
  preferences: {
    language: 'English',
    timezone: 'Asia/Dhaka',
    emailNotifications: false,
    pushNotifications: true,
  },
  
  // Learning Update
  englishLevel: 'A2',
  learningGoal: 'Business English',
};

// ========== LOGIN REQUEST OBJECT ==========
export const LoginRequest = {
  email: 'john.doe@example.com',
  password: 'SecurePassword123!',
  rememberMe: true,
};

// ========== LOGIN RESPONSE OBJECT ==========
export const LoginResponse = {
  success: true,
  message: 'Login successful',
  data: {
    user: {
      id: 'user_123456',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      accountType: 'student',
      profilePicture: 'https://example.com/profile/user_123456.jpg',
    },
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    refreshToken: 'refresh_token_here',
    expiresIn: 86400, // 24 hours in seconds
  },
};

// ========== USER PROFILE OBJECT ==========
export const UserProfile = {
  id: 'user_123456',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+880 1234567890',
  profilePicture: 'https://example.com/profile/user_123456.jpg',
  bio: 'English learner from Bangladesh',
  dateOfBirth: '2000-05-15',
  gender: 'Male',
  nationality: 'Bangladesh',
  englishLevel: 'A1',
  learningGoal: 'Conversational English',
  joinDate: '2025-01-10',
  
  address: {
    street: '123 Main Street',
    city: 'Dhaka',
    state: 'Dhaka',
    country: 'Bangladesh',
    zipCode: '1205',
  },
  
  stats: {
    lessonsCompleted: 12,
    totalLearningHours: 45,
    certificatesEarned: 0,
    averageScore: 78.5,
    currentStreak: 5, // Days
  },
  
  enrolledCourses: [
    {
      courseId: 1,
      courseName: 'Beginner English',
      progress: 45,
      completed: false,
      certificateAwarded: false,
    },
  ],
};

// ========== STUDENT ACCOUNT OBJECT (Specialized) ==========
export const StudentAccount = {
  ...UserAccount,
  accountType: 'student',
  
  // Student-specific fields
  studentId: 'STU_001234',
  level: 'A1',
  learningPath: 'General English', // General, Business, Conversational
  
  progressTracking: {
    currentLevel: 'A1',
    estimatedCompletionDate: '2025-06-10',
    strengths: ['Listening', 'Reading'],
    improvements: ['Speaking', 'Writing'],
  },
  
  assignments: [
    {
      id: 'assign_1',
      courseId: 1,
      title: 'Greetings Exercise',
      dueDate: '2025-01-20',
      status: 'pending', // pending, submitted, graded
    },
  ],
  
  grades: [
    {
      courseId: 1,
      assessmentName: 'Unit 1 Quiz',
      score: 85,
      maxScore: 100,
      date: '2025-01-15',
    },
  ],
};

// ========== INSTRUCTOR ACCOUNT OBJECT (Specialized) ==========
export const InstructorAccount = {
  ...UserAccount,
  accountType: 'instructor',
  
  // Instructor-specific fields
  instructorId: 'INS_005678',
  specialization: 'Grammar and Writing',
  experience: 8, // Years
  certifications: ['TEFL', 'CELTA'],
  
  teachingInfo: {
    bio: 'Experienced English teacher with 8 years of experience',
    teachingStyle: 'Interactive and student-centered',
    hourlyRate: 25, // USD
    availableHours: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00' },
    ],
  },
  
  coursesTeaching: [1, 2, 5],
  totalStudents: 45,
  averageRating: 4.8,
  reviewCount: 125,
  
  statistics: {
    lessonsGiven: 234,
    totalHoursTaught: 468,
    averageStudentRating: 4.8,
    studentRetentionRate: 92,
  },
};

// ========== ADMIN ACCOUNT OBJECT (Specialized) ==========
export const AdminAccount = {
  ...UserAccount,
  accountType: 'admin',
  
  // Admin-specific fields
  adminId: 'ADM_001',
  role: 'super_admin', // super_admin, moderator, content_manager
  permissions: [
    'manage_users',
    'manage_courses',
    'manage_payments',
    'view_analytics',
    'manage_instructors',
  ],
  
  accessLevel: 'full', // full, limited
  department: 'System Administration',
};

// ========== PASSWORD CHANGE REQUEST ==========
export const PasswordChangeRequest = {
  userId: 'user_123456',
  oldPassword: 'OldPassword123!',
  newPassword: 'NewPassword456!',
  confirmNewPassword: 'NewPassword456!',
};

// ========== PASSWORD RESET REQUEST ==========
export const PasswordResetRequest = {
  email: 'john.doe@example.com',
};

// ========== PASSWORD RESET CONFIRM ==========
export const PasswordResetConfirm = {
  token: 'reset_token_here',
  newPassword: 'NewPassword456!',
  confirmPassword: 'NewPassword456!',
};

// ========== ACCOUNT VERIFICATION OBJECT ==========
export const AccountVerification = {
  // Email Verification
  emailVerification: {
    verificationCode: '123456',
    verified: true,
    verifiedAt: '2025-01-10T10:35:00Z',
  },
  
  // Phone Verification
  phoneVerification: {
    verificationCode: '654321',
    verified: false,
    lastAttempt: '2025-01-15T14:50:00Z',
    attemptsLeft: 2,
  },
  
  // Two-Factor Authentication
  twoFactorAuth: {
    enabled: false,
    method: 'sms', // sms, email, authenticator
    verificationCode: '',
    backupCodes: [],
  },
};

// ========== ACCOUNT SECURITY SETTINGS ==========
export const SecuritySettings = {
  userId: 'user_123456',
  
  // Password Policy
  passwordPolicy: {
    lastChanged: '2025-01-10',
    expiresIn: 90, // Days
    minimumLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
  },
  
  // Login History
  loginHistory: [
    {
      timestamp: '2025-12-01T09:00:00Z',
      ipAddress: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success',
      location: 'Dhaka, Bangladesh',
    },
  ],
  
  // Active Sessions
  activeSessions: [
    {
      sessionId: 'sess_123',
      device: 'Chrome on Windows',
      ipAddress: '192.168.1.100',
      startTime: '2025-12-01T09:00:00Z',
      lastActive: '2025-12-01T09:30:00Z',
    },
  ],
  
  // Trusted Devices
  trustedDevices: [
    {
      deviceId: 'dev_123',
      deviceName: 'Personal Laptop',
      deviceType: 'laptop',
      addedDate: '2025-01-10',
      lastUsed: '2025-12-01T09:00:00Z',
    },
  ],
};

// ========== ACCOUNT DELETION REQUEST ==========
export const AccountDeletionRequest = {
  userId: 'user_123456',
  password: 'SecurePassword123!',
  reason: 'No longer interested',
  feedback: 'Optional feedback',
  deleteAllData: true, // If false, data is archived
};

// ========== NOTIFICATION PREFERENCES ==========
export const NotificationPreferences = {
  userId: 'user_123456',
  
  email: {
    courseUpdates: true,
    newAssignments: true,
    gradeNotifications: true,
    promotionalEmails: false,
    weeklyDigest: true,
  },
  
  sms: {
    importantAlerts: true,
    classReminders: false,
    assessmentReminders: true,
  },
  
  push: {
    newMessages: true,
    lessonReminders: true,
    assessmentDue: true,
    certificates: true,
  },
  
  quietHours: {
    enabled: false,
    startTime: '22:00',
    endTime: '08:00',
  },
};

// ========== REFERRAL PROGRAM ==========
export const ReferralProgram = {
  userId: 'user_123456',
  referralCode: 'JOHN123ABC',
  referralLink: 'https://learningtrain.com?ref=JOHN123ABC',
  
  stats: {
    totalReferred: 5,
    successfulSignups: 3,
    totalEarnings: 75, // USD
  },
  
  referrals: [
    {
      referralId: 'ref_001',
      referredEmail: 'friend1@example.com',
      status: 'completed', // pending, completed, earned
      signupDate: '2025-01-20',
      bonusEarned: 25,
    },
  ],
};

export default {
  UserAccount,
  CreateAccountRequest,
  UpdateAccountRequest,
  LoginRequest,
  LoginResponse,
  UserProfile,
  StudentAccount,
  InstructorAccount,
  AdminAccount,
  PasswordChangeRequest,
  PasswordResetRequest,
  PasswordResetConfirm,
  AccountVerification,
  SecuritySettings,
  AccountDeletionRequest,
  NotificationPreferences,
  ReferralProgram,
};
