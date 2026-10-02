import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Heart } from 'lucide-react';
import { heroImg, logoImg } from '../data/products';

interface HeroProps {
  sweetSourRatio: number; // 0 (100% sour) to 100 (100% sweet)
  onRatioChange: (val: number) => void;
  onExploreMenu: () => void;
  onOpenBoxBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  sweetSourRatio,
  onRatioChange,
  onExploreMenu,
  onOpenBoxBuilder,
}) => {
  const getMoodLabel = () => {
    if (sweetSourRatio < 30) return { title: 'Electric Sour Punch', desc: 'Lemmy is hyped! High citric kick & zesty tang.' };
    if (sweetSourRatio > 70) return { title: 'Mellow Sweet Chill', desc: 'Melly is cruising! Pure juicy watermelon refreshment.' };
    return { title: 'Signature Sweet × Sour Harmony', desc: 'The golden balance! Sweet watermelon meets zesty lemon.' };
  };

  const currentMood = getMoodLabel();

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#FFFDF7] via-[#FFF9E6]/60 to-[#FFFDF7]">
      {/* Playful background decorative fruit rings */}
      <div className="absolute top-12 left-6 w-72 h-72 rounded-full bg-[#FED729]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-6 w-96 h-96 rounded-full bg-[#FF3F5E]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Headlines */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Editorial brand kicker */}
            <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-[#8B6A00]">
              <span className="w-2 h-2 rounded-full bg-[#FED729]" />
              <span>Handcrafted Fruit Refreshments & Confections</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#FF3F5E]">Est. 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E2022] leading-[1.1] mb-5 text-balance">
              The Wildly Addictive Collision of <span className="text-[#FF3F5E] underline decoration-[#FED729] decoration-wavy decoration-4">Sweet</span> & <span className="text-[#CCA000] underline decoration-[#3BB35E] decoration-wavy decoration-4">Sour</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#554E3C] leading-relaxed mb-8 max-w-xl">
              Meet Lemmy (the tangy sunshine lemon) and Melly (the chill watermelon in shades). 
              Together, we create small-batch sparkling coolers, twin-swirl sorbets, chewy fruit mochi, 
              and mouth-puckering gummies made with 100% genuine orchard fruits.
            </p>

            {/* Interactive Sweet × Sour Dial Widget */}
            <div className="bg-white/90 backdrop-blur-sm border border-[#F0E4BE] rounded-2xl p-4 sm:p-5 mb-8 shadow-sm max-w-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wide text-[#706650]">
                  Dial Your Flavor Vibe:
                </span>
                <span className="text-xs font-semibold text-[#1E2022] font-mono tabular-nums">
                  {100 - sweetSourRatio}% Sour · {sweetSourRatio}% Sweet
                </span>
              </div>

              {/* Slider */}
              <div className="relative flex items-center mb-3">
                <span className="text-sm font-display font-bold text-[#D49800] mr-2">🍋 Sour</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sweetSourRatio}
                  onChange={(e) => onRatioChange(Number(e.target.value))}
                  aria-label="Adjust sweet versus sour preference"
                  className="w-full h-3 bg-gradient-to-r from-[#FED729] via-[#3BB35E] to-[#FF3F5E] rounded-lg appearance-none cursor-pointer accent-[#1E2022]"
                />
                <span className="text-sm font-display font-bold text-[#FF3F5E] ml-2">🍉 Sweet</span>
              </div>

              {/* Live Dial Result */}
              <div className="bg-[#FFFDF7] rounded-xl px-3.5 py-2 border border-[#F4EAC8] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1E2022]">{currentMood.title}</p>
                  <p className="text-[11px] text-[#7A705A]">{currentMood.desc}</p>
                </div>
                <button
                  onClick={onExploreMenu}
                  className="text-xs font-bold text-[#FF3F5E] hover:underline cursor-pointer whitespace-nowrap ml-2"
                >
                  Filter Menu →
                </button>
              </div>
            </div>

            {/* Primary Action Zone */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 bg-[#1E2022] hover:bg-[#33373B] text-white rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <span>Browse The Summer Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOpenBoxBuilder}
                className="px-6 py-3.5 bg-[#FED729] hover:bg-[#FFE600] text-[#1E2022] rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#8B6A00]" />
                <span>Build 4-Pack Crate ($24)</span>
              </button>
            </div>

            {/* Adjacency Trust Markers (Unboxed editorial text) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#736B58] pt-2 border-t border-[#F0E4BE]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3BB35E]" />
                <span>100% Real Orchard Fruit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#FF3F5E]" />
                <span>Insulated Cold-Pack Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#FED729]" />
                <span>Daily Small Kitchen Batches</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Mascot Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Summer Spread Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group">
                <img
                  src={heroImg}
                  alt="Lemon and Melon fresh food and drinks spread"
                  className="w-full h-80 sm:h-96 lg:h-[450px] object-cover group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Mascot Badge Stamp */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-md flex items-center gap-2.5 border border-[#F4EAC8]">
                  <img
                    src={logoImg}
                    alt="Lemon & Melon Mascot"
                    className="w-12 h-12 rounded-full object-cover border border-[#FED729]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <p className="font-display font-bold text-sm text-[#1E2022] leading-tight">Sweet × Sour</p>
                    <p className="text-[10px] text-[#7A705A] font-semibold">Official Taste Duo</p>
                  </div>
                </div>

                {/* Bottom Card Overlay Tag */}
                <div className="absolute bottom-4 inset-x-4 bg-gradient-to-r from-[#1E2022]/90 to-[#2A2B2E]/90 backdrop-blur-md text-white rounded-2xl p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#FED729] font-bold uppercase tracking-wider block">Today's Kitchen Batch</span>
                    <span className="text-sm font-bold">Sparkling Coolers & Fresh Mochi Ready</span>
                  </div>
                  <button
                    onClick={onExploreMenu}
                    className="px-3 py-1.5 bg-[#FF3F5E] hover:bg-[#E62A48] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Taste Now
                  </button>
                </div>
              </div>

              {/* Decorative Mascot speech bubble for mobile & desktop */}
              <div className="mt-4 bg-[#FFF9D2] border border-[#FED729] rounded-2xl p-3.5 flex items-start gap-3 shadow-xs">
                <span className="text-2xl select-none">💬</span>
                <p className="text-xs text-[#554A25] leading-relaxed">
                  <span className="font-bold text-[#1E2022]">Melly:</span> "Keep it frosty, sweet, and smooth." 
                  <span className="font-bold text-[#1E2022] ml-2">Lemmy:</span> "And give them that punchy citrus kick!"
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
