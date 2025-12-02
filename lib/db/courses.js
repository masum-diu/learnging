/**
 * In-Memory Courses Database
 * Stores all courses in a module-scoped array (persists while server runs)
 */

const coursesDB = [];
let courseIdCounter = 1;

// Initialize with demo courses on server startup
function initializeDemoCourses() {
  const demoCourses = [
    {
      id: courseIdCounter++,
      name: 'Beginner English',
      level: 'Beginner',
      duration: '8 weeks',
      price: 49,
      students: 234,
      description: 'Perfect for absolute beginners. Learn basic vocabulary, grammar, and conversation skills.',
    },
    {
      id: courseIdCounter++,
      name: 'Intermediate English',
      level: 'Intermediate',
      duration: '10 weeks',
      price: 69,
      students: 456,
      description: 'Build on your foundations. Master complex grammar, business English, and advanced conversations.',
    },
    {
      id: courseIdCounter++,
      name: 'Advanced English',
      level: 'Advanced',
      duration: '12 weeks',
      price: 89,
      students: 189,
      description: 'Achieve fluency and confidence. Specialized courses in business, academic, and professional English.',
    },
    {
      id: courseIdCounter++,
      name: 'IELTS Exam Prep',
      level: 'Intermediate',
      duration: '6 weeks',
      price: 79,
      students: 312,
      description: 'Comprehensive preparation for IELTS exam. Mock tests, speaking practice, and proven strategies.',
    },
  ];
  coursesDB.push(...demoCourses);
}

// Initialize demo courses on module load
initializeDemoCourses();

export function getCourses() {
  return coursesDB;
}

export function addCourse({ name, level, duration, price, students = 0, description = '' }) {
  const newCourse = {
    id: courseIdCounter++,
    name,
    level,
    duration,
    price: Number(price),
    students: Number(students),
    description,
  };
  coursesDB.push(newCourse);
  return newCourse;
}

export function getCourseById(id) {
  return coursesDB.find((course) => course.id === Number(id)) || null;
}

export function updateCourse(id, { name, level, duration, price, students, description }) {
  const course = coursesDB.find((c) => c.id === Number(id));
  if (!course) return null;

  if (name !== undefined) course.name = name;
  if (level !== undefined) course.level = level;
  if (duration !== undefined) course.duration = duration;
  if (price !== undefined) course.price = Number(price);
  if (students !== undefined) course.students = Number(students);
  if (description !== undefined) course.description = description;

  return course;
}

export function deleteCourse(id) {
  const index = coursesDB.findIndex((c) => c.id === Number(id));
  if (index === -1) return false;
  coursesDB.splice(index, 1);
  return true;
}
