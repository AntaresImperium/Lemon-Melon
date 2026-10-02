import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check, Sparkles, AlertCircle } from 'lucide-react';
import { Product, logoImg } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#F0E6CA] my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white text-[#5C5542] hover:text-[#1E2022] rounded-full shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left Column: Product Image */}
          <div className="relative bg-[#FFFDF7] h-64 sm:h-auto min-h-[300px]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Mascot Stamp */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-md border border-[#F4EAC8] flex items-center gap-3">
              <img
                src={logoImg}
                alt="Brand mascot endorsement"
                className="w-10 h-10 rounded-full object-cover border border-[#FED729]"
                referrerPolicy="no-referrer"
              />
              <p className="text-xs text-[#554A25] italic leading-tight">
                {product.mascotEndorsement.quote}
              </p>
            </div>
          </div>

          {/* Right Column: Details & Contiguous Purchase Module */}
          <div className="p-6 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Tags */}
              <div className="flex items-center gap-2 text-xs text-[#7A705A] mb-1">
                <span className="uppercase font-bold tracking-wider text-[#A37B00]">
                  {product.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{product.calories}</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-[#1E2022]">
                {product.name}
              </h2>
              <p className="text-xs font-medium text-[#FF3F5E] mb-3">
                {product.tagline}
              </p>

              {/* Flavor Profile Bars */}
              <div className="bg-[#FFFDF5] rounded-xl p-3 border border-[#F4EAC8] mb-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#C28C00]">🍋 Sour Tang Level:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`w-3 h-3 rounded-full ${
                          s <= product.sourLevel ? 'bg-[#FED729]' : 'bg-[#E6E1D1]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#FF3F5E]">🍉 Sweet Refreshment:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`w-3 h-3 rounded-full ${
                          s <= product.sweetLevel ? 'bg-[#FF3F5E]' : 'bg-[#E6E1D1]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Long Description */}
              <p className="text-xs text-[#554E3C] leading-relaxed mb-4">
                {product.longDesc}
              </p>

              {/* Dietary Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-[#554A25] bg-[#FFF4C2] px-2.5 py-1 rounded-md"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>

              {/* Real Ingredients */}
              <div className="border-t border-[#F0E6CA] pt-3 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A705A] block mb-1">
                  Orchard Ingredients:
                </span>
                <p className="text-xs text-[#635B48] leading-normal">
                  {product.ingredients.join(', ')}
                </p>
              </div>
            </div>

            {/* Sticky Purchase Control */}
            <div className="pt-4 border-t border-[#F0E6CA] mt-auto">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-xs text-[#7A705A]">Total Price:</span>
                  <div className="font-mono tabular-nums text-2xl font-bold text-[#1E2022]">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#F0E6CA] bg-[#FFFDF7] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 text-[#5C5542] hover:bg-[#FFF4C2] disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 text-sm font-bold font-mono tabular-nums min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#5C5542] hover:bg-[#FFF4C2] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 ${
                  isAdded
                    ? 'bg-[#3BB35E] text-white'
                    : 'bg-[#FF3F5E] hover:bg-[#E62A48] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {quantity} to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
