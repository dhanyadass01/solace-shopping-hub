import { useState, useEffect } from 'react';
import { HiSearch, HiFilter } from 'react-icons/hi';
import { productAPI } from '../../api';

const primary = '#061b0e';
const onSurface = '#1c1c19';
const onSurfaceVariant = '#434843';

export default function ProductFilter({ filters, onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    productAPI.getCategories().then(({ data }) => setCategories(data.categories)).catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#737973' }} />
        <input type="text" placeholder="Search products..." value={filters.keyword || ''} onChange={e => onFilterChange({ ...filters, keyword: e.target.value, page: 1 })}
          className="input-field pl-10" style={{ backgroundColor: '#ffffff' }} />
      </div>
      <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 text-xs font-semibold tracking-wider md:hidden" style={{ color: onSurfaceVariant }}>
        <HiFilter className="w-4 h-4" /><span>Filters</span>
      </button>
      <div className={`space-y-4 ${showFilters ? 'block animate-slide-down' : 'hidden'} md:block`}>
        <div>
          <h3 className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: onSurface, letterSpacing: '0.05em' }}>Category</h3>
          <div className="space-y-1">
            <button onClick={() => onFilterChange({ ...filters, category: '', page: 1 })} className="block w-full text-left px-3 py-1.5 rounded-lg text-xs transition" style={{ color: !filters.category ? '#fcf9f4' : onSurfaceVariant, backgroundColor: !filters.category ? primary : 'transparent', fontWeight: !filters.category ? 600 : 400 }}>
              All
            </button>
            {categories.map(cat => (
              <button key={cat} onClick={() => onFilterChange({ ...filters, category: cat, page: 1 })} className="block w-full text-left px-3 py-1.5 rounded-lg text-xs transition" style={{ color: filters.category === cat ? '#fcf9f4' : onSurfaceVariant, backgroundColor: filters.category === cat ? primary : 'transparent' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: onSurface, letterSpacing: '0.05em' }}>Sort By</h3>
          <select value={filters.sort || ''} onChange={e => onFilterChange({ ...filters, sort: e.target.value, page: 1 })} className="input-field text-xs" style={{ backgroundColor: '#ffffff', color: onSurface }}>
            <option value="">Newest</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="ratings">Top Rated</option>
          </select>
        </div>
        <div>
          <h3 className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: onSurface, letterSpacing: '0.05em' }}>Price Range</h3>
          <div className="flex items-center space-x-2">
            <input type="number" placeholder="Min" value={filters.price_gte || ''} onChange={e => onFilterChange({ ...filters, price_gte: e.target.value || undefined, page: 1 })} className="input-field text-xs w-24" style={{ backgroundColor: '#ffffff', color: onSurface }} />
            <span style={{ color: '#737973' }}>-</span>
            <input type="number" placeholder="Max" value={filters.price_lte || ''} onChange={e => onFilterChange({ ...filters, price_lte: e.target.value || undefined, page: 1 })} className="input-field text-xs w-24" style={{ backgroundColor: '#ffffff', color: onSurface }} />
          </div>
        </div>
      </div>
    </div>
  );
}
