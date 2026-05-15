import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToast();

  const fetchCart = useCallback(async () => {
    if (!user) { setCart({ items: [] }); return; }
    try {
      setLoading(true);
      const { data } = await cartAPI.get();
      setCart(data.cart);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      const { data } = await cartAPI.add({ productId, quantity });
      setCart(data.cart);
      addToast('Item added to cart!', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to add item', 'error');
    }
  }, [addToast]);

  const updateQuantity = useCallback(async (productId, quantity) => {
    try {
      const { data } = await cartAPI.update(productId, { quantity });
      setCart(data.cart);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to update', 'error');
    }
  }, [addToast]);

  const removeFromCart = useCallback(async (productId) => {
    try {
      const { data } = await cartAPI.remove(productId);
      setCart(data.cart);
      addToast('Item removed from cart', 'success');
    } catch (err) {
      addToast('Failed to remove item', 'error');
    }
  }, [addToast]);

  const clearCart = useCallback(async () => {
    try {
      const { data } = await cartAPI.clear();
      setCart(data.cart);
    } catch (err) { console.error(err); }
  }, []);

  const applyCoupon = useCallback(async (code) => {
    try {
      const { data } = await cartAPI.applyCoupon(code);
      setCart(data.cart);
      addToast('Coupon applied!', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Invalid coupon', 'error');
    }
  }, [addToast]);

  const removeCoupon = useCallback(async () => {
    try {
      const { data } = await cartAPI.removeCoupon();
      setCart(data.cart);
    } catch (err) { console.error(err); }
  }, []);

  const itemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const subtotal = cart?.items?.reduce((sum, item) => {
    const price = item.product?.discountPrice || 0;
    return sum + price * item.quantity;
  }, 0) || 0;

  const discountAmount = cart?.coupon?.discount ? (subtotal * cart.coupon.discount) / 100 : 0;
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18 * 100) / 100;
  const total = Math.max(0, Math.round((subtotal + shipping + tax - discountAmount) * 100) / 100);

  return (
    <CartContext.Provider value={{
      cart, loading, itemCount, subtotal, discountAmount, shipping, tax, total,
      addToCart, updateQuantity, removeFromCart, clearCart, applyCoupon, removeCoupon, fetchCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}
