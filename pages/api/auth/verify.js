// Verify token and get user info
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided',
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.status(200).json({
        success: true,
        data: decoded,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
