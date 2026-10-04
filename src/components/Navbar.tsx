import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { logoImg } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenBoxBuilder: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenBoxBuilder,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'menu', label: 'Treats & Menu' },
    { id: 'flavor-lab', label: 'Flavor Lab' },
    { id: 'box-builder', label: 'Tasting Box' },
    { id: 'story', label: 'Our Story' },
    { id: 'reviews', label: 'Tasting Buzz' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#F4EAC8] transition-colors">
      {/* Announcement top-strip */}
      <div className="bg-[#FED729] text-[#1E2022] text-xs font-semibold px-4 py-1.5 text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#FF3F5E] animate-ping" />
        <span>Summer Drop: Fresh watermelon & sour lemon batches pressed daily! Free cold pack over $35 with code <span className="font-bold underline">SWEETSOUR10</span></span>
      </div>

      {/* Strict 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark (clean single-line brand identity) */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('hero');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img
              src={logoImg}
              alt="Lemon & Melon Logo"
              className="w-11 h-11 rounded-full shadow-sm border border-[#FED729] group-hover:rotate-6 group-hover:scale-105 transition-transform duration-200 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col origin-left transition-transform duration-200 ease-out group-hover:scale-[1.05]">
              <span className="font-display font-bold text-2xl tracking-tight text-[#1E2022] leading-none">
                <span className="text-[#1E2022] group-hover:text-[#D99200] transition-colors duration-200">Lemon</span>
                <span className="text-[#1E2022] mx-1">&</span>
                <span className="text-[#1E2022] group-hover:text-[#FF3F5E] transition-colors duration-200">Melon</span>
              </span>
              <span className="text-[10px] font-semibold text-[#8B6A00] tracking-wider uppercase transition-colors duration-200">
                Sweet × Sour Foods
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: 4-6 Clean Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-sm font-semibold transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                activeSection === link.id
                  ? 'text-[#FF3F5E]'
                  : 'text-[#5C5542] hover:text-[#1E2022]'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF3F5E] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            aria-label="Search treats"
            className="p-2.5 text-[#5C5542] hover:text-[#1E2022] hover:bg-[#FFF4C2] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping bag"
            className="relative p-2.5 bg-[#FFF4C2] hover:bg-[#FED729] text-[#1E2022] rounded-full transition-all cursor-pointer flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF3F5E] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenBoxBuilder}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-[#FF3F5E] hover:bg-[#E62A48] rounded-xl shadow-sm hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            Build Tasting Box
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-[#5C5542] hover:text-[#1E2022] hover:bg-[#FFF4C2] rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F4EAC8] bg-[#FFFDF7] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#FFF4C2] text-[#1E2022]'
                    : 'text-[#5C5542] hover:bg-[#FFFDF0]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F4EAC8] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenBoxBuilder();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[#FF3F5E] text-white text-center rounded-xl font-bold text-sm shadow cursor-pointer"
            >
              Build Custom Tasting Box ($24)
            </button>
            <button
              onClick={() => {
                onOpenCart();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#FFF4C2] text-[#1E2022] text-center rounded-xl font-bold text-sm cursor-pointer"
            >
              View Shopping Bag ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
