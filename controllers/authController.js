
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { successResponse, errorResponse } = require('../utils/response');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return errorResponse(res, 'Email already registered', 400);

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return successResponse(res, 'User registered successfully', { user, token }, 201);
  } catch (error) {
    return errorResponse(res, 'Registration failed', 500, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, 'Invalid credentials', 401);

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return errorResponse(res, 'Invalid credentials', 401);

    const token = generateToken(user._id);
    return successResponse(res, 'Login successful', { user, token });
  } catch (error) {
    return errorResponse(res, 'Login failed', 500, error.message);
  }
};
