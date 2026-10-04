import React, { useState } from 'react';
import { Plus, Trash2, Check, Sparkles, Gift, Package, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { Product, PRODUCTS, logoImg } from '../data/products';

interface TastingBoxBuilderProps {
  onAddBoxToCart: (items: Product[], boxStyle: string, giftNote: string) => void;
  onClose?: () => void;
}

const BOX_STYLES = [
  {
    id: 'yellow-comic',
    name: 'Retro Comic Yellow Box',
    desc: 'Features Lemmy & Melly cartoon strip on vibrant canary box',
    color: '#FED729',
  },
  {
    id: 'watermelon-cooler',
    name: 'Insulated Picnic Cooler Bag',
    desc: 'Reusable thermal foil bag in watermelon red & leaf green',
    color: '#FF3F5E',
  },
  {
    id: 'matte-tin',
    name: 'Artisan Keepsake Metal Tin',
    desc: 'Embossed collector tin with gold foil sweet & sour seal',
    color: '#3BB35E',
  },
];

export const TastingBoxBuilder: React.FC<TastingBoxBuilderProps> = ({
  onAddBoxToCart,
  onClose,
}) => {
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [selectedStyle, setSelectedStyle] = useState('yellow-comic');
  const [giftNote, setGiftNote] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const MAX_ITEMS = 4;
  const BUNDLE_PRICE = 24.00;

  // Items eligible for the box (exclude bundles to avoid recursion)
  const individualProducts = PRODUCTS.filter((p) => p.category !== 'bundles');

  const handleAddItem = (product: Product) => {
    if (selectedItems.length < MAX_ITEMS) {
      setSelectedItems([...selectedItems, product]);
    }
  };

  const handleRemoveSlot = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleQuickFill = () => {
    if (individualProducts.length === 0) return;
    const fill = individualProducts.slice(0, 4);
    setSelectedItems(fill);
  };

  const handleCompleteBox = () => {
    if (selectedItems.length !== MAX_ITEMS) return;
    onAddBoxToCart(selectedItems, selectedStyle, giftNote);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      if (onClose) onClose();
    }, 1200);
  };

  const standardValue = selectedItems.reduce((acc, item) => acc + item.price, 0);
  const savings = Math.max(0, standardValue - BUNDLE_PRICE);

  return (
    <section id="box-builder" className="py-14 sm:py-20 bg-[#FFFDF7] border-y border-[#F0E6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF4C2] text-[#8B6A00] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Custom Crate</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E2022]">
            Build Your Own Tasting Crate
          </h2>
          <p className="text-sm sm:text-base text-[#5C5542] mt-2">
            Pick any 4 artisan treats to build your personalized sweet & sour snack box. 
            Flat <span className="font-bold text-[#FF3F5E] font-mono">$24.00</span> with complimentary chilled packaging & stickers.
          </p>
        </div>

        {individualProducts.length === 0 ? (
          <div className="bg-[#FFFDF0] rounded-3xl p-8 sm:p-12 border-2 border-dashed border-[#FED729] shadow-xs text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <img
                src={logoImg}
                alt="Lemon & Melon Mascot"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#FED729] shadow-sm"
              />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#1E2022] mb-2">
              The 4-Pack Crate is Launching With Our First Menu Drop!
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5542] leading-relaxed max-w-xl mx-auto mb-6">
              Edward and our team are currently crafting the official recipes. As soon as the first treats are added to our kitchen menu, you will be able to assemble your custom 4-pack right here in our interactive crate builder!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-left mb-6">
              {BOX_STYLES.map((style) => (
                <div key={style.id} className="p-3 bg-white rounded-xl border border-[#E8DEC0]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: style.color }} />
                    <span className="text-xs font-bold text-[#1E2022]">{style.name}</span>
                  </div>
                  <p className="text-[10px] text-[#7A705A]">{style.desc}</p>
                </div>
              ))}
            </div>
            <a
              href="#story"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF3F5E] hover:bg-[#E62A48] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <span>Suggest Foods You Want In The Crate</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: The 4 Slots Showcase */}
            <div className="lg:col-span-7 bg-[#FFFDF0] rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#FED729] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display font-bold text-lg text-[#1E2022]">
                  Your Crate Slots ({selectedItems.length} of {MAX_ITEMS})
                </span>
                {individualProducts.length >= 4 && (
                  <button
                    onClick={handleQuickFill}
                    className="text-xs font-bold text-[#FF3F5E] hover:underline cursor-pointer"
                  >
                    ⚡ Quick Fill Lemmy & Melly Favorites
                  </button>
                )}
              </div>

              {/* 4 Visual Slots */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {[0, 1, 2, 3].map((slotIdx) => {
                  const item = selectedItems[slotIdx];
                  return (
                    <div
                      key={slotIdx}
                      className={`relative rounded-2xl p-2.5 flex flex-col items-center justify-between text-center min-h-[160px] transition-all ${
                        item
                          ? 'bg-white border border-[#E8DEC0] shadow-xs'
                          : 'border-2 border-dashed border-[#E2D8B6] bg-white/40'
                      }`}
                    >
                      {item ? (
                        <>
                          <button
                            onClick={() => handleRemoveSlot(slotIdx)}
                            aria-label={`Remove ${item.name}`}
                            className="absolute -top-1.5 -right-1.5 bg-[#FF3F5E] text-white p-1 rounded-full shadow-xs hover:bg-[#E62A48] cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <img
                            src={item.image}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-xl object-cover mb-2 border border-[#F4EAC8]"
                          />
                          <div className="w-full">
                            <p className="text-[11px] font-bold text-[#1E2022] line-clamp-2 leading-tight">
                              {item.name}
                            </p>
                            <span className="text-[10px] text-[#8B6A00] font-mono tabular-nums block mt-1">
                              ${item.price.toFixed(2)} val
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full my-auto text-[#A89F88]">
                          <div className="w-10 h-10 rounded-full border border-[#D9CEAE] flex items-center justify-center mb-1">
                            <Plus className="w-4 h-4 text-[#A89F88]" />
                          </div>
                          <span className="text-[11px] font-medium">Slot #{slotIdx + 1}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Box Style Selector */}
              <div className="mb-6 pt-4 border-t border-[#EFE5C6]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#706650] block mb-2.5">
                  Step 2: Choose Box Edition
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {BOX_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedStyle === style.id
                          ? 'bg-white border-[#1E2022] shadow-xs ring-2 ring-[#FED729]'
                          : 'bg-white/60 border-[#E8DEC0] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: style.color }}
                        />
                        <span className="text-xs font-bold text-[#1E2022]">
                          {style.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#706650] leading-tight">
                        {style.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Gift Note */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#706650] block mb-1.5 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#FF3F5E]" />
                  <span>Optional Handwritten Gift Note (Free)</span>
                </span>
                <input
                  type="text"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="e.g., Happy Birthday Chloe! Stay sweet & sour 🍋🍉"
                  maxLength={90}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E8DEC0] bg-white focus:outline-none focus:ring-2 focus:ring-[#FED729]"
                />
              </div>
            </div>

            {/* Right Column: Menu Picker to add items */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#F0E6CA] shadow-sm">
              <span className="font-display font-bold text-base text-[#1E2022] block mb-3">
                Step 1: Pick Items to Add ({selectedItems.length}/{MAX_ITEMS})
              </span>

              <div className="space-y-2.5 mb-6 max-h-[340px] overflow-y-auto pr-1">
                {individualProducts.map((prod) => {
                  const countInBox = selectedItems.filter((i) => i.id === prod.id).length;
                  const isFull = selectedItems.length >= MAX_ITEMS;

                  return (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-[#F4EAC8] bg-[#FFFDF7] hover:bg-[#FFF9E6] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover border border-[#F0E4BE]"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-[#1E2022] line-clamp-1">
                            {prod.name}
                          </h4>
                          <span className="text-[11px] text-[#7A705A] font-mono tabular-nums">
                            ${prod.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {countInBox > 0 && (
                          <span className="text-xs font-bold text-[#8B6A00] bg-[#FFF4C2] px-2 py-0.5 rounded-md">
                            ×{countInBox}
                          </span>
                        )}
                        <button
                          onClick={() => handleAddItem(prod)}
                          disabled={isFull}
                          className="p-1.5 bg-[#FED729] hover:bg-[#FFE600] disabled:opacity-40 text-[#1E2022] rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Add</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Summary & Add to Cart */}
              <div className="pt-4 border-t border-[#F0E6CA] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7A705A]">Bundle Price (4 Items):</span>
                  <span className="font-mono tabular-nums text-xl font-bold text-[#1E2022]">
                    ${BUNDLE_PRICE.toFixed(2)}
                  </span>
                </div>

                {selectedItems.length === MAX_ITEMS && savings > 0 && (
                  <div className="flex items-center justify-between text-xs bg-[#EBF8EE] text-[#2E8B57] p-2 rounded-lg font-semibold">
                    <span>🎉 Tasting Bundle Savings:</span>
                    <span className="font-mono tabular-nums font-bold">-${savings.toFixed(2)} saved</span>
                  </div>
                )}

                <button
                  onClick={handleCompleteBox}
                  disabled={selectedItems.length < MAX_ITEMS}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 ${
                    isAdded
                      ? 'bg-[#3BB35E] text-white'
                      : selectedItems.length === MAX_ITEMS
                      ? 'bg-[#FF3F5E] hover:bg-[#E62A48] text-white'
                      : 'bg-[#E5DFCF] text-[#8B8472] cursor-not-allowed'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Crate Added to Bag!</span>
                    </>
                  ) : selectedItems.length === MAX_ITEMS ? (
                    <>
                      <Package className="w-4 h-4" />
                      <span>Add Complete Crate to Bag · ${BUNDLE_PRICE.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>Select {MAX_ITEMS - selectedItems.length} More Treats</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A705A] text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3BB35E]" />
                  <span>Arrives cold with dry ice pack & mascot stickers included.</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
