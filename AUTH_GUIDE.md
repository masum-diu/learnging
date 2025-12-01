# English Training Center API - Authentication Guide

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

Required packages have been added:
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing (optional, currently using crypto)
- `axios` - HTTP client

### 2. Environment Variables
Create a `.env.local` file in the project root:

```
JWT_SECRET=your-super-secret-key-change-this-in-production
DATABASE_URL=your-database-url
API_URL=http://localhost:3000
```

## API Endpoints

### Authentication Endpoints

#### 1. Register User
**POST** `/api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+880 1234567890"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+880 1234567890"
  }
}
```

#### 2. Login User
**POST** `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "id": "123456",
    "name": "John Doe",
    "email": "john@example.com",
    "enrolledCourses": [1, 2]
  }
}
```

#### 3. Verify Token
**GET** `/api/auth/verify`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "123456",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### Enrollment Endpoints (Requires Authentication)

#### 1. Enroll in Course
**POST** `/api/enrollments`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Request:
```json
{
  "courseId": 1
}
```

Response:
```json
{
  "success": true,
  "message": "Successfully enrolled in course",
  "data": {
    "id": "enr1",
    "userId": "123456",
    "courseId": 1,
    "enrolledAt": "2025-01-15T10:30:00.000Z",
    "progress": 0,
    "completed": false
  }
}
```

#### 2. Get User Enrollments
**GET** `/api/enrollments`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "enr1",
      "userId": "123456",
      "courseId": 1,
      "courseName": "Beginner English",
      "enrolledAt": "2025-01-15",
      "progress": 45,
      "completed": false,
      "certificateAwarded": false
    }
  ]
}
```

#### 3. Get User Profile
**GET** `/api/profile`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "123456",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+880 1234567890",
    "joinDate": "2025-01-10",
    "enrolledCourses": [
      {
        "courseId": 1,
        "courseName": "Beginner English",
        "progress": 45,
        "completed": false
      }
    ],
    "totalCoursesEnrolled": 2,
    "completedCourses": 0
  }
}
```

#### 4. Update User Profile
**PUT** `/api/profile`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Request:
```json
{
  "name": "Jane Doe",
  "phone": "+880 9876543210",
  "profilePicture": "https://example.com/new-profile.jpg"
}
```

### Course Endpoints

#### Get Available Courses
**GET** `/api/courses/available?level=A1&search=Beginner`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Beginner English",
      "level": "A1",
      "duration": "8 weeks",
      "price": 99.99,
      "rating": 4.8,
      "instructor": "John Smith",
      "startDate": "2025-01-15",
      "available": true
    }
  ]
}
```

## Testing with cURL

### 1. Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+880 1234567890"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Enroll in a course (replace TOKEN with actual JWT)
```bash
curl -X POST http://localhost:3000/api/enrollments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "courseId": 1
  }'
```

### 4. Get user profile
```bash
curl -X GET http://localhost:3000/api/profile \
  -H "Authorization: Bearer TOKEN"
```

## Important Security Notes

1. **Change JWT_SECRET**: Always change the JWT secret in production
2. **Use HTTPS**: Always use HTTPS in production
3. **Hash Passwords**: Use `bcryptjs` instead of `crypto` for production
4. **Database Integration**: Connect to a real database (MongoDB, PostgreSQL, etc.)
5. **Rate Limiting**: Add rate limiting to prevent brute force attacks
6. **CORS**: Configure CORS properly for your frontend domain

## Next Steps

1. Connect to a real database (MongoDB or PostgreSQL)
2. Implement proper password hashing with bcryptjs
3. Add email verification for registration
4. Add password reset functionality
5. Implement refresh tokens for better security
6. Add payment processing for course enrollment
7. Create frontend components for authentication flows

