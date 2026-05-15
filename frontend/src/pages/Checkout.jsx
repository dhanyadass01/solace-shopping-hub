import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed } from 'react-icons/hi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { orderAPI } from '../api';
import CartSummary from '../components/cart/CartSummary';

const primary = '#061b0e';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function Checkout() {
  const { cart, subtotal, shipping, tax, discountAmount, total, coupon, applyCoupon, removeCoupon, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: 'India' });
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await orderAPI.create({ shippingAddress: address, paymentMethod, couponCode: coupon?.code });
      addToast('Order placed successfully!', 'success');
      clearCart();
      navigate(`/orders/${data.order.id}`);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!cart.items?.length) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ backgroundColor: surfaceBright, color: onSurface }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-8" style={{ color: primary, fontWeight: 500 }}>Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Address</label>
                  <input type="text" value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} className="input-field" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>City</label>
                    <input type="text" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Postal Code</label>
                    <input type="text" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} className="input-field" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Country</label>
                  <input type="text" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} className="input-field" required />
                </div>
              </div>
            </div>
            <div className="card p-6">
              <h2 className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>Payment Method</h2>
              <div className="space-y-3">
                {['Razorpay', 'Stripe', 'COD'].map(m => (
                  <label key={m} className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition" style={{ border: `1px solid #c3c8c1`, backgroundColor: surfaceBright }}>
                    <input type="radio" name="payment" value={m} checked={paymentMethod === m} onChange={e => setPaymentMethod(e.target.value)} className="w-4 h-4" style={{ accentColor: primary }} />
                    <span className="text-xs font-semibold tracking-wider" style={{ color: onSurface }}>{m}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs mt-3 flex items-center space-x-1" style={{ color: '#737973' }}>
                <HiOutlineLockClosed className="w-3 h-3" /><span>Your payment info is secure. This is a demo - no real payment will be processed.</span>
              </p>
            </div>
          </div>
          <div>
            <CartSummary subtotal={subtotal} shipping={shipping} tax={tax} discountAmount={discountAmount} total={total} coupon={coupon} onApplyCoupon={applyCoupon} onRemoveCoupon={removeCoupon} />
            <button type="submit" disabled={loading} className="btn-primary w-full mt-4 py-3" style={{ backgroundColor: primary }}>
              {loading ? 'Processing...' : `Place Order - ₹${total?.toLocaleString()}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
