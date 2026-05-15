# ShopHub - Full-Stack E-Commerce Application (Zero Database)

A modern, premium full-stack e-commerce web application built **without any database**.
Uses JSON file storage on the backend and LocalStorage for the cart. Looks and works like Amazon/Flipkart.

## Tech Stack

- **Frontend:** React 18 + Vite + Tailwind CSS + React Router
- **Backend:** Node.js + Express.js + JWT Authentication
- **Storage:** JSON files (products.json, users.json, orders.json) + LocalStorage

## Features

### User Features
- Browse 100+ products across 9 categories
- Search, filter by category, sort by price/rating
- Product details with reviews & ratings
- Add to cart, update quantity, remove from cart
- Coupon discounts (SAVE10, SAVE20, WELCOME15)
- Checkout with order placement
- Order history with **animated tracking timeline** (Order Received → Shipped → Arriving Soon → Delivered)
- Wishlist functionality
- Dark/Light mode toggle
- Responsive mobile-first design

### Admin Features
- Dashboard with analytics (revenue, order stats, monthly sales)
- Full product CRUD (add/edit/delete with image URL)
- View & manage all orders (update status, mark paid)
- View registered users

### Authentication
- JWT-based authentication (mock - stored in users.json)
- Role-based access: Admin and User
- Protected routes
- Login/Register

## Quick Start

```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2. Start backend (port 5000)
cd backend && node server.js

# 3. Start frontend (port 3000) - in another terminal
cd frontend && npx vite --port 3000

# 4. Open http://localhost:3000
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| User | john@example.com | user123 |

## 100 Products - 9 Categories

- **Accessories** (10): Sunglasses, Watches, Bags, Wallets, Scarves, Belts, etc.
- **Cosmetics** (10): Lipstick, Foundation, Serum, Kajal, Moisturizer, Makeup Brushes, etc.
- **Electronics** (10): Headphones, Smart Watch, Speaker, Webcam, Monitor, Doorbell, etc.
- **Fashion** (10): Leather Jacket, Shirt, Hoodie, Sweater, Blazer, Puffer Jacket, etc.
- **Fitness Products** (10): Running Shoes, Yoga Mat, Dumbbells, Resistance Bands, etc.
- **Food & Drinks** (10): Green Tea, Coffee, Chocolates, Nuts, Honey, Macarons, etc.
- **Gadgets** (10): Keyboard, Mouse, Power Bank, Tripod, Drawing Tablet, Dash Cam, etc.
- **Home Essentials** (10): Desk Lamp, Knife Set, Chair, LED Bulb, Kettle, Candle, etc.
- **Stationery** (10): Pens, Notebooks, Watercolors, Sticky Notes, Calligraphy Set, etc.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/me` | Current user |
| GET | `/api/products` | All products (paginated, searchable) |
| GET | `/api/products/categories` | Categories list |
| GET | `/api/products/:id` | Single product |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| POST | `/api/products/:id/reviews` | Add review |
| GET | `/api/cart` | Get cart |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/:productId` | Update quantity |
| DELETE | `/api/cart/:productId` | Remove from cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/mine` | My orders |
| GET | `/api/orders/admin/stats` | Dashboard stats |

## Coupon Codes

| Code | Discount | Minimum |
|------|----------|---------|
| SAVE10 | 10% off | ₹500 |
| SAVE20 | 20% off | ₹1000 |
| WELCOME15 | 15% off | None |

## Project Structure

```
e-commerce/
├── backend/
│   ├── data/           # JSON storage files
│   │   ├── products.json  (100 products)
│   │   ├── users.json     (3 users)
│   │   └── orders.json    (orders)
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/     # Auth, error handling
│   │   ├── routes/        # Express routes
│   │   └── utils/         # JSON file store, helpers
│   ├── server.js          # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios instance & API calls
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth, Cart, Theme, Toast
│   │   ├── pages/         # All pages (user + admin)
│   │   ├── App.jsx        # Routes
│   │   └── main.jsx       # Entry point
│   ├── vite.config.js
│   └── package.json
└── README.md

<!-- redeploy-trigger -->
```
