import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(email, password);
      addToast('Welcome back!', 'success');
      navigate('/profile');
    } catch (err) {
      addToast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl" style={{ color: '#061b0e', fontWeight: 500 }}>Welcome Back</h1>
          <p className="text-sm mt-2" style={{ color: '#434843' }}>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="card p-8 space-y-5" style={{ border: '1px solid #f0ede8' }}>
          <div>
            <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: '#1c1c19' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 tracking-wider" style={{ color: '#1c1c19' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" placeholder="••••••••" required minLength={6} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">{loading ? 'Signing in...' : 'Sign In'}</button>
          <p className="text-center text-xs" style={{ color: '#434843' }}>
            Don't have an account? <Link to="/register" className="font-semibold" style={{ color: '#061b0e' }}>Sign up</Link>
          </p>
          <div className="pt-4 text-xs text-center space-y-1" style={{ borderTop: '1px solid #f0ede8', color: '#737973' }}>
            <p>Demo: admin@example.com / admin123</p>
            <p>User: john@example.com / user123</p>
          </div>
        </form>
      </div>
    </div>
  );
}
