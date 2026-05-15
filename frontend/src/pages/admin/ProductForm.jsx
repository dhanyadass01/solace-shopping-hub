import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { HiArrowLeft, HiOutlinePhotograph } from 'react-icons/hi';
import { productAPI } from '../../api';
import { useToast } from '../../context/ToastContext';
import Spinner from '../../components/ui/Spinner';

const primary = '#061b0e';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function AdminProductForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const returnPage = searchParams.get('page') || '1';
  const { addToast } = useToast();
  const isEdit = !!id;
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', stock: '', image: '', featured: false,
  });

  useEffect(() => {
    if (isEdit) {
      productAPI.getById(id).then(({ data }) => {
        const p = data.product;
        setForm({ name: p.name, description: p.description, price: p.price, category: p.category, stock: p.stock, image: p.image, featured: p.featured });
      }).catch(() => addToast('Product not found', 'error')).finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (isEdit) {
        await productAPI.update(id, payload);
        addToast('Product updated!', 'success');
      } else {
        await productAPI.create(payload);
        addToast('Product created!', 'success');
      }
      navigate(`/admin/products?page=${returnPage}`);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save product', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner />;

  const categories = ['Electronics', 'Fashion', 'Cosmetics', 'Gadgets', 'Accessories', 'Fitness Products', 'Food & Drinks', 'Home Essentials', 'Stationery'];

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => navigate(`/admin/products?page=${returnPage}`)} className="flex items-center space-x-1 text-xs font-semibold mb-6 transition-colors" style={{ color: primary, letterSpacing: '0.03em' }}>
        <HiArrowLeft className="w-4 h-4" /><span>Back to Products</span>
      </button>
      <h1 className="font-['Playfair_Display'] text-2xl mb-6" style={{ color: primary, fontWeight: 500 }}>{isEdit ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit} className="card p-6 space-y-5" style={{ border: '1px solid #f0ede8' }}>
        <div>
          <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Name</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" required />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Description</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="input-field" rows={4} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Price (₹)</label>
            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="input-field" min="0" required />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Stock</label>
            <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="input-field" min="0" required />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Category</label>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input-field" required>
            <option value="">Select category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: onSurface }}>Image URL</label>
          <div className="flex items-center space-x-3">
            <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="input-field flex-1" placeholder="https://..." />
            <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#f0ede8' }}>
              {form.image ? <img src={form.image} alt="" className="w-full h-full object-cover rounded-lg" /> : <HiOutlinePhotograph className="w-5 h-5" style={{ color: '#737973' }} />}
            </div>
          </div>
        </div>
        <label className="flex items-center space-x-3">
          <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded" style={{ accentColor: primary }} />
          <span className="text-xs font-semibold tracking-wider" style={{ color: onSurface }}>Featured product</span>
        </label>
        <button type="submit" disabled={saving} className="btn-primary w-full py-3" style={{ backgroundColor: primary }}>{saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}</button>
      </form>
    </div>
  );
}
