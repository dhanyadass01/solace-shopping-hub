import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineHeart, HiStar } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const primary = '#061b0e';
const secondary = '#994529';
const onSurfaceVariant = '#434843';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { user, wishlist, toggleWishlist } = useAuth();
  const inWishlist = wishlist?.some(w => w === product.id || w?.id === product.id);

  return (
    <div
      className="animate-slide-up opacity-0 rounded-xl overflow-hidden transition-all duration-300"
      style={{ animationDelay: `${index * 0.08}s`, backgroundColor: '#ffffff', border: '1px solid #f0ede8' }}
    >
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden" style={{ backgroundColor: '#f0ede8' }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(to top, rgba(6,27,14,0.15), transparent)' }} />
        {product.featured && (
          <span className="absolute top-2 left-2 text-white text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: primary, letterSpacing: '0.05em' }}>
            Featured
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(6,27,14,0.5)', backdropFilter: 'blur(4px)' }}>
            <span className="text-white text-xs tracking-widest uppercase font-semibold" style={{ letterSpacing: '0.05em' }}>Out of Stock</span>
          </div>
        )}
      </Link>
      <div className="p-4">
        <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: onSurfaceVariant, letterSpacing: '0.05em' }}>{product.category}</span>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-base font-semibold mt-1 mb-2 line-clamp-1 transition-colors" style={{ color: primary }}>
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <HiStar key={i} className={`w-3.5 h-3.5 transition-all duration-300 ${i < Math.round(product.ratings) ? 'text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="text-[10px] ml-1" style={{ color: onSurfaceVariant }}>({product.numReviews || 0})</span>
        </div>
        <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: '#f0ede8' }}>
          <div className="flex items-center space-x-2">
            {product.discountPrice < product.price ? (
              <><span className="text-base font-bold" style={{ color: primary }}>₹{product.discountPrice?.toLocaleString()}</span><span className="text-xs line-through" style={{ color: onSurfaceVariant }}>₹{product.price?.toLocaleString()}</span></>
            ) : (
              <span className="text-base font-bold" style={{ color: primary }}>₹{product.price?.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {user && (
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ color: inWishlist ? '#ef4444' : onSurfaceVariant }}
              >
                <HiOutlineHeart className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.currentTarget.classList.add('scale-110');
                setTimeout(() => e.currentTarget.classList.remove('scale-110'), 300);
                addToCart(product.id);
              }}
              disabled={product.stock === 0}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50"
              style={{ color: secondary }}
            >
              <HiOutlineShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
