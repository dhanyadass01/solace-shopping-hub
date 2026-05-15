import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiArrowLeft, HiOutlineTruck, HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';
import { orderAPI } from '../api';
import Spinner from '../components/ui/Spinner';

const primary = '#061b0e';
const secondary = '#994529';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

const statusConfig = {
  Pending: { icon: HiOutlineClock, color: '#92400e', bg: '#fef3c7' },
  Processing: { icon: HiOutlineClock, color: '#1e40af', bg: '#dbeafe' },
  Shipped: { icon: HiOutlineTruck, color: '#6d28d9', bg: '#ede9fe' },
  Delivered: { icon: HiOutlineCheckCircle, color: '#166534', bg: '#dcfce7' },
  Cancelled: { icon: HiOutlineXCircle, color: '#991b1b', bg: '#fee2e2' },
};

const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getById(id).then(({ data }) => setOrder(data.order)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner size="lg" />;
  if (!order) return <div className="text-center py-16" style={{ color: onSurfaceVariant }}>Order not found</div>;

  const StatusIcon = statusConfig[order.orderStatus]?.icon || HiOutlineClock;
  const sc = statusConfig[order.orderStatus] || statusConfig.Pending;
  const currentStep = steps.indexOf(order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/orders" className="flex items-center space-x-1 text-xs font-semibold mb-6 transition-colors" style={{ color: primary, letterSpacing: '0.03em' }}>
        <HiArrowLeft className="w-4 h-4" /><span>Back to Orders</span>
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-['Playfair_Display'] text-3xl" style={{ color: primary, fontWeight: 500 }}>Order #{String(order.id).slice(-8).toUpperCase()}</h1>
          <p className="text-sm mt-1" style={{ color: onSurfaceVariant }}>Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 rounded-xl" style={{ backgroundColor: sc.bg }}>
          <StatusIcon className="w-5 h-5" style={{ color: sc.color }} />
          <span className="text-xs font-semibold" style={{ color: sc.color, letterSpacing: '0.03em' }}>{order.orderStatus}</span>
        </div>
      </div>

      {order.orderStatus !== 'Cancelled' && (
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const isCompleted = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all" style={{ backgroundColor: isCompleted ? primary : '#e5e2dd', color: isCompleted ? surfaceBright : '#737973' }}>
                      {i + 1}
                    </div>
                    <span className="text-[10px] mt-1 font-semibold tracking-wider" style={{ color: isCurrent ? primary : isCompleted ? onSurface : '#737973' }}>{step}</span>
                  </div>
                  {i < steps.length - 1 && <div className="flex-1 h-0.5 mx-2" style={{ backgroundColor: i < currentStep ? primary : '#e5e2dd' }} />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs tracking-widest uppercase font-semibold" style={{ color: primary, letterSpacing: '0.05em' }}>Items</h2>
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 card p-4">
              <Link to={`/products/${item.productId || item.product}`} className="w-16 h-16 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
              </Link>
              <div className="flex-1">
                <Link to={`/products/${item.productId || item.product}`} className="text-sm font-semibold transition-colors" style={{ color: onSurface }}>{item.name}</Link>
                <p className="text-xs mt-0.5" style={{ color: onSurfaceVariant }}>Qty: {item.quantity} x ₹{item.price?.toLocaleString()}</p>
              </div>
              <p className="font-bold text-sm" style={{ color: primary }}>₹{(item.price * item.quantity)?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span style={{ color: onSurfaceVariant }}>Subtotal</span><span style={{ color: onSurface }}>₹{order.itemsPrice?.toLocaleString()}</span></div>
              {order.coupon?.discount && <div className="flex justify-between"><span style={{ color: '#166534' }}>Discount ({order.coupon.code})</span><span style={{ color: '#166534' }}>-₹{((order.itemsPrice * order.coupon.discount) / 100)?.toLocaleString()}</span></div>}
              <div className="flex justify-between"><span style={{ color: onSurfaceVariant }}>Shipping</span><span style={{ color: onSurface }}>{order.shippingPrice === 0 ? <span style={{ color: '#166534' }}>FREE</span> : `₹${order.shippingPrice}`}</span></div>
              <div className="flex justify-between"><span style={{ color: onSurfaceVariant }}>Tax</span><span style={{ color: onSurface }}>₹{order.taxPrice?.toLocaleString()}</span></div>
              <div className="pt-3 flex justify-between" style={{ borderTop: '1px solid #f0ede8' }}>
                <span className="font-semibold" style={{ color: onSurface }}>Total</span><span className="font-bold text-lg" style={{ color: primary }}>₹{order.totalPrice?.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>Shipping Address</h2>
            <div className="text-sm leading-relaxed" style={{ color: onSurfaceVariant }}>
              <p>{order.shippingAddress?.address}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>Payment</h2>
            <div className="text-sm space-y-1" style={{ color: onSurfaceVariant }}>
              <p>Method: {order.paymentMethod}</p>
              <p>Status: {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Unpaid'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
