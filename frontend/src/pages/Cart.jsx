import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineShoppingBag, HiMenu, HiMinus, HiPlus, HiOutlineTrash } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/ui/Spinner';

const primary = '#061b0e';
const secondary = '#994529';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

const organicShapes = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 70% 70% 30% / 50% 60% 40% 50%',
  '40% 60% 40% 60% / 70% 30% 70% 30%',
  '50% 50% 20% 80% / 40% 60% 40% 60%',
  '35% 65% 65% 35% / 60% 40% 60% 40%',
];

function CartItem({ item, index, onUpdate, onRemove }) {
  const prod = item.product || item;
  const { quantity } = item;
  if (!prod) return null;

  return (
    <div className="flex items-center gap-4 group">
      <div
        className="w-24 h-32 flex-shrink-0 overflow-hidden shadow-sm"
        style={{ borderRadius: organicShapes[index % organicShapes.length], backgroundColor: '#f0ede8' }}
      >
        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <Link to={`/products/${prod.id}`} className="font-['Playfair_Display'] text-lg" style={{ color: primary, fontWeight: 500 }}>
            {prod.name}
          </Link>
          <span className="text-xs tracking-widest uppercase font-semibold whitespace-nowrap ml-2" style={{ color: primary, letterSpacing: '0.05em' }}>
            ₹{prod.discountPrice?.toLocaleString() || prod.price?.toLocaleString()}
          </span>
        </div>
        <p className="text-[11px] mt-1" style={{ color: onSurfaceVariant }}>Ships free</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center rounded-full px-2 py-1 gap-3" style={{ border: `1px solid #c3c8c1` }}>
            <button onClick={() => quantity > 1 && onUpdate(prod.id, quantity - 1)} disabled={quantity <= 1} className="transition disabled:opacity-30" style={{ color: primary }}>
              <HiMinus className="w-4 h-4" />
            </button>
            <span className="text-xs tracking-widest font-semibold min-w-[12px] text-center" style={{ color: primary, letterSpacing: '0.05em' }}>{quantity}</span>
            <button onClick={() => onUpdate(prod.id, quantity + 1)} className="transition" style={{ color: primary }}>
              <HiPlus className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => onRemove(prod.id)} className="transition-colors" style={{ color: onSurfaceVariant }}>
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
        {/* line item total */}
        <p className="text-[10px] tracking-widest uppercase font-semibold mt-2 text-right" style={{ color: onSurfaceVariant, letterSpacing: '0.03em' }}>
          Line total: ₹{(prod.discountPrice * quantity)?.toLocaleString() || (prod.price * quantity)?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default function Cart() {
  const { cart, loading, itemCount, subtotal, shipping, tax, discountAmount, total, coupon, updateQuantity, removeFromCart, applyCoupon, removeCoupon } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (loading) return <Spinner size="lg" />;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ backgroundColor: surfaceBright, color: onSurface, fontFamily: 'Inter, sans-serif' }}>
        <div className="text-center max-w-sm">
          <HiOutlineShoppingBag className="w-16 h-16 mx-auto mb-4" style={{ color: onSurfaceVariant, opacity: 0.4 }} />
          <h2 className="font-['Playfair_Display'] text-2xl mb-2" style={{ color: primary, fontWeight: 500 }}>Sign in to view your cart</h2>
          <p className="text-sm mb-8" style={{ color: onSurfaceVariant }}>You need to be signed in to manage your ritual items.</p>
          <Link to="/login" className="inline-block text-xs tracking-widest uppercase font-semibold px-10 py-4 rounded-full active:scale-95 transition-transform" style={{ backgroundColor: primary, color: surfaceBright, letterSpacing: '0.05em' }}>
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (cart.items?.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5" style={{ backgroundColor: surfaceBright, color: onSurface, fontFamily: 'Inter, sans-serif' }}>
        <div className="text-center max-w-sm">
          <HiOutlineShoppingBag className="w-16 h-16 mx-auto mb-4" style={{ color: onSurfaceVariant, opacity: 0.4 }} />
          <h2 className="font-['Playfair_Display'] text-2xl mb-2" style={{ color: primary, fontWeight: 500 }}>Your cart is empty</h2>
          <p className="text-sm mb-8" style={{ color: onSurfaceVariant }}>Looks like you haven't added anything to your ritual yet.</p>
          <Link to="/products" className="inline-block text-xs tracking-widest uppercase font-semibold px-10 py-4 rounded-full active:scale-95 transition-transform" style={{ backgroundColor: primary, color: surfaceBright, letterSpacing: '0.05em' }}>
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: surfaceBright, color: onSurface, fontFamily: 'Inter, sans-serif', minHeight: '100dvh', paddingBottom: '220px' }}>
      {/* Top App Bar */}
      <nav className="fixed top-0 w-full z-50" style={{ backgroundColor: `${surfaceBright}cc`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 10px 30px rgba(77,100,83,0.05)' }}>
        <div className="flex justify-between items-center h-16 px-5 max-w-7xl mx-auto">
          <button onClick={() => navigate('/products')} className="transition-opacity hover:opacity-80 active:scale-95 transition-transform duration-200" style={{ color: primary }}>
            <HiMenu className="w-6 h-6" />
          </button>
          <Link to="/" className="font-['Playfair_Display'] text-xl tracking-widest" style={{ color: primary, fontWeight: 600 }}>SÖLACE</Link>
          <div className="relative">
            <button className="transition-opacity hover:opacity-80 active:scale-95 transition-transform duration-200" style={{ color: primary }}>
              <HiOutlineShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: secondary }}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-8 px-5 max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl" style={{ color: primary, fontWeight: 500 }}>Your Cart</h1>
          <p className="text-sm mt-2" style={{ color: onSurfaceVariant }}>{itemCount} {itemCount === 1 ? 'item' : 'items'} selected for your ritual.</p>
        </header>

        {/* Cart Items */}
        <div className="space-y-8">
          {cart.items.map((item, i) => (
            <CartItem key={item.productId || item.product?.id} item={item} index={i} onUpdate={updateQuantity} onRemove={removeFromCart} />
          ))}
        </div>

        {/* Gift Note Section */}
        <section className="mt-16">
          <div className="p-5 rounded-xl space-y-2" style={{ backgroundColor: '#f6f3ee' }}>
            <div className="flex items-center gap-2" style={{ color: '#0d1b05' }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 6h-2V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 4h8v2H8V4zm12 16H4V8h16v12z" />
              </svg>
              <span className="text-xs tracking-widest uppercase font-semibold" style={{ letterSpacing: '0.05em' }}>Add a gift note?</span>
            </div>
            <p className="text-xs" style={{ color: onSurfaceVariant }}>Complementary recycled paper wrapping with every order.</p>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Summary & Checkout */}
      <div className="fixed bottom-0 left-0 w-full z-50 rounded-t-xl" style={{ backgroundColor: surfaceBright, boxShadow: '0 -10px 40px rgba(77,100,83,0.08)' }}>
        <div className="px-5 py-4 max-w-2xl mx-auto space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs" style={{ color: onSurfaceVariant }}>
              <span className="font-semibold tracking-wider">Subtotal</span>
              <span className="font-semibold">₹{subtotal?.toLocaleString()}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold tracking-wider" style={{ color: '#166534' }}>Discount ({coupon?.code})</span>
                <span className="font-semibold" style={{ color: '#166534' }}>-₹{discountAmount?.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-xs" style={{ color: onSurfaceVariant }}>
              <span className="font-semibold tracking-wider">Shipping</span>
              <span className="font-semibold">{shipping === 0 ? <span style={{ color: '#166534' }}>FREE</span> : `₹${shipping}`}</span>
            </div>
            <div className="pt-2 flex justify-between items-center border-t" style={{ borderColor: `${onSurfaceVariant}1a` }}>
              <span className="font-['Playfair_Display'] text-xl" style={{ color: primary, fontWeight: 500 }}>Total</span>
              <span className="font-['Playfair_Display'] text-xl" style={{ color: primary, fontWeight: 500 }}>₹{total?.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-full text-xs tracking-widest uppercase font-semibold flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
            style={{ backgroundColor: primary, color: surfaceBright, letterSpacing: '0.05em' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            SECURE CHECKOUT
          </button>
          {coupon?.code ? (
            <div className="flex items-center justify-between py-2 px-4 rounded-lg" style={{ backgroundColor: '#f0fdf4' }}>
              <span className="text-xs font-semibold" style={{ color: '#166534' }}>Code: {coupon.code} ({coupon.discount}% off)</span>
              <button onClick={removeCoupon} className="text-xs font-semibold" style={{ color: secondary }}>Remove</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                id="coupon-input"
                className="flex-1 px-4 py-2.5 rounded-lg text-xs outline-none transition-all"
                style={{ border: `1px solid #c3c8c1`, backgroundColor: surfaceBright, color: onSurface }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const input = document.getElementById('coupon-input');
                    applyCoupon(input.value);
                    input.value = '';
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById('coupon-input');
                  applyCoupon(input.value);
                  input.value = '';
                }}
                className="text-xs tracking-widest uppercase font-semibold px-5 py-2.5 rounded-lg active:scale-95 transition-transform"
                style={{ backgroundColor: primary, color: surfaceBright, letterSpacing: '0.05em' }}
              >
                Apply
              </button>
            </div>
          )}
          <div className="h-4" />
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full" style={{ backgroundColor: '#b4cdb8', filter: 'blur(120px)' }} />
        <div className="absolute bottom-[10%] left-[-10%] w-[250px] h-[250px] rounded-full" style={{ backgroundColor: '#ffdbd0', filter: 'blur(100px)' }} />
      </div>
    </div>
  );
}
