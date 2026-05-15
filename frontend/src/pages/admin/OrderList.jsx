import { useState, useEffect } from 'react';
import { orderAPI } from '../../api';
import { useToast } from '../../context/ToastContext';
import Pagination from '../../components/ui/Pagination';
import Spinner from '../../components/ui/Spinner';

const primary = '#061b0e';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

const statusBadge = {
  Pending: { bg: '#fef3c7', color: '#92400e' },
  Processing: { bg: '#dbeafe', color: '#1e40af' },
  Shipped: { bg: '#ede9fe', color: '#6d28d9' },
  Delivered: { bg: '#dcfce7', color: '#166534' },
  Cancelled: { bg: '#fee2e2', color: '#991b1b' },
};

export default function AdminOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const { addToast } = useToast();

  const fetchOrders = () => {
    setLoading(true);
    orderAPI.getAll({ page }).then(({ data }) => {
      setOrders(data.orders);
      setPage(data.page);
      setPages(data.pages);
    }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, [page]);

  const handleStatusUpdate = async (orderId, orderStatus) => {
    try {
      await orderAPI.updateStatus(orderId, { orderStatus });
      addToast(`Order status updated to ${orderStatus}`, 'success');
      fetchOrders();
    } catch (err) {
      addToast('Failed to update status', 'error');
    }
  };

  const handlePaymentToggle = async (orderId, isPaid) => {
    try {
      await orderAPI.updateStatus(orderId, { isPaid });
      addToast('Payment status updated', 'success');
      fetchOrders();
    } catch (err) {
      addToast('Failed to update payment', 'error');
    }
  };

  return (
    <div>
      <h1 className="font-['Playfair_Display'] text-2xl mb-6" style={{ color: primary, fontWeight: 500 }}>All Orders</h1>
      {loading ? <Spinner /> : (
        <div className="card overflow-hidden" style={{ border: '1px solid #f0ede8' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#f6f3ee' }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Payment</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#f0ede8' }}>
                {orders.map(order => {
                  const sb = statusBadge[order.orderStatus] || statusBadge.Pending;
                  return (
                    <tr key={order.id} className="hover:opacity-80 transition" style={{ backgroundColor: '#ffffff' }}>
                      <td className="px-4 py-3 text-xs font-mono" style={{ color: onSurface }}>#{String(order.id).slice(-8).toUpperCase()}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: onSurface }}>{order.user?.name || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm font-medium" style={{ color: onSurface }}>₹{order.totalPrice?.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: order.isPaid ? '#dcfce7' : '#fef3c7', color: order.isPaid ? '#166534' : '#92400e', letterSpacing: '0.05em' }}>
                          {order.isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select value={order.orderStatus} onChange={e => handleStatusUpdate(order.id, e.target.value)} className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer" style={{ backgroundColor: sb.bg, color: sb.color, letterSpacing: '0.05em' }}>
                          {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: onSurfaceVariant }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handlePaymentToggle(order.id, !order.isPaid)} className="text-xs font-semibold hover:opacity-70 transition" style={{ color: primary }}>
                          {order.isPaid ? 'Mark Unpaid' : 'Mark Paid'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
