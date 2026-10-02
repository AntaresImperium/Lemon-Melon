/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TastingBoxBuilder } from './components/TastingBoxBuilder';
import { FlavorLab } from './components/FlavorLab';
import { BrandStory } from './components/BrandStory';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchFilterModal } from './components/SearchFilterModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Footer } from './components/Footer';
import { PRODUCTS, Product, FLAVOR_PROFILES, logoImg } from './data/products';
import { CartItem, OrderDetails } from './types/cart';
import { Sparkles, SlidersHorizontal, Package, Check } from 'lucide-react';

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sweetSourRatio, setSweetSourRatio] = useState<number>(50); // 0 (sour) to 100 (sweet)
  
  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart State (initialize with default popular item)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-1',
      productId: PRODUCTS[0].id,
      product: PRODUCTS[0],
      quantity: 2,
    },
    {
      id: 'init-2',
      productId: PRODUCTS[1].id,
      product: PRODUCTS[1],
      quantity: 1,
    }
  ]);

  // Checkout discount tracking
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Total items in cart
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Filtering products
  const displayedProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // If user drastically shifted sweetSourRatio slider, bias toward relevant items
      if (sweetSourRatio < 35 && item.sourLevel < 3) {
        return false;
      }
      if (sweetSourRatio > 65 && item.sweetLevel < 3) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, sweetSourRatio]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id && !item.bundleItems);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random()}`,
          productId: product.id,
          product,
          quantity,
        },
      ];
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Add Tasting Box to Cart
  const handleAddBoxToCart = (items: Product[], boxStyle: string, giftNote: string) => {
    const customBundleProduct: Product = {
      id: `custom-box-${Date.now()}`,
      name: `Custom 4-Pack Tasting Crate (${boxStyle})`,
      tagline: 'Hand-picked 4 sweet × sour favorites',
      category: 'bundles',
      price: 24.00,
      sweetLevel: 4,
      sourLevel: 4,
      calories: 'Assorted 4 items',
      dietary: ['Cold-Shipped'],
      shortDesc: items.map((i) => i.name).join(', '),
      longDesc: `Custom box with ${items.map((i) => i.name).join(', ')}. ${giftNote ? `Gift note: "${giftNote}"` : ''}`,
      ingredients: ['Custom assembled orchard treats'],
      servingSize: '4 full-size items',
      image: items[0]?.image || PRODUCTS[0].image,
      mascotEndorsement: {
        mascot: 'duo',
        quote: '"Your hand-picked personal crate!" — Lemmy & Melly',
      },
    };

    setCartItems((prev) => [
      ...prev,
      {
        id: `crate-${Date.now()}`,
        productId: customBundleProduct.id,
        product: customBundleProduct,
        quantity: 1,
        customNote: giftNote || undefined,
        bundleItems: items,
      },
    ]);

    setCartOpen(true);
  };

  const handleProceedToCheckout = (discount: number, promo: string) => {
    setCheckoutDiscount(discount);
    setCheckoutPromoCode(promo);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderDetails: OrderDetails) => {
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-[#1E2022]">
      
      {/* 1. Header / Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBoxBuilder={() => scrollToSection('box-builder')}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* 2. Hero Section */}
      <Hero
        sweetSourRatio={sweetSourRatio}
        onRatioChange={setSweetSourRatio}
        onExploreMenu={() => scrollToSection('menu')}
        onOpenBoxBuilder={() => scrollToSection('box-builder')}
      />

      {/* 3. Main Treats & Menu Section */}
      <section id="menu" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Heading & Category Segmented Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A37B00] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#FED729]" />
              <span>Small-Batch Fruit Kitchen</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E2022]">
              Fresh Treats & Refreshments
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5542] mt-1 max-w-xl">
              {sweetSourRatio !== 50
                ? `Filtered for your dialed preference: ${100 - sweetSourRatio}% Sour / ${sweetSourRatio}% Sweet.`
                : 'From fizzy sparkling coolers to chilled sorbet swirls and artisan mochi.'}
            </p>
          </div>

          {sweetSourRatio !== 50 && (
            <button
              onClick={() => setSweetSourRatio(50)}
              className="text-xs font-bold text-[#FF3F5E] hover:underline self-start md:self-auto cursor-pointer"
            >
              Reset Flavor Dial to 50/50 ↺
            </button>
          )}
        </div>

        {/* Category Filter Tabs (Functional segmented buttons with zero-pill discipline) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5EED8] rounded-xl overflow-x-auto mb-8 max-w-3xl">
          {[
            { id: 'all', label: 'All Treats' },
            { id: 'drinks', label: 'Sparkling Drinks' },
            { id: 'sorbets', label: 'Twin Sorbets' },
            { id: 'mochi', label: 'Artisan Mochi' },
            { id: 'gummies', label: 'Sour Gummies' },
            { id: 'bundles', label: 'Tasting Crates' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white text-[#1E2022] shadow-xs'
                  : 'text-[#5C5542] hover:text-[#1E2022]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={handleAddToCart}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 text-center border border-[#F0E6CA]">
            <p className="text-sm font-semibold text-[#1E2022]">
              No items match this extreme dial filter!
            </p>
            <button
              onClick={() => {
                setSweetSourRatio(50);
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-2 bg-[#FED729] text-[#1E2022] rounded-xl text-xs font-bold cursor-pointer"
            >
              Show All Menu
            </button>
          </div>
        )}
      </section>

      {/* 4. Tasting Box Builder Section */}
      <TastingBoxBuilder
        onAddBoxToCart={handleAddBoxToCart}
      />

      {/* 5. Flavor Lab Quiz Section */}
      <FlavorLab
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* 6. Brand Story & Mascot Lore */}
      <BrandStory />

      {/* 7. Reviews Section */}
      <ReviewsSection />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Mobile Sticky Navigation Cap (<= 15% viewport height) */}
      <MobileStickyBar
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenBoxBuilder={() => scrollToSection('box-builder')}
        onScrollToMenu={() => scrollToSection('menu')}
      />

      {/* 10. Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={handleProceedToCheckout}
        onOpenBoxBuilder={() => scrollToSection('box-builder')}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cartItems}
        discountAmount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderPlaced={handleOrderSuccess}
      />

      <SearchFilterModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
