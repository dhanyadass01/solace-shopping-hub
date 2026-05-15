import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiMinus, HiPlus } from 'react-icons/hi';

export default function CartItem({ item, onUpdate, onRemove }) {
  const prod = item.product || item;
  const { quantity } = item;
  if (!prod) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl">
      <Link to={`/products/${prod.id}`} className="w-20 h-20 flex-shrink-0">
        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover rounded-lg" />
      </Link>
      <div className="flex-1 min-w-0">
        <Link to={`/products/${prod.id}`} className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition line-clamp-1">{prod.name}</Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">₹{prod.discountPrice?.toLocaleString()} each</p>
        <div className="flex items-center space-x-3 mt-2">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
            <button onClick={() => quantity > 1 && onUpdate(prod.id, quantity - 1)} disabled={quantity <= 1} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-50"><HiMinus className="w-4 h-4" /></button>
            <span className="px-3 font-medium text-sm">{quantity}</span>
            <button onClick={() => onUpdate(prod.id, quantity + 1)} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition"><HiPlus className="w-4 h-4" /></button>
          </div>
          <button onClick={() => onRemove(prod.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-primary-600">₹{(prod.discountPrice * quantity)?.toLocaleString()}</p>
      </div>
    </div>
  );
}
