import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProductDetail = /^\/products\/\d+/.test(location.pathname);
  const isCart = location.pathname === '/cart';
  const isInfo = ['/about', '/customer-care', '/contact'].includes(location.pathname);
  const isStandalone = isHome || isProductDetail || isCart || isInfo;

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
