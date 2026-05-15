const router = require('express').Router();
const { createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus, getDashboardStats } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.use(protect);
router.post('/', createOrder);
router.get('/mine', getMyOrders);
router.get('/:id', getOrder);
router.get('/', admin, getAllOrders);
router.put('/:id/status', admin, updateOrderStatus);
router.get('/admin/stats', admin, getDashboardStats);

module.exports = router;
