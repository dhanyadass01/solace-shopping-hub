const { readJSON, writeJSON } = require('../utils/jsonStore');
const ApiError = require('../utils/apiError');

exports.getUsers = (req, res, next) => {
  try {
    const users = readJSON('users.json').map(u => ({ ...u, password: undefined }));
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const total = users.length;
    res.json({ success: true, users: users.slice((page - 1) * limit, page * limit), page, pages: Math.ceil(total / limit), total });
  } catch (error) { next(error); }
};

exports.getUser = (req, res, next) => {
  try {
    const users = readJSON('users.json');
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return next(new ApiError('User not found', 404));
    res.json({ success: true, user: { ...user, password: undefined } });
  } catch (error) { next(error); }
};

exports.toggleWishlist = (req, res, next) => {
  try {
    const { productId } = req.body;
    const users = readJSON('users.json');
    const idx = users.findIndex(u => u.id === req.user.id);
    const wishlist = users[idx].wishlist || [];
    const pIdx = wishlist.indexOf(productId);
    if (pIdx > -1) wishlist.splice(pIdx, 1);
    else wishlist.push(productId);
    users[idx].wishlist = wishlist;
    writeJSON('users.json', users);
    res.json({ success: true, wishlist });
  } catch (error) { next(error); }
};
