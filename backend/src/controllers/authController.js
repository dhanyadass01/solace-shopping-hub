const { readJSON, writeJSON, getNextId } = require('../utils/jsonStore');
const { generateToken } = require('../utils/helpers');
const ApiError = require('../utils/apiError');

exports.register = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const users = readJSON('users.json');
    if (users.find(u => u.email === email)) return next(new ApiError('Email already registered', 400));

    const newUser = { id: getNextId(users), name, email, password, role: 'user', wishlist: [] };
    users.push(newUser);
    writeJSON('users.json', users);

    res.status(201).json({
      success: true,
      token: generateToken({ id: newUser.id, role: newUser.role }),
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (error) { next(error); }
};

exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = readJSON('users.json');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return next(new ApiError('Invalid email or password', 401));

    res.json({
      success: true,
      token: generateToken({ id: user.id, role: user.role }),
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) { next(error); }
};

exports.getMe = (req, res, next) => {
  try {
    const users = readJSON('users.json');
    const user = users.find(u => u.id === req.user.id);
    res.json({ success: true, user: { ...user, password: undefined } });
  } catch (error) { next(error); }
};

exports.updateProfile = (req, res, next) => {
  try {
    const users = readJSON('users.json');
    const idx = users.findIndex(u => u.id === req.user.id);
    if (idx === -1) return next(new ApiError('User not found', 404));
    if (req.body.name) users[idx].name = req.body.name;
    if (req.body.phone) users[idx].phone = req.body.phone;
    if (req.body.address) users[idx].address = req.body.address;
    if (req.body.avatar) users[idx].avatar = req.body.avatar;
    if (req.body.savedAddresses) users[idx].savedAddresses = req.body.savedAddresses;
    writeJSON('users.json', users);
    res.json({ success: true, user: { ...users[idx], password: undefined } });
  } catch (error) { next(error); }
};
