import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineHeart, HiMenu, HiX, HiOutlineUser, HiOutlineLogout, HiOutlineInformationCircle, HiOutlineSupport, HiOutlinePhone, HiOutlineViewGrid } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const infoItems = [
    { label: 'Shop', icon: HiOutlineViewGrid, href: '/products' },
    { label: 'About SÖLACE', icon: HiOutlineInformationCircle, href: '/about' },
    { label: 'Customer Care', icon: HiOutlineSupport, href: '/customer-care' },
    { label: 'Contact', icon: HiOutlinePhone, href: '/contact' },
  ];

  return (
    <nav className="glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-['Playfair_Display'] text-xl tracking-widest" style={{ color: '#061b0e', fontWeight: 600 }}>
            SÖLACE
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {/* Info Dropdown */}
            <div className="relative group">
              <button className="text-xs tracking-widest uppercase font-semibold transition-colors flex items-center gap-1" style={{ color: '#434843', letterSpacing: '0.05em' }}>
                Explore
                <svg className="w-3 h-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute left-0 mt-2 w-52 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0" style={{ backgroundColor: '#fcf9f4', border: '1px solid #f0ede8', boxShadow: '0 10px 40px rgba(77,100,83,0.12)' }}>
                {infoItems.map((item, i) => (
                  <Link key={i} to={item.href} className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-colors hover:translate-x-1" style={{ color: '#434843', letterSpacing: '0.03em', borderBottom: i < infoItems.length - 1 ? '1px solid #f0ede8' : 'none' }}>
                    <item.icon className="w-4 h-4" style={{ color: '#994529' }} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {user ? (
              <>
                <Link to="/cart" className="relative transition" style={{ color: '#434843' }}>
                  <HiOutlineShoppingBag className="w-6 h-6" />
                  {itemCount > 0 && <span className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: '#994529' }}>{itemCount}</span>}
                </Link>
                <Link to="/wishlist" className="transition" style={{ color: '#434843' }}><HiOutlineHeart className="w-6 h-6" /></Link>
                {isAdmin && <Link to="/admin" className="text-xs tracking-widest uppercase font-semibold transition-colors" style={{ color: '#434843', letterSpacing: '0.05em' }}>Admin</Link>}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-xs tracking-widest uppercase font-semibold transition-colors" style={{ color: '#434843', letterSpacing: '0.05em' }}>
                    <HiOutlineUser className="w-5 h-5" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0" style={{ backgroundColor: '#fcf9f4', border: '1px solid #f0ede8', boxShadow: '0 10px 40px rgba(77,100,83,0.12)' }}>
                    <Link to="/profile" className="block px-4 py-2.5 text-xs font-semibold transition-colors" style={{ color: '#434843', letterSpacing: '0.03em' }}>My Profile</Link>
                    <Link to="/orders" className="block px-4 py-2.5 text-xs font-semibold transition-colors" style={{ color: '#434843', letterSpacing: '0.03em' }}>My Orders</Link>
                    <button onClick={handleLogout} className="w-full flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold transition-colors" style={{ color: '#ba1a1a', letterSpacing: '0.03em' }}>
                      <HiOutlineLogout className="w-4 h-4" /><span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="text-xs tracking-widest uppercase font-semibold px-6 py-2.5 rounded-full transition-colors" style={{ backgroundColor: '#061b0e', color: '#fcf9f4', letterSpacing: '0.05em' }}>
                Sign In
              </Link>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" style={{ color: '#434843' }}>
            {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-slide-down">
            {infoItems.map((item, i) => (
              <Link key={i} to={item.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold" style={{ color: '#434843', letterSpacing: '0.05em' }}>
                <item.icon className="w-4 h-4" style={{ color: '#994529' }} />
                <span>{item.label}</span>
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/cart" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs font-semibold" style={{ color: '#434843', letterSpacing: '0.05em' }}>Cart ({itemCount})</Link>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs font-semibold" style={{ color: '#434843', letterSpacing: '0.05em' }}>Wishlist</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs font-semibold" style={{ color: '#434843', letterSpacing: '0.05em' }}>My Profile</Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs font-semibold" style={{ color: '#434843', letterSpacing: '0.05em' }}>My Orders</Link>
                {isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs font-semibold" style={{ color: '#434843', letterSpacing: '0.05em' }}>Admin Dashboard</Link>}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-lg text-xs font-semibold" style={{ color: '#ba1a1a', letterSpacing: '0.05em' }}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-xs font-semibold" style={{ color: '#061b0e', letterSpacing: '0.05em' }}>Sign In</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}