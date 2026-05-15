import { HiX } from 'react-icons/hi';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <div className="rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" style={{ backgroundColor: '#fcf9f4' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid #f0ede8' }}>
          <h2 className="text-xs tracking-widest uppercase font-semibold" style={{ color: '#061b0e', letterSpacing: '0.05em' }}>{title}</h2>
          <button onClick={onClose} className="p-1 rounded-lg transition" style={{ color: '#434843' }}><HiX className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
