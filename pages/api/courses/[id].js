import { getCourseById, updateCourse, deleteCourse } from '../../../lib/db/courses';

// GET, UPDATE, or DELETE a specific course using the in-memory helper
export default function handler(req, res) {
  const { id } = req.query;
  const courseId = Number(id);
  if (!courseId || Number.isNaN(courseId)) {
    return res.status(400).json({ success: false, error: 'Invalid course id' });
  }

  if (req.method === 'GET') {
    try {
      const course = getCourseById(courseId);
      if (!course) return res.status(404).json({ success: false, error: 'Course not found' });
      return res.status(200).json({ success: true, data: course });
    } catch (err) {
      console.error('GET /api/courses/[id] error:', err);
      return res.status(500).json({ success: false, error: String(err) });
    }
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const payload = req.body || {};
      const allowed = ['name', 'level', 'duration', 'price', 'students', 'description'];
      const updateFields = {};
      for (const key of allowed) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          updateFields[key] = payload[key];
        }
      }

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ success: false, error: 'No valid fields to update' });
      }

      const updated = updateCourse(courseId, updateFields);
      if (!updated) return res.status(404).json({ success: false, error: 'Course not found' });
      return res.status(200).json({ success: true, data: updated });
    } catch (err) {
      console.error('PUT /api/courses/[id] error:', err);
      return res.status(500).json({ success: false, error: String(err) });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const ok = deleteCourse(courseId);
      if (!ok) return res.status(404).json({ success: false, error: 'Course not found' });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('DELETE /api/courses/[id] error:', err);
      return res.status(500).json({ success: false, error: String(err) });
    }
  }

  res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
