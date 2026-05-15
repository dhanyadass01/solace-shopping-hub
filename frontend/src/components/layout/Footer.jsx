import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#061b0e', color: '#e5e2dd' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="font-['Playfair_Display'] text-lg tracking-widest" style={{ color: '#fcf9f4', fontWeight: 600 }}>SÖLACE</span>
            <div className="hidden sm:flex items-center gap-5 text-xs" style={{ color: '#c3c8c1' }}>
              <Link to="/products" className="hover:opacity-80 transition tracking-wider">Shop</Link>
              <Link to="/cart" className="hover:opacity-80 transition tracking-wider">Cart</Link>
              <Link to="/orders" className="hover:opacity-80 transition tracking-wider">Orders</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[11px]" style={{ color: '#737973' }}>
            <span>&copy; 2026 SÖLACE. All rights reserved.</span>
            <span className="hidden sm:inline">hello@solace.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}