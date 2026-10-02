import React, { useState } from 'react';
import { Send, CheckCircle2, MapPin, Clock, Mail, Heart } from 'lucide-react';
import { logoImg } from '../data/products';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#1E2022] text-[#F3EFE6] pt-14 pb-20 lg:pb-12 border-t border-[#33373B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#33373B]">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Lemon & Melon Brand Mark"
                className="w-12 h-12 rounded-full object-cover border border-[#FED729]"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-bold text-2xl text-white block">
                  Lemon & Melon
                </span>
                <span className="text-[11px] text-[#FED729] font-semibold tracking-wider uppercase">
                  Sweet × Sour Artisan Foods
                </span>
              </div>
            </div>

            <p className="text-xs text-[#A8A190] leading-relaxed max-w-sm">
              Crafting small-batch sparkling coolers, twin-churned sorbets, chewy fruit mochi, 
              and sour drop gummies. Made with whole orchard fruits and certified sweet × sour harmony.
            </p>

            <div className="text-xs text-[#D1C9B7] space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF3F5E]" />
                <span>Kitchen & Flagship Truck: Sunnyvale Farmers Market</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#FED729]" />
                <span>Daily Fresh Dispatch: 8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Treats & Menu
            </h4>
            <ul className="text-xs space-y-2 text-[#A8A190]">
              <li><a href="#menu" className="hover:text-white transition-colors">Sparkling Coolers</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Twin Swirl Sorbets</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Handmade Mochi</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Sour Crystal Gummies</a></li>
              <li><a href="#box-builder" className="hover:text-white transition-colors">Custom 4-Pack Crate</a></li>
            </ul>
          </div>

          {/* Brand & Story */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Story & Values
            </h4>
            <ul className="text-xs space-y-2 text-[#A8A190]">
              <li><a href="#story" className="hover:text-white transition-colors">Meet Lemmy & Melly</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">100% Real Fruit Policy</a></li>
              <li><a href="#flavor-lab" className="hover:text-white transition-colors">The Flavor Lab</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Propose a New Food</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Tasting Reviews</a></li>
            </ul>
          </div>

          {/* Newsletter / Drops */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Join The Sweet × Sour Club
            </h4>
            <p className="text-xs text-[#A8A190] leading-relaxed">
              Get 10% off your first cold crate + secret notifications whenever Lemmy & Melly drop limited seasonal fruit batches.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white/10 text-white placeholder-[#8B8474] border border-white/15 focus:outline-none focus:border-[#FED729]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#FED729] hover:bg-[#FFE600] text-[#1E2022] font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? 'Joined!' : 'Subscribe'}
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-[#3BB35E] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Welcome to the club! Use code SWEETSOUR10 for 10% off.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar (Clean quiet copyright & disclaimer) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C8472] gap-3">
          <p>© 2026 Lemon & Melon Foods Co. All fruit recipes handcrafted with love.</p>
          <div className="flex items-center gap-4">
            <span>Orchard Fresh</span>
            <span aria-hidden="true">·</span>
            <span>Compostable Cold Boxes</span>
            <span aria-hidden="true">·</span>
            <span>Zero Synthetic Dyes</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
