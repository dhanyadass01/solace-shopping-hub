import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../api';
import ProductCard from '../components/product/ProductCard';
import ProductFilter from '../components/product/ProductFilter';
import Pagination from '../components/ui/Pagination';
import Spinner from '../components/ui/Spinner';

const primary = '#061b0e';
const secondary = '#994529';
const surfaceBright = '#fcf9f4';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || '',
    price_gte: searchParams.get('price_gte') || '',
    price_lte: searchParams.get('price_lte') || '',
  });

  useEffect(() => {
    const params = { page, limit: 12 };
    Object.entries(filters).forEach(([k, v]) => { if (v) params[k] = v; });
    setLoading(true);
    productAPI.getAll(params).then(({ data }) => {
      setProducts(data.products);
      setPage(data.page);
      setPages(data.pages);
      setTotal(data.total);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page, filters]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
    params.set('page', page);
    setSearchParams(params, { replace: true });
  }, [page, filters, setSearchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div style={{ backgroundColor: surfaceBright, color: onSurface, fontFamily: 'Inter, sans-serif', minHeight: '100dvh' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl" style={{ color: primary, fontWeight: 500 }}>All Products</h1>
          <p className="text-sm mt-1" style={{ color: onSurfaceVariant }}>{total} products found</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
          </aside>
          <div className="flex-1">
            {loading ? <Spinner /> : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg" style={{ color: onSurfaceVariant }}>No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
                <Pagination page={page} pages={pages} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
