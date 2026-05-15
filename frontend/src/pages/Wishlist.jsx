import { HiOutlineHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/product/ProductCard';
import Spinner from '../components/ui/Spinner';

const primary = '#061b0e';
const onSurfaceVariant = '#434843';

export default function Wishlist() {
  const { user, wishlist, loading } = useAuth();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <HiOutlineHeart className="w-16 h-16 mx-auto mb-4" style={{ color: '#c3c8c1' }} />
          <h2 className="font-['Playfair_Display'] text-2xl mb-2" style={{ color: primary, fontWeight: 500 }}>Sign in to view wishlist</h2>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-8" style={{ color: primary, fontWeight: 500 }}>My Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <HiOutlineHeart className="w-16 h-16 mx-auto mb-4" style={{ color: '#c3c8c1' }} />
          <p className="text-sm mb-6" style={{ color: onSurfaceVariant }}>Your wishlist is empty</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => <ProductCard key={product.id || product._id} product={product} />)}
        </div>
      )}
    </div>
  );
}
