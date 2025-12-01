/**
 * Shared User Database
 * Centralized storage for all users (replace with real database)
 */

// In-memory database - in production, use MongoDB, PostgreSQL, etc.
const usersDB = {};

export function addUser(email, userData) {
  usersDB[email] = userData;
  return userData;
}

export function getUser(email) {
  return usersDB[email] || null;
}

export function userExists(email) {
  return email in usersDB;
}

export function getAllUsers() {
  return Object.values(usersDB);
}

export function updateUser(email, updates) {
  if (usersDB[email]) {
    usersDB[email] = { ...usersDB[email], ...updates };
    return usersDB[email];
  }
  return null;
}

export function deleteUser(email) {
  delete usersDB[email];
}

export default usersDB;
