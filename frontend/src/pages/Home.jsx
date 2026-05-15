import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiOutlineShoppingBag, HiHome, HiOutlineViewGrid, HiOutlineUser, HiChevronLeft, HiChevronRight, HiStar, HiTag, HiLightningBolt, HiArrowRight, HiX, HiOutlineInformationCircle, HiOutlineSupport, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
import { productAPI } from '../api';
import { useCart } from '../context/CartContext';

const surfaceBright = '#fcf9f4';
const primary = '#061b0e';
const secondary = '#994529';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [closeMenu]);

  const menuItems = [
    { label: 'Shop Products', icon: HiOutlineViewGrid, href: '/products' },
    { label: 'About SÖLACE', icon: HiOutlineInformationCircle, href: '/about' },
    { label: 'Customer Care', icon: HiOutlineSupport, href: '/customer-care' },
    { label: 'Contact Us', icon: HiOutlinePhone, href: '/contact' },
    { label: 'Email Support', icon: HiOutlineMail, href: '/contact' },
  ];

  useEffect(() => {
    productAPI.getAll({ limit: 10 }).then(({ data }) => setProducts(data.products)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
    }
  };

  const collections = [
    { img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', title: 'Fashion', subtitle: 'Trending Styles', link: '/products?category=Fashion' },
    { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', title: 'Home & Living', subtitle: 'Modern Comfort', link: '/products?category=Home+%26+Living' },
    { img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', title: 'Cosmetics', subtitle: 'Beauty Essentials', link: '/products?category=Cosmetics' },
    { img: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80', title: 'Accessories', subtitle: 'Complete the Look', link: '/products?category=Accessories' },
  ];

  return (
    <div style={{ backgroundColor: surfaceBright, color: onSurface, fontFamily: 'Inter, sans-serif', minHeight: '100dvh', paddingBottom: '4rem' }}>
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50" style={{ backgroundColor: `${surfaceBright}cc`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 10px 30px rgba(77,100,83,0.05)' }}>
        <div className="flex justify-between items-center h-14 px-5 max-w-7xl mx-auto">
          <div ref={menuRef} className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="transition-opacity hover:opacity-80 active:scale-95 transition-transform duration-200" style={{ color: primary }}>
              {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
            {menuOpen && (
              <div className="absolute top-12 left-0 w-56 rounded-xl overflow-hidden animate-slide-down z-50" style={{ backgroundColor: '#ffffff', border: '1px solid #f0ede8', boxShadow: '0 20px 60px rgba(77,100,83,0.15)' }}>
                {menuItems.map((item, i) => (
                  <Link key={i} to={item.href} onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-xs font-semibold transition-colors hover:translate-x-1" style={{ color: '#434843', borderBottom: i < menuItems.length - 1 ? '1px solid #f0ede8' : 'none', letterSpacing: '0.03em' }}>
                    <item.icon className="w-4 h-4" style={{ color: secondary }} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/" className="font-['Playfair_Display'] text-xl tracking-widest" style={{ color: primary, fontWeight: 600 }}>SÖLACE</Link>
          <Link to="/cart" className="relative transition-opacity hover:opacity-80 active:scale-95 transition-transform duration-200" style={{ color: primary }}>
            <HiOutlineShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: secondary }}>
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={{ height: '600px' }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80')" }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,27,14,0.7) 0%, rgba(6,27,14,0.3) 100%)' }}></div>
        </div>
        <div className="relative h-full flex flex-col justify-center px-5 max-w-7xl mx-auto">
          <span className="text-xs tracking-widest uppercase font-semibold mb-3" style={{ color: `${surfaceBright}aa`, letterSpacing: '0.08em' }}>Limited Time Offers</span>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl leading-tight mb-4" style={{ color: surfaceBright, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Shop Smart,<br />Live Better
          </h1>
          <p className="max-w-md" style={{ color: `${surfaceBright}cc`, fontSize: '16px', lineHeight: 1.7 }}>
            Discover the latest trends, exclusive deals, and premium products curated just for you.
          </p>
          <div className="flex items-center gap-4 pt-6">
            <Link to="/products" className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-semibold active:scale-95 transition-transform" style={{ backgroundColor: surfaceBright, color: primary, letterSpacing: '0.05em' }}>
              <span>Shop Now</span>
              <HiArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/products?category=Fashion" className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full text-sm tracking-widest uppercase font-semibold active:scale-95 transition-transform" style={{ border: '1px solid rgba(252,249,244,0.3)', color: surfaceBright, letterSpacing: '0.05em' }}>
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* Top Picks of the Day */}
      <section className="mt-10 mb-6">
        <div className="px-5 flex justify-between items-center mb-4 max-w-7xl mx-auto">
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl" style={{ fontWeight: 500 }}>Top Picks of the Day</h2>
            <p className="text-xs mt-1" style={{ color: onSurfaceVariant }}>Curated just for you</p>
          </div>
          <Link to="/products" className="flex items-center space-x-1 text-xs tracking-widest font-semibold" style={{ color: secondary, letterSpacing: '0.03em' }}>
            <span>VIEW ALL</span>
            <HiArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-[3px] rounded-full animate-spin" style={{ borderColor: '#e5e2dd', borderTopColor: primary, borderRightColor: secondary }} />
          </div>
        ) : (
          <div className="relative max-w-7xl mx-auto group/scroll">
            <div ref={scrollRef} className="flex overflow-x-auto gap-5 px-5 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
              {products.map((p, i) => (
                <div key={p.id} className="min-w-[220px] flex flex-col space-y-3 animate-fade-in cursor-pointer" style={{ animationDelay: `${i * 0.06}s` }} onClick={() => navigate(`/products/${p.id}`)}>
                  <div className="aspect-square rounded-xl overflow-hidden group/card" style={{ backgroundColor: '#f0ede8' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                    {p.discountPrice < p.price && (
                      <span className="absolute top-2 left-2 text-white text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: secondary, letterSpacing: '0.05em' }}>
                        {Math.round((1 - p.discountPrice / p.price) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: onSurfaceVariant, letterSpacing: '0.05em' }}>{p.category}</p>
                    <h4 className="text-sm font-semibold mt-1 line-clamp-1" style={{ fontFamily: 'Inter, sans-serif' }}>{p.name}</h4>
                    <div className="flex items-center justify-center space-x-1 mt-1">
                      <HiStar className="w-3 h-3" style={{ color: '#f59e0b' }} />
                      <span className="text-[10px]" style={{ color: onSurfaceVariant }}>{p.ratings || '4.5'}</span>
                    </div>
                    <p className="text-sm mt-1 font-bold" style={{ color: secondary }}>
                      ₹{p.discountPrice?.toLocaleString() || p.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scroll(-1)} className="absolute left-1 top-1/3 -translate-y-1/2 p-2 rounded-full z-10 opacity-0 group-hover/scroll:opacity-100 transition-opacity shadow-lg" style={{ backgroundColor: surfaceBright }}>
              <HiChevronLeft className="w-5 h-5" style={{ color: primary }} />
            </button>
            <button onClick={() => scroll(1)} className="absolute right-1 top-1/3 -translate-y-1/2 p-2 rounded-full z-10 opacity-0 group-hover/scroll:opacity-100 transition-opacity shadow-lg" style={{ backgroundColor: surfaceBright }}>
              <HiChevronRight className="w-5 h-5" style={{ color: primary }} />
            </button>
          </div>
        )}
      </section>

      {/* Best Deals for You - Banner */}
      <section className="mx-5 mb-10 max-w-7xl lg:mx-auto">
        <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #061b0e 0%, #0d2e1a 100%)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <svg viewBox="0 0 200 200" fill="white"><circle cx="100" cy="100" r="100" /></svg>
          </div>
          <div className="relative px-6 py-10 md:px-10 md:py-14 text-center">
            <HiTag className="w-8 h-8 mx-auto mb-3" style={{ color: secondary }} />
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-2" style={{ color: surfaceBright, fontWeight: 500 }}>Best Deals for You</h2>
            <p className="text-sm max-w-lg mx-auto mb-6" style={{ color: `${surfaceBright}bb` }}>
              Unlock exclusive discounts on top-rated products. Limited-time offers you don't want to miss!
            </p>
            <Link to="/products" className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs tracking-widest uppercase font-semibold active:scale-95 transition-transform" style={{ backgroundColor: secondary, color: surfaceBright, letterSpacing: '0.05em' }}>
              <HiLightningBolt className="w-4 h-4" />
              <span>Shop Deals</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Discover Trending Products */}
      <section className="mb-10">
        <div className="px-5 flex justify-between items-center mb-4 max-w-7xl mx-auto">
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl" style={{ fontWeight: 500 }}>Discover Trending Products</h2>
            <p className="text-xs mt-1" style={{ color: onSurfaceVariant }}>What everyone's talking about</p>
          </div>
          <Link to="/products" className="flex items-center space-x-1 text-xs tracking-widest font-semibold" style={{ color: secondary, letterSpacing: '0.03em' }}>
            <span>VIEW ALL</span>
            <HiArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-[3px] rounded-full animate-spin" style={{ borderColor: '#e5e2dd', borderTopColor: primary, borderRightColor: secondary }} />
          </div>
        ) : (
          <div className="relative max-w-7xl mx-auto group/scroll">
            <div className="flex overflow-x-auto gap-5 px-5 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
              {[...products].reverse().slice(0, 8).map((p, i) => (
                <div key={p.id} className="min-w-[200px] flex flex-col space-y-2 animate-fade-in cursor-pointer" style={{ animationDelay: `${i * 0.06}s` }} onClick={() => navigate(`/products/${p.id}`)}>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden group/card" style={{ backgroundColor: '#f0ede8' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500" />
                  </div>
                  <p className="text-[10px] tracking-widest uppercase font-semibold text-center" style={{ color: onSurfaceVariant, letterSpacing: '0.05em' }}>{p.category}</p>
                  <h4 className="text-xs font-semibold text-center line-clamp-1">{p.name}</h4>
                  <p className="text-xs font-bold text-center" style={{ color: secondary }}>₹{p.discountPrice?.toLocaleString() || p.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Latest Collections */}
      <section className="px-5 mb-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl" style={{ fontWeight: 500 }}>Latest Collections</h2>
            <p className="text-xs mt-1" style={{ color: onSurfaceVariant }}>Explore by category</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {collections.map((col, i) => (
            <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer" onClick={() => navigate(col.link)}>
              <img src={col.img} alt={col.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(6,27,14,0.7) 0%, transparent 60%)' }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-['Playfair_Display'] text-lg md:text-xl" style={{ color: surfaceBright, fontWeight: 500 }}>{col.title}</h3>
                <p className="text-[10px] tracking-widest uppercase mt-0.5 font-semibold" style={{ color: `${surfaceBright}aa`, letterSpacing: '0.05em' }}>{col.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full z-50" style={{ backgroundColor: surfaceBright, boxShadow: '0 -4px 20px rgba(77,100,83,0.06)' }}>
        <div className="flex justify-around items-center h-14 px-4 max-w-lg mx-auto">
          <Link to="/" className="flex flex-col items-center justify-center" style={{ color: secondary, fontWeight: 700 }}>
            <HiHome className="w-5 h-5" />
            <span className="text-[10px] tracking-widest font-semibold mt-0.5" style={{ letterSpacing: '0.05em' }}>Home</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center justify-center transition-colors" style={{ color: onSurfaceVariant }}>
            <HiOutlineViewGrid className="w-5 h-5" />
            <span className="text-[10px] tracking-widest font-semibold mt-0.5" style={{ letterSpacing: '0.05em' }}>Shop</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center justify-center transition-colors" style={{ color: onSurfaceVariant }}>
            <div className="relative">
              <HiOutlineShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: secondary }}>
                  {itemCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-widest font-semibold mt-0.5" style={{ letterSpacing: '0.05em' }}>Cart</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center justify-center transition-colors" style={{ color: onSurfaceVariant }}>
            <HiOutlineUser className="w-5 h-5" />
            <span className="text-[10px] tracking-widest font-semibold mt-0.5" style={{ letterSpacing: '0.05em' }}>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}