import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiStar, HiChevronLeft, HiOutlineShoppingBag, HiOutlineHeart, HiMinus, HiPlus } from 'react-icons/hi';
import { productAPI } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Spinner from '../components/ui/Spinner';

const primary = '#061b0e';
const secondary = '#994529';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const { addToCart } = useCart();
  const { user, wishlist, toggleWishlist } = useAuth();
  const { addToast } = useToast();
  const inWishlist = wishlist?.some(w => w === parseInt(id) || w === id || w?.id === parseInt(id) || w?.id === id);

  useEffect(() => {
    setLoading(true);
    productAPI.getById(id).then(({ data }) => setProduct(data.product)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await productAPI.createReview(id, review);
      const { data } = await productAPI.getById(id);
      setProduct(data.product);
      setReview({ rating: 5, comment: '' });
      addToast('Review submitted!', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit review', 'error');
    }
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    navigate('/checkout');
  };

  if (loading) return <Spinner size="lg" />;
  if (!product) return <div className="text-center py-16" style={{ color: onSurfaceVariant }}>Product not found</div>;

  return (
    <div style={{ backgroundColor: surfaceBright, color: onSurface, fontFamily: 'Inter, sans-serif', minHeight: '100dvh', paddingBottom: '6rem' }}>
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50" style={{ backgroundColor: `${surfaceBright}cc`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 10px 30px rgba(77,100,83,0.05)' }}>
        <div className="flex justify-between items-center h-16 px-5 max-w-7xl mx-auto">
          <button onClick={() => navigate(-1)} className="transition-opacity hover:opacity-80 active:scale-95 transition-transform duration-200" style={{ color: primary }}>
            <HiChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-['Playfair_Display'] text-xl tracking-widest" style={{ color: primary, fontWeight: 600 }}>SÖLACE</span>
          <button onClick={() => navigate('/cart')} className="transition-opacity hover:opacity-80 active:scale-95 transition-transform duration-200" style={{ color: primary }}>
            <HiOutlineShoppingBag className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:pt-8">
          {/* Product Image */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-2xl w-full max-w-lg mx-auto lg:max-w-none" style={{ backgroundColor: '#f0ede8' }}>
              <img src={product.image} alt={product.name} className="w-full object-cover" style={{ aspectRatio: '4/5' }} />
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-6 lg:mt-0 space-y-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1 flex-1 min-w-0">
                <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl lg:text-4xl leading-tight" style={{ color: primary, fontWeight: 500 }}>{product.name}</h1>
                <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: secondary, letterSpacing: '0.05em' }}>{product.category}</p>
              </div>
              <span className="font-['Playfair_Display'] text-2xl lg:text-3xl whitespace-nowrap ml-4" style={{ color: primary }}>
                ₹{product.discountPrice?.toLocaleString() || product.price?.toLocaleString()}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className={`w-4 h-4 ${i < Math.round(product.ratings) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-xs" style={{ color: onSurfaceVariant }}>({product.numReviews || 0} reviews)</span>
            </div>

            {/* Description */}
            <div className="pt-4 border-t" style={{ borderColor: `${onSurfaceVariant}1a` }}>
              <h2 className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: primary, letterSpacing: '0.05em' }}>SOURCED FROM NATURE</h2>
              <p className="text-sm leading-relaxed" style={{ color: onSurfaceVariant }}>{product.description}</p>
            </div>

            {/* Availability */}
            {product.stock > 0 && (
              <p className="text-xs font-semibold" style={{ color: '#166534' }}>
                In Stock ({product.stock} available)
              </p>
            )}
            {product.stock === 0 && (
              <p className="text-xs font-semibold" style={{ color: '#991b1b' }}>
                Out of Stock
              </p>
            )}

            {/* Sustainability Icons */}
            <div className="flex items-center space-x-6 py-2">
              <div className="flex flex-col items-center space-y-1" style={{ opacity: 0.7 }}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="1.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span className="text-[10px] tracking-widest font-semibold" style={{ color: onSurfaceVariant, letterSpacing: '0.03em' }}>Cruelty-Free</span>
              </div>
              <div className="flex flex-col items-center space-y-1" style={{ opacity: 0.7 }}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="1.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.93V19c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm-1.41-3.52l-2.83-2.83 1.41-1.41 2.83 2.83L9.59 14.41zm6.82-6.82l-2.83 2.83-1.41-1.41 2.83-2.83L16.41 7.59zm.59 5.52l-2.83-2.83 1.41-1.41 2.83 2.83L17 13.11z" />
                </svg>
                <span className="text-[10px] tracking-widest font-semibold" style={{ color: onSurfaceVariant, letterSpacing: '0.03em' }}>Vegan</span>
              </div>
              <div className="flex flex-col items-center space-y-1" style={{ opacity: 0.7 }}>
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="1.5">
                  <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z" />
                </svg>
                <span className="text-[10px] tracking-widest font-semibold" style={{ color: onSurfaceVariant, letterSpacing: '0.03em' }}>Recycled</span>
              </div>
            </div>

            {/* Desktop: Quantity + Wishlist */}
            <div className="hidden lg:flex items-center space-x-4 pt-2">
              <div className="flex items-center rounded-xl" style={{ border: `1px solid ${onSurfaceVariant}33` }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:opacity-60 transition" style={{ color: primary }}><HiMinus className="w-5 h-5" /></button>
                <span className="px-6 font-semibold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:opacity-60 transition" style={{ color: primary }}><HiPlus className="w-5 h-5" /></button>
              </div>
              {user && (
                <button
                  onClick={() => toggleWishlist(id)}
                  className="p-3 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{ border: `2px solid ${inWishlist ? '#ef4444' : `${onSurfaceVariant}33`}`, color: inWishlist ? '#ef4444' : onSurfaceVariant, backgroundColor: inWishlist ? '#fef2f2' : 'transparent' }}
                >
                  <HiOutlineHeart className="w-5 h-5" />
                </button>
              )}
              {/* Desktop: Buttons */}
              <div className="flex items-center space-x-3 flex-1">
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="flex-1 py-3 px-6 rounded-full text-xs tracking-widest uppercase font-semibold active:scale-[0.98] transition-transform disabled:opacity-50"
                  style={{ backgroundColor: secondary, color: '#ffffff', letterSpacing: '0.05em' }}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => addToCart(product.id, quantity)}
                  disabled={product.stock === 0}
                  className="flex-1 py-3 px-6 rounded-full text-xs tracking-widest uppercase font-semibold active:scale-[0.98] transition-transform disabled:opacity-50"
                  style={{ backgroundColor: primary, color: surfaceBright, letterSpacing: '0.05em' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Mobile: Quantity + Wishlist (inline) */}
            <div className="flex lg:hidden items-center space-x-4 pt-2">
              <div className="flex items-center rounded-xl" style={{ border: `1px solid ${onSurfaceVariant}33` }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:opacity-60 transition" style={{ color: primary }}><HiMinus className="w-5 h-5" /></button>
                <span className="px-6 font-semibold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:opacity-60 transition" style={{ color: primary }}><HiPlus className="w-5 h-5" /></button>
              </div>
              {user && (
                <button
                  onClick={() => toggleWishlist(id)}
                  className="p-3 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  style={{ border: `2px solid ${inWishlist ? '#ef4444' : `${onSurfaceVariant}33`}`, color: inWishlist ? '#ef4444' : onSurfaceVariant, backgroundColor: inWishlist ? '#fef2f2' : 'transparent' }}
                >
                  <HiOutlineHeart className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Accordion Details */}
            <div className="space-y-1 pt-4">
              <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: `${onSurfaceVariant}1a` }}>
                <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: primary, letterSpacing: '0.05em' }}>Application Ritual</span>
                <span className="text-sm" style={{ color: onSurfaceVariant }}>+</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b" style={{ borderColor: `${onSurfaceVariant}1a` }}>
                <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: primary, letterSpacing: '0.05em' }}>Full Ingredients</span>
                <span className="text-sm" style={{ color: onSurfaceVariant }}>+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="px-5 mt-16 max-w-4xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-xl mb-6" style={{ fontWeight: 500 }}>Reviews</h2>
          {user && (
            <form onSubmit={handleReview} className="p-6 rounded-xl space-y-4 mb-8 animate-fade-in" style={{ backgroundColor: '#f6f3ee' }}>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map(r => (
                  <button key={r} type="button" onClick={() => setReview({ ...review, rating: r })}>
                    <HiStar className={`w-6 h-6 ${r <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
              <textarea value={review.comment} onChange={e => setReview({ ...review, comment: e.target.value })} className="w-full px-4 py-2.5 rounded-lg outline-none text-sm transition-all" style={{ border: `1px solid ${onSurfaceVariant}33`, backgroundColor: surfaceBright, color: onSurface }} rows={3} placeholder="Write your review..." required />
              <button type="submit" className="text-xs tracking-widest uppercase font-semibold px-8 py-3 rounded-full active:scale-95 transition-transform" style={{ backgroundColor: secondary, color: '#ffffff', letterSpacing: '0.05em' }}>Submit Review</button>
            </form>
          )}
          {(!product.reviews || product.reviews.length === 0) ? (
            <p className="text-sm" style={{ color: onSurfaceVariant }}>No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((r, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: '#f6f3ee' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold" style={{ color: primary }}>{r.user || r.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, j) => (
                        <HiStar key={j} className={`w-3.5 h-3.5 ${j < r.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: onSurfaceVariant }}>{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="h-8" />
      </main>

      {/* Fixed Bottom CTA (mobile only) */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-5 pb-4 pt-4 lg:hidden" style={{ backgroundColor: `${surfaceBright}E6`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex-1 h-14 rounded-full text-xs tracking-widest uppercase font-semibold active:scale-[0.98] transition-transform shadow-lg disabled:opacity-50"
            style={{ backgroundColor: secondary, color: '#ffffff', letterSpacing: '0.05em', boxShadow: `0 8px 24px ${secondary}33` }}
          >
            Buy Now
          </button>
          <button
            onClick={() => addToCart(product.id, quantity)}
            disabled={product.stock === 0}
            className="flex-1 h-14 rounded-full text-xs tracking-widest uppercase font-semibold active:scale-[0.98] transition-transform shadow-lg disabled:opacity-50"
            style={{ backgroundColor: primary, color: surfaceBright, letterSpacing: '0.05em', boxShadow: `0 8px 24px rgba(6,27,14,0.3)` }}
          >
            <span className="flex items-center justify-center space-x-2">
              <HiOutlineShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
