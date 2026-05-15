const { readJSON, writeJSON, getNextId } = require('../utils/jsonStore');
const ApiError = require('../utils/apiError');

exports.getProducts = (req, res, next) => {
  try {
    let products = readJSON('products.json');
    const { keyword, category, sort, page = 1, limit = 12, featured, price_gte, price_lte } = req.query;

    if (keyword) products = products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()) || p.description.toLowerCase().includes(keyword.toLowerCase()));
    if (category) products = products.filter(p => p.category === category);
    if (featured === 'true') products = products.filter(p => p.featured);
    if (price_gte) products = products.filter(p => p.discountPrice >= Number(price_gte));
    if (price_lte) products = products.filter(p => p.discountPrice <= Number(price_lte));

    if (sort === 'price') products.sort((a, b) => a.discountPrice - b.discountPrice);
    else if (sort === '-price') products.sort((a, b) => b.discountPrice - a.discountPrice);
    else if (sort === 'ratings') products.sort((a, b) => b.ratings - a.ratings);
    else products.sort((a, b) => a.id - b.id);

    const total = products.length;
    const p = parseInt(page);
    const l = parseInt(limit);
    const start = (p - 1) * l;
    const paginated = products.slice(start, start + l);

    paginated.forEach(p => p._id = p.id);
    res.json({ success: true, products: paginated, page: p, pages: Math.ceil(total / l), total });
  } catch (error) { next(error); }
};

exports.getProduct = (req, res, next) => {
  try {
    const products = readJSON('products.json');
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return next(new ApiError('Product not found', 404));
    res.json({ success: true, product });
  } catch (error) { next(error); }
};

exports.createProduct = (req, res, next) => {
  try {
    const products = readJSON('products.json');
    const product = { id: getNextId(products), ...req.body, ratings: 0, reviews: [] };
    products.push(product);
    writeJSON('products.json', products);
    res.status(201).json({ success: true, product });
  } catch (error) { next(error); }
};

exports.updateProduct = (req, res, next) => {
  try {
    const products = readJSON('products.json');
    const idx = products.findIndex(p => p.id === parseInt(req.params.id));
    if (idx === -1) return next(new ApiError('Product not found', 404));
    products[idx] = { ...products[idx], ...req.body, id: products[idx].id };
    writeJSON('products.json', products);
    res.json({ success: true, product: products[idx] });
  } catch (error) { next(error); }
};

exports.deleteProduct = (req, res, next) => {
  try {
    const products = readJSON('products.json');
    const idx = products.findIndex(p => p.id === parseInt(req.params.id));
    if (idx === -1) return next(new ApiError('Product not found', 404));
    products.splice(idx, 1);
    writeJSON('products.json', products);
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) { next(error); }
};

exports.createReview = (req, res, next) => {
  try {
    const products = readJSON('products.json');
    const idx = products.findIndex(p => p.id === parseInt(req.params.id));
    if (idx === -1) return next(new ApiError('Product not found', 404));

    const alreadyReviewed = products[idx].reviews?.find(r => r.user === req.user.name);
    if (alreadyReviewed) return next(new ApiError('Already reviewed this product', 400));

    const review = { user: req.user.name, rating: Number(req.body.rating), comment: req.body.comment };
    products[idx].reviews = [...(products[idx].reviews || []), review];
    products[idx].numReviews = products[idx].reviews.length;
    products[idx].ratings = (products[idx].reviews.reduce((s, r) => s + r.rating, 0) / products[idx].reviews.length).toFixed(1);
    writeJSON('products.json', products);
    res.status(201).json({ success: true, review });
  } catch (error) { next(error); }
};

exports.getCategories = (req, res, next) => {
  try {
    const products = readJSON('products.json');
    const categories = [...new Set(products.map(p => p.category))].sort();
    res.json({ success: true, categories });
  } catch (error) { next(error); }
};
