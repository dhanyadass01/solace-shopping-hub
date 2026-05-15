import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag, HiOutlineClipboardList, HiOutlineUsers, HiOutlineCurrencyDollar, HiOutlineChartBar } from 'react-icons/hi';
import { orderAPI } from '../../api';
import Spinner from '../../components/ui/Spinner';

const primary = '#061b0e';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getStats().then(({ data }) => setStats(data.stats)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner size="lg" />;
  if (!stats) return <div className="text-center py-16" style={{ color: onSurfaceVariant }}>Failed to load stats</div>;

  const cards = [
    { label: 'Total Orders', value: stats.totalOrders, icon: HiOutlineClipboardList, color: '#1e40af', link: '/admin/orders' },
    { label: 'Total Revenue', value: `₹${stats.totalRevenue?.toLocaleString()}`, icon: HiOutlineCurrencyDollar, color: '#166534', link: '/admin/orders' },
    { label: 'Total Products', value: stats.totalProducts, icon: HiOutlineShoppingBag, color: '#6d28d9', link: '/admin/products' },
    { label: 'Total Users', value: stats.totalOrders || 0, icon: HiOutlineUsers, color: '#9a3412', link: '/admin/users' },
  ];

  return (
    <div>
      <h1 className="font-['Playfair_Display'] text-3xl mb-8" style={{ color: primary, fontWeight: 500 }}>Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(({ label, value, icon: Icon, color, link }) => (
          <Link key={label} to={link} className="card p-6 transition" style={{ border: '1px solid #f0ede8' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs tracking-wider font-semibold" style={{ color: onSurfaceVariant }}>{label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: primary }}>{value}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="card p-6" style={{ border: '1px solid #f0ede8' }}>
          <h2 className="text-xs tracking-widest uppercase font-semibold mb-4 flex items-center space-x-2" style={{ color: primary, letterSpacing: '0.05em' }}>
            <HiOutlineChartBar className="w-5 h-5" /><span>Orders by Status</span>
          </h2>
          <div className="space-y-3">
            {stats.ordersByStatus?.map(({ _id, count }) => (
              <div key={_id} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: onSurfaceVariant }}>{_id}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 rounded-full h-2" style={{ backgroundColor: '#e5e2dd' }}>
                    <div className="h-2 rounded-full" style={{ width: `${(count / stats.totalOrders) * 100}%`, backgroundColor: primary }} />
                  </div>
                  <span className="text-xs font-semibold" style={{ color: onSurface }}>{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6" style={{ border: '1px solid #f0ede8' }}>
          <h2 className="text-xs tracking-widest uppercase font-semibold mb-4 flex items-center space-x-2" style={{ color: primary, letterSpacing: '0.05em' }}>
            <HiOutlineCurrencyDollar className="w-5 h-5" /><span>Monthly Sales</span>
          </h2>
          <div className="space-y-3">
            {stats.monthlySales?.slice(-6).map(({ _id, sales, count }) => (
              <div key={_id} className="flex items-center justify-between">
                <span className="text-xs" style={{ color: onSurfaceVariant }}>{_id}</span>
                <span className="text-xs font-semibold" style={{ color: onSurface }}>₹{sales?.toLocaleString()} ({count} orders)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/products" className="card p-6 text-center transition" style={{ border: '1px solid #f0ede8' }}>
          <HiOutlineShoppingBag className="w-8 h-8 mx-auto mb-2" style={{ color: primary }} />
          <span className="text-xs font-semibold tracking-wider" style={{ color: onSurface }}>Manage Products</span>
        </Link>
        <Link to="/admin/orders" className="card p-6 text-center transition" style={{ border: '1px solid #f0ede8' }}>
          <HiOutlineClipboardList className="w-8 h-8 mx-auto mb-2" style={{ color: primary }} />
          <span className="text-xs font-semibold tracking-wider" style={{ color: onSurface }}>View Orders</span>
        </Link>
        <Link to="/admin/users" className="card p-6 text-center transition" style={{ border: '1px solid #f0ede8' }}>
          <HiOutlineUsers className="w-8 h-8 mx-auto mb-2" style={{ color: primary }} />
          <span className="text-xs font-semibold tracking-wider" style={{ color: onSurface }}>Manage Users</span>
        </Link>
      </div>
    </div>
  );
}
