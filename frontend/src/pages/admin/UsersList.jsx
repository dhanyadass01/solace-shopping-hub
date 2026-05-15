import { useState, useEffect } from 'react';
import { userAPI } from '../../api';
import Pagination from '../../components/ui/Pagination';
import Spinner from '../../components/ui/Spinner';

const primary = '#061b0e';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function AdminUsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    userAPI.getAll({ page }).then(({ data }) => {
      setUsers(data.users);
      setPage(data.page);
      setPages(data.pages);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h1 className="font-['Playfair_Display'] text-2xl mb-6" style={{ color: primary, fontWeight: 500 }}>Users</h1>
      {loading ? <Spinner /> : (
        <div className="card overflow-hidden" style={{ border: '1px solid #f0ede8' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#f6f3ee' }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#f0ede8' }}>
                {users.map(user => (
                  <tr key={user.id} className="hover:opacity-80 transition" style={{ backgroundColor: '#ffffff' }}>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: onSurface }}>{user.name}</td>
                    <td className="px-4 py-3 text-sm" style={{ color: onSurfaceVariant }}>{user.email}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: user.role === 'admin' ? '#ede9fe' : '#f0ede8', color: user.role === 'admin' ? '#6d28d9' : onSurfaceVariant, letterSpacing: '0.05em' }}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: onSurfaceVariant }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
