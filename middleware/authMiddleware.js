

// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const { errorResponse } = require('../utils/response');

// exports.protect = async (req, res, next) => {
//   let token;
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     token = authHeader.split(' ')[1];
//   }

//   if (!token) return errorResponse(res, 'Not authorized, token missing', 401);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     if (!req.user) return errorResponse(res, 'User not found', 401);
//     next();
//   } catch (err) {
//     return errorResponse(res, 'Token invalid or expired', 401, err.message);
//   }
// };


//check
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) return res.status(401).json({ success: false, message: 'Not authorized, token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
  }
};
