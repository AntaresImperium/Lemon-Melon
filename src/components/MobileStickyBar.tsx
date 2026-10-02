import React from 'react';
import { ShoppingBag, UtensilsCrossed, Package, Sparkles } from 'lucide-react';

interface MobileStickyBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenBoxBuilder: () => void;
  onScrollToMenu: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  cartCount,
  onOpenCart,
  onOpenBoxBuilder,
  onScrollToMenu,
}) => {
  return (
    <div className="lg:hidden fixed bottom-3 inset-x-3 z-30 max-w-md mx-auto">
      <div className="bg-[#1E2022]/95 backdrop-blur-md text-white rounded-2xl px-4 py-2.5 shadow-xl border border-white/10 flex items-center justify-between">
        
        {/* Menu button */}
        <button
          onClick={onScrollToMenu}
          className="flex flex-col items-center gap-0.5 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <UtensilsCrossed className="w-4 h-4 text-[#FED729]" />
          <span className="text-[10px] font-bold">Menu</span>
        </button>

        {/* Custom Crate CTA in center */}
        <button
          onClick={onOpenBoxBuilder}
          className="px-3.5 py-1.5 bg-[#FF3F5E] hover:bg-[#E62A48] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <Package className="w-3.5 h-3.5" />
          <span>4-Pack Crate ($24)</span>
        </button>

        {/* Cart Drawer Trigger */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-0.5 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#FED729]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#FF3F5E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Bag</span>
        </button>

      </div>
    </div>
  );
};
