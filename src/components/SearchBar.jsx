import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = 'गाना या कलाकार खोजें...' }) {
  return (
    <div className="relative">
      <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input w-full pl-11 pr-10 py-3 rounded-xl text-sm font-mukta"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
