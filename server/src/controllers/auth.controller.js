// ============================================
// auth.controller.js - Auth Controller
// ============================================
// Handles HTTP requests for authentication.
// Flow: Route → Controller → Service → Database
// Reference: req.body, res.json(), res.status() - reference-backend.md
// ============================================

import * as authService from '../services/auth.service.js';

/**
 * POST /api/auth/register
 * Register with email and password.
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid input format.' });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    const result = await authService.register(cleanName, cleanEmail, password);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode) return res.status(error.statusCode).json({ success: false, message: error.message });
    next(error);
  }
};

/**
 * POST /api/auth/login
 * Login with email and password.
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid input format.' });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const result = await authService.emailLogin(cleanEmail, password);
    return res.json({ success: true, data: result });
  } catch (error) {
    if (error.statusCode) return res.status(error.statusCode).json({ success: false, message: error.message });
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Get the current logged-in user's profile.
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user._id);
    return res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Logout user (frontend deletes the token).
 */
export const logout = (req, res) => {
  return res.json({ success: true, data: { message: 'Logged out successfully' } });
};
