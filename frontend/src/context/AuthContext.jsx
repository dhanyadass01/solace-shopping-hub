import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, userAPI } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const saveUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setWishlist([]);
    localStorage.removeItem('user');
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    saveUser({ ...data.user, token: data.token });
    return data;
  }, [saveUser]);

  const register = useCallback(async (name, email, password) => {
    const { data } = await authAPI.register({ name, email, password });
    saveUser({ ...data.user, token: data.token });
    return data;
  }, [saveUser]);

  const toggleWishlist = useCallback(async (productId) => {
    const { data } = await userAPI.toggleWishlist(productId);
    setWishlist(data.wishlist);
    return data.wishlist;
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (user?.token) {
        try {
          const { data } = await authAPI.getMe();
          setUser((prev) => ({ ...prev, ...data.user }));
          setWishlist(data.user.wishlist || []);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, wishlist, toggleWishlist }}>
      {children}
    </AuthContext.Provider>
  );
}
