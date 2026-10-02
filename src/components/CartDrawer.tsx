import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { CartItem } from '../types/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onOpenCheckout: (discountAmount: number, promoCode: string) => void;
  onOpenBoxBuilder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onOpenBoxBuilder,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 35.0;
  const progressToFree = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountNeededForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const discountAmount = appliedPromo ? (subtotal * appliedPromo.percent) / 100 : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.99;
  const total = subtotal - discountAmount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const clean = promoInput.trim().toUpperCase();
    if (clean === 'SWEETSOUR10') {
      setAppliedPromo({ code: clean, percent: 10 });
    } else if (clean === 'LEMMY15' || clean === 'MELLY15') {
      setAppliedPromo({ code: clean, percent: 15 });
    } else {
      setPromoError('Invalid promo code. Try SWEETSOUR10');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0E6CA] flex items-center justify-between bg-[#FFFDF7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF3F5E]" />
            <h2 className="font-display font-bold text-lg text-[#1E2022]">
              Your Sweet & Sour Bag
            </h2>
            <span className="text-xs font-mono font-bold text-[#8B6A00] bg-[#FFF4C2] px-2 py-0.5 rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-1.5 text-[#7A705A] hover:text-[#1E2022] hover:bg-[#FFF4C2] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Cold Shipping Progress Bar */}
        <div className="bg-[#FFF9E6] px-4 py-2.5 border-b border-[#F4EAC8] text-xs">
          {subtotal >= FREE_SHIPPING_THRESHOLD ? (
            <p className="font-bold text-[#2E8B57] flex items-center gap-1.5">
              <span>🎉 You unlocked FREE Insulated Cold-Pack Delivery!</span>
            </p>
          ) : (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[#706650]">
                <span>Add <strong className="text-[#1E2022]">${amountNeededForFree.toFixed(2)}</strong> more for free cold shipping!</span>
                <span className="font-mono">{Math.round(progressToFree)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E8DEC0] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF3F5E] transition-all duration-300"
                  style={{ width: `${progressToFree}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <span className="text-5xl block mb-3">🍋🍉</span>
              <h3 className="font-display font-bold text-lg text-[#1E2022]">
                Your treat bag is empty!
              </h3>
              <p className="text-xs text-[#7A705A] mt-1 mb-5">
                Lemmy & Melly are waiting with fresh sparkling coolers and chilled mochi.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBoxBuilder();
                }}
                className="px-5 py-2.5 bg-[#FED729] hover:bg-[#FFE600] text-[#1E2022] text-xs font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Build A 4-Pack Crate ($24)
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-2xl border border-[#F0E6CA] bg-[#FFFDF7]"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover border border-[#E8DEC0] shrink-0"
                />

                <div className="flex flex-col justify-between flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-[#1E2022] line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.customNote && (
                        <p className="text-[10px] text-[#FF3F5E] italic">
                          Note: "{item.customNote}"
                        </p>
                      )}
                      {item.bundleItems && (
                        <p className="text-[10px] text-[#7A705A]">
                          Includes 4 assorted flavors
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                      className="text-[#998F78] hover:text-[#FF3F5E] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-dashed border-[#F4EAC8]">
                    <span className="font-mono tabular-nums text-xs font-bold text-[#1E2022]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center border border-[#E8DEC0] bg-white rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#5C5542] hover:bg-[#FFF4C2] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#5C5542] hover:bg-[#FFF4C2] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout Module */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#F0E6CA] bg-[#FFFDF7] space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-grow">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#9E947D]" />
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Coupon (e.g. SWEETSOUR10)"
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-[#E8DEC0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FED729]"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-[#FFF4C2] hover:bg-[#FED729] text-[#1E2022] font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="flex items-center justify-between text-xs text-[#2E8B57] bg-[#EBF8EE] px-2.5 py-1 rounded-lg">
                <span className="flex items-center gap-1 font-semibold">
                  <Check className="w-3 h-3" /> {appliedPromo.code} applied ({appliedPromo.percent}% OFF)
                </span>
                <button
                  onClick={() => setAppliedPromo(null)}
                  className="text-[10px] underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {promoError && (
              <p className="text-[11px] text-[#FF3F5E]">{promoError}</p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5C5542] pt-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-[#2E8B57] font-semibold">
                  <span>Promo Discount:</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insulated Cold Shipping:</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? <strong className="text-[#2E8B57]">FREE</strong> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1E2022] pt-2 border-t border-[#F0E6CA]">
                <span>Estimated Total:</span>
                <span className="font-mono tabular-nums text-base text-[#1E2022]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenCheckout(discountAmount, appliedPromo ? appliedPromo.code : '')}
              className="w-full py-3.5 bg-[#FF3F5E] hover:bg-[#E62A48] text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to Fresh Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
