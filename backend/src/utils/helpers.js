const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'shophub_jwt_secret_2026';

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { generateToken, verifyToken, JWT_SECRET };
