import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineHeart, HiOutlineClipboardList, HiOutlineLogout, HiOutlinePencil, HiOutlineCheck, HiX, HiOutlineChevronRight, HiOutlineTruck, HiOutlineClock, HiOutlineCheckCircle, HiOutlineCog, HiOutlineTag } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { authAPI, orderAPI } from '../api';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';

const primary = '#061b0e';
const secondary = '#994529';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

const statusBadge = {
  'Order Received': { bg: '#fef3c7', color: '#92400e', icon: HiOutlineClock },
  Processing: { bg: '#dbeafe', color: '#1e40af', icon: HiOutlineClock },
  Shipped: { bg: '#ede9fe', color: '#6d28d9', icon: HiOutlineTruck },
  Delivered: { bg: '#dcfce7', color: '#166534', icon: HiOutlineCheckCircle },
  Cancelled: { bg: '#fee2e2', color: '#991b1b', icon: HiX },
};

export default function Profile() {
  const { user: authUser, logout, wishlist, toggleWishlist } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '', address: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authUser) { navigate('/login'); return; }
    authAPI.getMe().then(({ data }) => {
      setProfile(data.user);
      setEditForm({ name: data.user.name || '', phone: data.user.phone || '', address: data.user.address || '' });
    }).catch(() => {}).finally(() => setLoading(false));
  }, [authUser, navigate]);

  useEffect(() => {
    setOrdersLoading(true);
    orderAPI.getMine({ page, limit: 5 }).then(({ data }) => {
      setOrders(data.orders || []);
      setPage(data.page || 1);
      setPages(data.pages || 1);
    }).catch(() => {}).finally(() => setOrdersLoading(false));
  }, [page]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const { data } = await authAPI.updateProfile(editForm);
      setProfile(data.user);
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner size="lg" />;
  if (!profile) return null;

  const totalOrders = orders.length + (pages > 1 ? (pages - 1) * 5 : 0);
  const wishlistItems = Array.isArray(wishlist) ? wishlist.length : 0;
  const recentOrders = orders.slice(0, 3);

  return (
    <div style={{ backgroundColor: surfaceBright, minHeight: '100dvh' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl" style={{ color: primary, fontWeight: 500 }}>My Account</h1>
          <button onClick={handleLogout} className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all active:scale-95" style={{ backgroundColor: '#fee2e2', color: '#991b1b', letterSpacing: '0.03em' }}>
            <HiOutlineLogout className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="card p-6 mb-6" style={{ border: '1px solid #f0ede8' }}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden" style={{ backgroundColor: '#f0ede8', border: '3px solid' + primary }}>
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: primary }}>
                    <span className="text-2xl font-bold" style={{ color: surfaceBright, fontFamily: 'Playfair Display' }}>{profile.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-between gap-2">
                <h2 className="font-['Playfair_Display'] text-xl" style={{ color: primary, fontWeight: 500 }}>{profile.name}</h2>
                <button onClick={() => setEditing(!editing)} className="p-1.5 rounded-lg transition-all hover:scale-110 active:scale-95 hidden sm:block" style={{ color: onSurfaceVariant }}>
                  <HiOutlinePencil className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm" style={{ color: onSurfaceVariant }}>
                <div className="flex items-center gap-1.5"><HiOutlineMail className="w-4 h-4" style={{ color: secondary }} /><span>{profile.email}</span></div>
                {profile.phone && <div className="flex items-center gap-1.5"><HiOutlinePhone className="w-4 h-4" style={{ color: secondary }} /><span>{profile.phone}</span></div>}
              </div>
              {profile.address && (
                <div className="flex items-center gap-1.5 mt-1.5 text-sm" style={{ color: onSurfaceVariant }}>
                  <HiOutlineLocationMarker className="w-4 h-4" style={{ color: secondary }} />
                  <span>{profile.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Edit Profile Section */}
          {editing && (
            <div className="mt-5 pt-5" style={{ borderTop: '1px solid #f0ede8' }}>
              <h3 className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>Edit Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: onSurface }}>Name</label>
                  <input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: onSurface }}>Phone</label>
                  <input type="text" value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="input-field" placeholder="+91 98765 43210" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1" style={{ color: onSurface }}>Address</label>
                  <input type="text" value={editForm.address} onChange={e => setEditForm({ ...editForm, address: e.target.value })} className="input-field" placeholder="Your address" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={handleSaveProfile} disabled={saving} className="flex items-center space-x-1.5 px-5 py-2 rounded-xl text-xs font-semibold active:scale-95 transition-all" style={{ backgroundColor: primary, color: surfaceBright, letterSpacing: '0.03em' }}>
                  <HiOutlineCheck className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button onClick={() => setEditing(false)} className="flex items-center space-x-1.5 px-5 py-2 rounded-xl text-xs font-semibold active:scale-95 transition-all" style={{ backgroundColor: '#f0ede8', color: onSurface, letterSpacing: '0.03em' }}>
                  <HiX className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card p-4 text-center" style={{ border: '1px solid #f0ede8' }}>
            <p className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: primary }}>{totalOrders}</p>
            <p className="text-[10px] tracking-wider font-semibold mt-1" style={{ color: onSurfaceVariant, letterSpacing: '0.05em' }}>Orders</p>
          </div>
          <div className="card p-4 text-center" style={{ border: '1px solid #f0ede8' }}>
            <p className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: primary }}>{wishlistItems}</p>
            <p className="text-[10px] tracking-wider font-semibold mt-1" style={{ color: onSurfaceVariant, letterSpacing: '0.05em' }}>Wishlist</p>
          </div>
          <div className="card p-4 text-center" style={{ border: '1px solid #f0ede8' }}>
            <p className="font-['Playfair_Display'] text-2xl font-bold" style={{ color: primary }}>{recentOrders.filter(o => o.orderStatus === 'Delivered').length}</p>
            <p className="text-[10px] tracking-wider font-semibold mt-1" style={{ color: onSurfaceVariant, letterSpacing: '0.05em' }}>Delivered</p>
          </div>
        </div>

        {/* Saved Addresses */}
        {profile.savedAddresses?.length > 0 && (
          <div className="card p-5 mb-6" style={{ border: '1px solid #f0ede8' }}>
            <h3 className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>
              <HiOutlineLocationMarker className="w-4 h-4" style={{ color: secondary }} />
              Saved Addresses
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.savedAddresses.map((addr, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: '#f6f3ee' }}>
                  <span className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: secondary, letterSpacing: '0.05em' }}>{addr.label}</span>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: onSurfaceVariant }}>
                    {addr.address}, {addr.city} - {addr.postalCode}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div className="card p-5 mb-6" style={{ border: '1px solid #f0ede8' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold" style={{ color: primary, letterSpacing: '0.05em' }}>
              <HiOutlineClipboardList className="w-4 h-4" style={{ color: secondary }} />
              Recent Orders
            </h3>
            <Link to="/orders" className="flex items-center gap-0.5 text-[10px] font-semibold transition-colors" style={{ color: secondary, letterSpacing: '0.03em' }}>
              <span>View All</span>
              <HiOutlineChevronRight className="w-3 h-3" />
            </Link>
          </div>
          {ordersLoading ? (
            <Spinner />
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm mb-3" style={{ color: onSurfaceVariant }}>No orders yet</p>
              <Link to="/products" className="btn-primary">Start Shopping</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(order => {
                const sb = statusBadge[order.orderStatus] || statusBadge['Order Received'];
                const StatusIcon = sb.icon;
                return (
                  <Link key={order.id} to={`/orders/${order.id}`} className="block p-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]" style={{ backgroundColor: '#f6f3ee' }}>
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 flex">
                        {order.items?.slice(0, 2).map((item, i) => (
                          <img key={i} src={item.image} alt="" className={`w-12 h-12 object-cover rounded-lg ${i > 0 ? '-ml-3' : ''}`} />
                        ))}
                        {order.items?.length > 2 && (
                          <div className="w-12 h-12 -ml-3 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#e5e2dd' }}>
                            <span className="text-[10px] font-bold" style={{ color: onSurfaceVariant }}>+{order.items.length - 2}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: onSurface }}>Order #{String(order.id).slice(-8).toUpperCase()}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusIcon className="w-3 h-3" style={{ color: sb.color }} />
                          <span className="text-[10px] font-semibold" style={{ color: sb.color }}>{order.orderStatus}</span>
                        </div>
                        <p className="text-[10px] mt-0.5" style={{ color: onSurfaceVariant }}>{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm" style={{ color: primary }}>₹{order.totalPrice?.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <Pagination page={page} pages={pages} onPageChange={setPage} />
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="card p-5" style={{ border: '1px solid #f0ede8' }}>
          <h3 className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: primary, letterSpacing: '0.05em' }}>
            <HiOutlineCog className="w-4 h-4" style={{ color: secondary }} />
            Account Settings
          </h3>
          <div className="space-y-2">
            <Link to="/wishlist" className="flex items-center justify-between p-3 rounded-xl transition-all hover:translate-x-1" style={{ backgroundColor: '#f6f3ee' }}>
              <div className="flex items-center gap-3">
                <HiOutlineHeart className="w-5 h-5" style={{ color: secondary }} />
                <span className="text-sm font-semibold" style={{ color: onSurface }}>My Wishlist ({wishlistItems})</span>
              </div>
              <HiOutlineChevronRight className="w-4 h-4" style={{ color: onSurfaceVariant }} />
            </Link>
            <Link to="/orders" className="flex items-center justify-between p-3 rounded-xl transition-all hover:translate-x-1" style={{ backgroundColor: '#f6f3ee' }}>
              <div className="flex items-center gap-3">
                <HiOutlineClipboardList className="w-5 h-5" style={{ color: secondary }} />
                <span className="text-sm font-semibold" style={{ color: onSurface }}>Order History</span>
              </div>
              <HiOutlineChevronRight className="w-4 h-4" style={{ color: onSurfaceVariant }} />
            </Link>
            <div className="flex items-center justify-between p-3 rounded-xl transition-all" style={{ backgroundColor: '#f6f3ee' }}>
              <div className="flex items-center gap-3">
                <HiOutlineMail className="w-5 h-5" style={{ color: secondary }} />
                <div>
                  <span className="text-sm font-semibold" style={{ color: onSurface }}>Email</span>
                  <p className="text-[10px]" style={{ color: onSurfaceVariant }}>{profile.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl transition-all" style={{ backgroundColor: '#f6f3ee' }}>
              <div className="flex items-center gap-3">
                <HiOutlinePhone className="w-5 h-5" style={{ color: secondary }} />
                <div>
                  <span className="text-sm font-semibold" style={{ color: onSurface }}>Phone</span>
                  <p className="text-[10px]" style={{ color: onSurfaceVariant }}>{profile.phone || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}