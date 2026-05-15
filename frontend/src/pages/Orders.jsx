import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { orderAPI } from '../api';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';

const primary = '#061b0e';
const secondary = '#994529';
const onSurfaceVariant = '#434843';

const statusBadge = {
  Pending: { bg: '#fef3c7', color: '#92400e' },
  Processing: { bg: '#dbeafe', color: '#1e40af' },
  Shipped: { bg: '#ede9fe', color: '#6d28d9' },
  Delivered: { bg: '#dcfce7', color: '#166534' },
  Cancelled: { bg: '#fee2e2', color: '#991b1b' },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    orderAPI.getMine({ page }).then(({ data }) => {
      setOrders(data.orders);
      setPage(data.page);
      setPages(data.pages);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-8" style={{ color: primary, fontWeight: 500 }}>My Orders</h1>
      {loading ? <Spinner /> : orders.length === 0 ? (
        <div className="text-center py-16">
          <HiOutlineClipboardList className="w-16 h-16 mx-auto mb-4" style={{ color: '#c3c8c1' }} />
          <h2 className="font-['Playfair_Display'] text-xl mb-2" style={{ color: primary, fontWeight: 500 }}>No orders yet</h2>
          <Link to="/products" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const sb = statusBadge[order.orderStatus] || statusBadge.Pending;
            return (
              <Link key={order.id} to={`/orders/${order.id}`} className="card p-6 block transition" style={{ border: '1px solid #f0ede8' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs" style={{ color: onSurfaceVariant }}>Order #{String(order.id).slice(-8).toUpperCase()}</span>
                  <span className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: sb.bg, color: sb.color, letterSpacing: '0.05em' }}>{order.orderStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <img key={i} src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                    ))}
                    {order.items.length > 3 && <span className="text-xs" style={{ color: onSurfaceVariant }}>+{order.items.length - 3}</span>}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm" style={{ color: primary }}>₹{order.totalPrice?.toLocaleString()}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: onSurfaceVariant }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            );
          })}
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
