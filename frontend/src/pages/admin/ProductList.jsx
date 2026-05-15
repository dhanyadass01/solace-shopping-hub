import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiPlus } from 'react-icons/hi';
import { productAPI } from '../../api';
import { useToast } from '../../context/ToastContext';
import Pagination from '../../components/ui/Pagination';
import Spinner from '../../components/ui/Spinner';
import Modal from '../../components/ui/Modal';

const primary = '#061b0e';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function AdminProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [pages, setPages] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    productAPI.getAll({ page, limit: 20 }).then(({ data }) => {
      if (cancelled) return;
      setProducts(data.products);
      setPages(data.pages);
    }).catch(() => {}).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [page]);

  const goToPage = (p) => {
    setPage(p);
    setSearchParams({ page: p });
  };

  const handleDelete = async () => {
    try {
      await productAPI.delete(deleteTarget.id);
      addToast('Product deleted', 'success');
      setDeleteTarget(null);
      setLoading(true);
      productAPI.getAll({ page, limit: 20 }).then(({ data }) => {
        setProducts(data.products);
        setPages(data.pages);
      }).catch(() => {}).finally(() => setLoading(false));
    } catch (err) {
      addToast(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Playfair_Display'] text-2xl" style={{ color: primary, fontWeight: 500 }}>Products</h1>
        <Link to="/admin/products/new" className="btn-primary flex items-center space-x-2">
          <HiPlus className="w-5 h-5" /><span>Add Product</span>
        </Link>
      </div>
      {loading ? <Spinner /> : (
        <div className="card overflow-hidden" style={{ border: '1px solid #f0ede8' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: '#f6f3ee' }}>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Product</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Category</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold tracking-wider" style={{ color: onSurfaceVariant }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#f0ede8' }}>
                {products.map(product => (
                  <tr key={product.id} className="hover:opacity-80 transition" style={{ backgroundColor: '#ffffff' }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="text-sm font-semibold line-clamp-1" style={{ color: onSurface }}>{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium" style={{ color: onSurface }}>₹{product.price?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: product.stock > 10 ? '#dcfce7' : '#fee2e2', color: product.stock > 10 ? '#166534' : '#991b1b', letterSpacing: '0.05em' }}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: onSurfaceVariant }}>{product.category}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/admin/products/${product.id}?page=${page}`} className="p-2 rounded-lg transition" style={{ color: '#1e40af' }}>
                          <HiOutlinePencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => setDeleteTarget(product)} className="p-2 rounded-lg transition" style={{ color: '#991b1b' }}>
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} pages={pages} onPageChange={goToPage} />
        </div>
      )}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Product">
        <p className="text-sm mb-6" style={{ color: onSurfaceVariant }}>Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button onClick={() => setDeleteTarget(null)} className="btn-secondary">Cancel</button>
          <button onClick={handleDelete} className="btn-danger">Delete</button>
        </div>
      </Modal>
    </div>
  );
}
