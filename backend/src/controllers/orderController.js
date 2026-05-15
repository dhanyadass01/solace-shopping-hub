const { readJSON, writeJSON, getNextId } = require('../utils/jsonStore');
const ApiError = require('../utils/apiError');

exports.createOrder = (req, res, next) => {
  try {
    const users = readJSON('users.json');
    const uIdx = users.findIndex(u => u.id === req.user.id);
    const cart = users[uIdx].cart || { items: [] };
    if (!cart.items.length) return next(new ApiError('Cart is empty', 400));

    const products = readJSON('products.json');
    const items = cart.items.map(ci => {
      const p = products.find(pr => pr.id === ci.productId);
      return { productId: p.id, name: p.name, image: p.image, price: p.discountPrice, quantity: ci.quantity };
    });

    const itemsPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = Math.round(itemsPrice * 0.18 * 100) / 100;
    const discount = cart.coupon?.discount || 0;
    const discountAmount = (itemsPrice * discount) / 100;
    const totalPrice = Math.round((itemsPrice + shippingPrice + taxPrice - discountAmount) * 100) / 100;

    const orders = readJSON('orders.json');
    const order = {
      id: getNextId(orders),
      userId: req.user.id,
      userName: req.user.name,
      items,
      shippingAddress: req.body.shippingAddress || { address: '123 Test St', city: 'Mumbai', postalCode: '400001', country: 'India' },
      paymentMethod: req.body.paymentMethod || 'COD',
      itemsPrice, shippingPrice, taxPrice, totalPrice,
      discount: cart.coupon ? { code: cart.coupon.code, discount: cart.coupon.discount } : null,
      orderStatus: 'Order Received',
      isPaid: false,
      paidAt: null,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    orders.push(order);
    writeJSON('orders.json', orders);

    users[uIdx].cart = { items: [], coupon: null };
    writeJSON('users.json', users);

    res.status(201).json({ success: true, order });
  } catch (error) { next(error); }
};

exports.getMyOrders = (req, res, next) => {
  try {
    const orders = readJSON('orders.json').filter(o => o.userId === req.user.id).reverse();
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const total = orders.length;
    res.json({ success: true, orders: orders.slice((page - 1) * limit, page * limit), page, pages: Math.ceil(total / limit), total });
  } catch (error) { next(error); }
};

exports.getOrder = (req, res, next) => {
  try {
    const orders = readJSON('orders.json');
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return next(new ApiError('Order not found', 404));
    if (order.userId !== req.user.id && req.user.role !== 'admin') return next(new ApiError('Not authorized', 403));
    res.json({ success: true, order });
  } catch (error) { next(error); }
};

exports.getAllOrders = (req, res, next) => {
  try {
    const orders = readJSON('orders.json').reverse();
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const total = orders.length;
    res.json({ success: true, orders: orders.slice((page - 1) * limit, page * limit), page, pages: Math.ceil(total / limit), total });
  } catch (error) { next(error); }
};

exports.updateOrderStatus = (req, res, next) => {
  try {
    const orders = readJSON('orders.json');
    const idx = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (idx === -1) return next(new ApiError('Order not found', 404));
    const { orderStatus, isPaid } = req.body;
    if (orderStatus) orders[idx].orderStatus = orderStatus;
    if (isPaid !== undefined) { orders[idx].isPaid = isPaid; orders[idx].paidAt = isPaid ? new Date().toISOString() : null; }
    writeJSON('orders.json', orders);
    res.json({ success: true, order: orders[idx] });
  } catch (error) { next(error); }
};

exports.getDashboardStats = (req, res, next) => {
  try {
    const orders = readJSON('orders.json');
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + o.totalPrice, 0);
    const products = readJSON('products.json');
    const statusCounts = {};
    orders.forEach(o => { statusCounts[o.orderStatus] = (statusCounts[o.orderStatus] || 0) + 1; });
    const monthlySales = {};
    orders.forEach(o => {
      const m = o.createdAt.slice(0, 7);
      monthlySales[m] = monthlySales[m] || { sales: 0, count: 0 };
      monthlySales[m].sales += o.totalPrice;
      monthlySales[m].count++;
    });

    res.json({
      success: true,
      stats: {
        totalOrders, totalRevenue, totalProducts: products.length,
        ordersByStatus: Object.entries(statusCounts).map(([k, v]) => ({ _id: k, count: v })),
        monthlySales: Object.entries(monthlySales).slice(-12).map(([k, v]) => ({ _id: k, ...v })),
      },
    });
  } catch (error) { next(error); }
};
