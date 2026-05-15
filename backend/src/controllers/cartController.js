const { readJSON, writeJSON } = require('../utils/jsonStore');
const ApiError = require('../utils/apiError');

const COUPONS = readJSON('coupons.json');

function populateCart(cart) {
  if (!cart || !cart.items) return { items: [], coupon: null };
  const products = readJSON('products.json');
  const items = cart.items.map(ci => {
    const p = products.find(pr => pr.id === ci.productId);
    return p ? { ...ci, product: { id: p.id, name: p.name, price: p.price, discountPrice: p.discountPrice, image: p.image, stock: p.stock, category: p.category } } : ci;
  });
  return { ...cart, items };
}

exports.getCart = (req, res) => {
  const cart = req.user.cart || { items: [] };
  res.json({ success: true, cart: populateCart(cart) });
};

exports.addToCart = (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const products = readJSON('products.json');
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return next(new ApiError('Product not found', 404));

    const users = readJSON('users.json');
    const uIdx = users.findIndex(u => u.id === req.user.id);
    if (!users[uIdx].cart) users[uIdx].cart = { items: [], coupon: null };

    const exist = users[uIdx].cart.items.find(i => i.productId === parseInt(productId));
    if (exist) {
      exist.quantity += quantity;
    } else {
      users[uIdx].cart.items.push({ productId: parseInt(productId), quantity });
    }
    writeJSON('users.json', users);
    res.json({ success: true, cart: populateCart(users[uIdx].cart) });
  } catch (error) { next(error); }
};

exports.updateCartItem = (req, res, next) => {
  try {
    const { quantity } = req.body;
    const users = readJSON('users.json');
    const uIdx = users.findIndex(u => u.id === req.user.id);
    const item = users[uIdx].cart?.items.find(i => i.productId === parseInt(req.params.productId));
    if (!item) return next(new ApiError('Item not in cart', 404));
    item.quantity = quantity;
    writeJSON('users.json', users);
    res.json({ success: true, cart: populateCart(users[uIdx].cart) });
  } catch (error) { next(error); }
};

exports.removeFromCart = (req, res, next) => {
  try {
    const users = readJSON('users.json');
    const uIdx = users.findIndex(u => u.id === req.user.id);
    users[uIdx].cart = users[uIdx].cart || { items: [] };
    users[uIdx].cart.items = users[uIdx].cart.items.filter(i => i.productId !== parseInt(req.params.productId));
    writeJSON('users.json', users);
    res.json({ success: true, cart: populateCart(users[uIdx].cart) });
  } catch (error) { next(error); }
};

exports.clearCart = (req, res, next) => {
  try {
    const users = readJSON('users.json');
    const uIdx = users.findIndex(u => u.id === req.user.id);
    users[uIdx].cart = { items: [], coupon: null };
    writeJSON('users.json', users);
    res.json({ success: true, cart: populateCart(users[uIdx].cart) });
  } catch (error) { next(error); }
};

exports.applyCoupon = (req, res, next) => {
  try {
    const { code } = req.body;
    const coupon = COUPONS[code?.toUpperCase()];
    if (!coupon) return next(new ApiError('Invalid coupon code', 400));

    const users = readJSON('users.json');
    const uIdx = users.findIndex(u => u.id === req.user.id);
    const cart = users[uIdx].cart || { items: [] };

    const products = readJSON('products.json');
    const subtotal = cart.items.reduce((sum, i) => {
      const p = products.find(pr => pr.id === i.productId);
      return sum + (p ? p.discountPrice * i.quantity : 0);
    }, 0);

    if (subtotal < coupon.minAmount) {
      return next(new ApiError(`Minimum order amount of $${coupon.minAmount} required`, 400));
    }

    cart.coupon = { code: code.toUpperCase(), discount: coupon.discount };
    users[uIdx].cart = cart;
    writeJSON('users.json', users);
    res.json({ success: true, cart });
  } catch (error) { next(error); }
};

exports.removeCoupon = (req, res, next) => {
  try {
    const users = readJSON('users.json');
    const uIdx = users.findIndex(u => u.id === req.user.id);
    if (users[uIdx].cart) users[uIdx].cart.coupon = null;
    writeJSON('users.json', users);
    res.json({ success: true, cart: populateCart(users[uIdx].cart) });
  } catch (error) { next(error); }
};
