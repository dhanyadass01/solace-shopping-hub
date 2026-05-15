import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const primary = '#061b0e';

export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center space-x-2 my-8 animate-fade-in">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" style={{ border: '1px solid #c3c8c1' }}>
        <HiChevronLeft className="w-5 h-5" style={{ color: primary }} />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className="w-10 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
          style={p === page ? { backgroundColor: primary, color: '#fcf9f4' } : { border: '1px solid #c3c8c1', color: primary }}
        >
          {p}
        </button>
      ))}
      <button disabled={page === pages} onClick={() => onPageChange(page + 1)} className="p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" style={{ border: '1px solid #c3c8c1' }}>
        <HiChevronRight className="w-5 h-5" style={{ color: primary }} />
      </button>
    </div>
  );
}
