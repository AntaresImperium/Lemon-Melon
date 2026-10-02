import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, Plus, Check } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface SearchFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchFilterModal: React.FC<SearchFilterModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const tags = ['all', 'Vegan', 'Gluten-Free', 'Dairy-Free', '100% Real Fruit'];

  const filtered = PRODUCTS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === 'all' ||
      item.dietary.some((d) => d.toLowerCase().includes(selectedTag.toLowerCase()));

    return matchesSearch && matchesTag;
  });

  const handleAdd = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#F0E6CA] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F0E6CA] bg-[#FFFDF7] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8B6A00] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search drinks, sorbets, mochi, gummies, ingredients..."
            className="w-full text-sm bg-transparent text-[#1E2022] placeholder-[#9E947D] focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 text-[#7A705A] hover:text-[#1E2022] rounded-full hover:bg-[#FFF4C2] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dietary Filter Segmented Bar */}
        <div className="px-4 py-2 bg-[#FFF9E6] border-b border-[#F4EAC8] flex items-center gap-1.5 overflow-x-auto">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTag === t
                  ? 'bg-[#1E2022] text-white'
                  : 'bg-white/80 text-[#5C5542] hover:bg-white'
              }`}
            >
              {t === 'all' ? 'All Dietary' : t}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#7A705A]">
              No treats match "{searchTerm}". Try searching "lemon", "cooler", or "sorbet"!
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-2xl border border-[#F4EAC8] hover:bg-[#FFFDF7] hover:border-[#FED729] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover border border-[#E8DEC0]"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#A37B00]">
                      {product.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1E2022] group-hover:text-[#FF3F5E] transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#7A705A] line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 ml-2">
                  <span className="font-mono tabular-nums text-sm font-bold text-[#1E2022]">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => handleAdd(e, product)}
                    aria-label={`Add ${product.name}`}
                    className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      addedIds[product.id]
                        ? 'bg-[#3BB35E] text-white'
                        : 'bg-[#FED729] hover:bg-[#FFE600] text-[#1E2022]'
                    }`}
                  >
                    {addedIds[product.id] ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
