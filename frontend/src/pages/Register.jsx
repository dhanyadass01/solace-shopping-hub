import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return addToast('Passwords do not match', 'error');
    try {
      setLoading(true);
      await register(form.name, form.email, form.password);
      addToast('Account created successfully!', 'success');
      navigate('/');
    } catch (err) {
      addToast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl" style={{ color: '#061b0e', fontWeight: 500 }}>Create Account</h1>
          <p className="text-sm mt-2" style={{ color: '#434843' }}>Join SÖLACE today</p>
        </div>
        <form onSubmit={handleSubmit} className="card p-8 space-y-5" style={{ border: '1px solid #f0ede8' }}>
          <div>
            <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: '#1c1c19' }}>Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="John Doe" required />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: '#1c1c19' }}>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-field" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: '#1c1c19' }}>Password</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input-field" placeholder="••••••••" required minLength={6} />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: '#1c1c19' }}>Confirm Password</label>
            <input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} className="input-field" placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Creating account...' : 'Create Account'}</button>
          <p className="text-center text-xs" style={{ color: '#434843' }}>
            Already have an account? <Link to="/login" className="font-semibold" style={{ color: '#061b0e' }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
