import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCw, Check, Beaker } from 'lucide-react';
import { Product, PRODUCTS, logoImg } from '../data/products';

interface FlavorLabProps {
  onSelectProduct: (product: Product) => void;
}

export const FlavorLab: React.FC<FlavorLabProps> = ({ onSelectProduct }) => {
  const [vibe, setVibe] = useState<'energized' | 'chill' | 'snacky'>('energized');
  const [tolerance, setTolerance] = useState<'high' | 'medium' | 'low'>('medium');
  const [texture, setTexture] = useState<'drink' | 'sorbet' | 'chew' | 'gummy'>('drink');

  // Match algorithm
  const getRecommendation = (): Product | null => {
    if (PRODUCTS.length === 0) return null;

    if (texture === 'drink' || vibe === 'energized') {
      return PRODUCTS.find((p) => p.id === 'lm-sparkling-cooler') || PRODUCTS[0];
    }
    if (texture === 'sorbet' || tolerance === 'low') {
      return PRODUCTS.find((p) => p.id === 'lm-sorbet-trio') || PRODUCTS[1] || PRODUCTS[0];
    }
    if (texture === 'chew') {
      return PRODUCTS.find((p) => p.id === 'lm-fruit-mochi') || PRODUCTS[2] || PRODUCTS[0];
    }
    if (texture === 'gummy' || tolerance === 'high') {
      return PRODUCTS.find((p) => p.id === 'lm-sour-gummies') || PRODUCTS[3] || PRODUCTS[0];
    }
    return PRODUCTS[0];
  };

  const recommended = getRecommendation();

  return (
    <section id="flavor-lab" className="py-14 sm:py-20 bg-gradient-to-b from-[#FFFDF7] to-[#FFF9E6]/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A37B00] bg-[#FFF4C2] px-3 py-1 rounded-full inline-block mb-2">
            Interactive Tasting Assistant
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E2022]">
            The Sweet × Sour Flavor Lab
          </h2>
          <p className="text-sm text-[#5C5542] mt-2">
            Not sure whether Lemmy's sour kick or Melly's sweet chill is right for you today? 
            Calibrate your personal palate preference below.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F0E6CA] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Quiz Controls */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Question 1: Vibe */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#706650] block mb-2">
                1. What’s your current afternoon energy?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'energized', label: '⚡ Wake Me Up', sub: 'Citrus rush' },
                  { id: 'chill', label: '🏖️ Pure Chill', sub: 'Sweet refreshment' },
                  { id: 'snacky', label: '😋 Fun Chew', sub: 'Mouth snack' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setVibe(opt.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      vibe === opt.id
                        ? 'bg-[#FFF4C2] border-[#FED729] font-bold text-[#1E2022] shadow-xs'
                        : 'border-[#EAE1C8] hover:bg-[#FFFDF7] text-[#5C5542]'
                    }`}
                  >
                    <span className="text-xs block">{opt.label}</span>
                    <span className="text-[10px] text-[#7A705A] block">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Sour Tolerance */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#706650] block mb-2">
                2. How much sourness can your tongue take?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'high', label: 'Pucker Up! 🍋', desc: 'Love high tartness' },
                  { id: 'medium', label: 'Balanced 50/50', desc: 'The sweet spot' },
                  { id: 'low', label: 'Gentle & Sweet 🍉', desc: 'Mild citrus hint' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTolerance(opt.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      tolerance === opt.id
                        ? 'bg-[#FFE8EC] border-[#FF3F5E] font-bold text-[#1E2022] shadow-xs'
                        : 'border-[#EAE1C8] hover:bg-[#FFFDF7] text-[#5C5542]'
                    }`}
                  >
                    <span className="text-xs block">{opt.label}</span>
                    <span className="text-[10px] text-[#7A705A] block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Texture */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#706650] block mb-2">
                3. Your preferred texture:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'drink', label: 'Fizzy Soda' },
                  { id: 'sorbet', label: 'Cold Sorbet' },
                  { id: 'chew', label: 'Soft Mochi' },
                  { id: 'gummy', label: 'Tart Gummies' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTexture(opt.id as any)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all text-xs font-semibold cursor-pointer ${
                      texture === opt.id
                        ? 'bg-[#EBF8EE] border-[#3BB35E] text-[#1E2022]'
                        : 'border-[#EAE1C8] hover:bg-[#FFFDF7] text-[#5C5542]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Recommendation Match Card */}
          <div className="md:col-span-5 bg-[#FFFDF0] rounded-2xl p-5 border border-[#FED729] shadow-xs flex flex-col justify-between h-full">
            {recommended ? (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B6A00] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Your Optimal Match
                    </span>
                    <span className="text-xs font-bold text-[#3BB35E] bg-[#EBF8EE] px-2 py-0.5 rounded-md">
                      98% Match
                    </span>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 border border-[#F0E4BE]">
                    <img
                      src={recommended.image}
                      alt={recommended.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#1E2022]">
                    {recommended.name}
                  </h3>
                  <p className="text-xs text-[#5C5542] mt-1 leading-relaxed">
                    {recommended.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DEC0] mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono tabular-nums text-lg font-bold text-[#1E2022]">
                      ${recommended.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-[#7A705A] block">
                      Fresh today
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(recommended)}
                    className="px-4 py-2.5 bg-[#FF3F5E] hover:bg-[#E62A48] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View My Treat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 border border-[#FED729]">
                  <Beaker className="w-6 h-6 text-[#8B6A00]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B6A00] block mb-1">
                  Taste Profile Calibrated!
                </span>
                <h4 className="font-display font-bold text-base text-[#1E2022] mb-1">
                  Ready For The Official Drop
                </h4>
                <p className="text-xs text-[#5C5542] leading-relaxed mb-4">
                  Lemmy and Melly have logged your preference ({vibe} energy, {tolerance} sourness, {texture} texture). As soon as the first recipes are posted to the menu, your direct recommendation will appear right here!
                </p>
                <a
                  href="#story"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FF3F5E] hover:underline"
                >
                  Propose a custom treat recipe →
                </a>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
