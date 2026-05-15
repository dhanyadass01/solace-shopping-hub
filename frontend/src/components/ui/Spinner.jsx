export default function Spinner({ size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-14 h-14' };
  const borderSizes = { sm: 'border-2', md: 'border-[3px]', lg: 'border-4' };
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className={`${sizes[size]} ${borderSizes[size]} rounded-full`} style={{ borderColor: '#e5e2dd' }} />
        <div className={`absolute inset-0 ${sizes[size]} ${borderSizes[size]} rounded-full animate-spin`} style={{ border: '3px solid transparent', borderTopColor: '#061b0e', borderRightColor: '#994529' }} />
      </div>
    </div>
  );
}
