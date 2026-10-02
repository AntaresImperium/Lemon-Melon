import React, { useState } from 'react';
import { Plus, Check, Eye } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <article
      onClick={() => onViewDetails(product)}
      className="group bg-white rounded-2xl border border-[#F0E6CA] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      {/* Product Image Stage (65-75% visual dominance) */}
      <div className="relative aspect-[4/3] bg-[#FFFDF7] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#FFF8DE] text-[#8B6A00] p-4 text-center">
            <span className="text-3xl mb-1">🍋🍉</span>
            <span className="text-xs font-semibold">{product.name}</span>
          </div>
        )}

        {/* Quiet Single Status Flag (Anti-slop: max 1 quiet tag) */}
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-[#1E2022] bg-[#FED729]/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
            Signature Favorite
          </span>
        )}
        {product.isNew && !product.isBestSeller && (
          <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wider text-white bg-[#FF3F5E]/95 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs">
            Fresh Drop
          </span>
        )}

        {/* Quick View Floating Affordance on hover */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-[#1E2022] text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Quick Look
          </span>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Unboxed Metadata (Zero-pill discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-[#7A705A] mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-[#A37B00]">
              {product.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.dietary[0]}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-lg text-[#1E2022] group-hover:text-[#FF3F5E] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#5C5542] line-clamp-2 mt-1 mb-3 leading-relaxed">
            {product.shortDesc}
          </p>

          {/* Sweet vs Sour Meter Rating */}
          <div className="flex items-center justify-between py-2 border-t border-dashed border-[#F4EAC8] text-[11px] text-[#706650]">
            <div className="flex items-center gap-1">
              <span className="font-medium text-[#C28C00]">Sour:</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`w-2 h-2 rounded-full ${
                      lvl <= product.sourLevel ? 'bg-[#FED729]' : 'bg-[#E6E1D1]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-medium text-[#FF3F5E]">Sweet:</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`w-2 h-2 rounded-full ${
                      lvl <= product.sweetLevel ? 'bg-[#FF3F5E]' : 'bg-[#E6E1D1]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Price & Add Button */}
        <div className="pt-3 border-t border-[#F0E6CA] flex items-center justify-between mt-2">
          <div>
            <span className="font-mono tabular-nums text-lg font-bold text-[#1E2022]">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-[10px] text-[#8A816B] block">
              {product.servingSize}
            </span>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 ${
              isAdded
                ? 'bg-[#3BB35E] text-white shadow-xs'
                : 'bg-[#FFF4C2] hover:bg-[#FED729] text-[#1E2022]'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
