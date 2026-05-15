const router = require('express').Router();
const { getUsers, getUser, toggleWishlist } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUser);
router.post('/wishlist', protect, toggleWishlist);

module.exports = router;
