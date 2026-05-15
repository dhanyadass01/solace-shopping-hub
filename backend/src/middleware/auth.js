const { verifyToken } = require('../utils/helpers');
const { readJSON } = require('../utils/jsonStore');
const ApiError = require('../utils/apiError');

const protect = (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return next(new ApiError('Not authorized, no token', 401));

    const decoded = verifyToken(token);
    const users = readJSON('users.json');
    req.user = users.find(u => u.id === decoded.id);
    if (!req.user) return next(new ApiError('User not found', 401));
    next();
  } catch (error) {
    next(new ApiError('Not authorized, token failed', 401));
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  next(new ApiError('Not authorized as admin', 403));
};

module.exports = { protect, admin };
