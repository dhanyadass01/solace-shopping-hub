import { useState } from 'react';

const primary = '#061b0e';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function CartSummary({ subtotal, shipping, tax, discountAmount, total, coupon, onApplyCoupon, onRemoveCoupon }) {
  const [code, setCode] = useState('');

  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-xs tracking-widest uppercase font-semibold" style={{ color: primary, letterSpacing: '0.05em' }}>Order Summary</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between"><span style={{ color: onSurfaceVariant }}>Subtotal</span><span className="font-medium" style={{ color: onSurface }}>₹{subtotal?.toLocaleString()}</span></div>
        {discountAmount > 0 && <div className="flex justify-between"><span style={{ color: '#166534' }}>Discount ({coupon?.code})</span><span className="font-medium" style={{ color: '#166534' }}>-₹{discountAmount?.toLocaleString()}</span></div>}
        <div className="flex justify-between"><span style={{ color: onSurfaceVariant }}>Shipping</span><span className="font-medium" style={{ color: onSurface }}>{shipping === 0 ? <span style={{ color: '#166534' }}>FREE</span> : `₹${shipping}`}</span></div>
        <div className="flex justify-between"><span style={{ color: onSurfaceVariant }}>Tax (18%)</span><span className="font-medium" style={{ color: onSurface }}>₹{tax?.toLocaleString()}</span></div>
        <div className="pt-3 flex justify-between" style={{ borderTop: '1px solid #f0ede8' }}>
          <span className="font-semibold" style={{ color: onSurface }}>Total</span><span className="font-bold text-xl" style={{ color: primary }}>₹{total?.toLocaleString()}</span>
        </div>
      </div>
      {coupon?.code ? (
        <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f0fdf4' }}>
          <span className="text-xs font-semibold" style={{ color: '#166534' }}>Code: {coupon.code} ({coupon.discount}% off)</span>
          <button onClick={onRemoveCoupon} className="text-xs font-semibold" style={{ color: '#994529' }}>Remove</button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <input type="text" placeholder="Coupon code" value={code} onChange={e => setCode(e.target.value)} className="flex-1 px-3 py-2 rounded-lg text-xs outline-none" style={{ border: '1px solid #c3c8c1', backgroundColor: '#fcf9f4', color: onSurface }} />
          <button onClick={() => { onApplyCoupon(code); setCode(''); }} disabled={!code} className="text-xs tracking-widest uppercase font-semibold px-4 py-2 rounded-lg active:scale-95 transition-transform disabled:opacity-50" style={{ backgroundColor: primary, color: '#fcf9f4', letterSpacing: '0.05em' }}>Apply</button>
        </div>
      )}
    </div>
  );
}
