import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Sparkles, MapPin, Phone } from 'lucide-react';
import { CartItem, OrderDetails } from '../types/cart';
import { logoImg } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  promoCode: string;
  onOrderPlaced: (details: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  promoCode,
  onOrderPlaced,
}) => {
  const [formData, setFormData] = useState({
    name: 'Edward Kim',
    email: 'epicedward708@gmail.com',
    phone: '555-019-2834',
    address: '742 Evergreen Terrace',
    city: 'Sunnyvale',
    postalCode: '94086',
    deliveryMethod: 'express-cold' as 'express-cold' | 'pickup',
    paymentMethod: 'apple-pay' as 'apple-pay' | 'card' | 'cod',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 35.0 || formData.deliveryMethod === 'pickup' ? 0 : 4.99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `LM-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDetails: OrderDetails = {
        orderId: orderNumber,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        deliveryOption: formData.deliveryMethod,
        paymentMethod: formData.paymentMethod,
        items,
        subtotal,
        discount: discountAmount,
        shipping,
        total: grandTotal,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsProcessing(false);
      setConfirmedOrder(orderDetails);
      onOrderPlaced(orderDetails);
    }, 1100);
  };

  const handleFinish = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#F0E6CA] my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FFFDF7] p-5 border-b border-[#F0E6CA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Lemon & Melon"
              className="w-10 h-10 rounded-full object-cover border border-[#FED729]"
            />
            <div>
              <h2 className="font-display font-bold text-lg text-[#1E2022]">
                {confirmedOrder ? 'Order Confirmed!' : 'Lemon & Melon Express Checkout'}
              </h2>
              <span className="text-xs text-[#8B6A00] font-semibold">
                {confirmedOrder ? 'Preparing in small batch' : 'Insulated Cold Shipping Dispatch'}
              </span>
            </div>
          </div>

          <button
            onClick={confirmedOrder ? handleFinish : onClose}
            aria-label="Close modal"
            className="p-1.5 text-[#7A705A] hover:text-[#1E2022] hover:bg-[#FFF4C2] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Order Confirmation OR Checkout Form */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#EBF8EE] text-[#3BB35E] rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-[#1E2022]">
                Thank you, {confirmedOrder.customerName}!
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5542] mt-1">
                Your order <strong className="font-mono text-[#FF3F5E]">{confirmedOrder.orderId}</strong> is officially queued in our kitchen.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-[#FFFDF7] rounded-2xl p-4 border border-[#F0E6CA] text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between font-bold pb-2 border-b border-[#F4EAC8]">
                <span>Dispatch Method:</span>
                <span className="capitalize">{confirmedOrder.deliveryOption === 'pickup' ? 'Pop-up Pickup' : 'Express Cold Pack'}</span>
              </div>
              <div className="flex justify-between text-[#7A705A]">
                <span>Items:</span>
                <span>{confirmedOrder.items.reduce((acc, i) => acc + i.quantity, 0)} items</span>
              </div>
              <div className="flex justify-between text-[#7A705A]">
                <span>Estimated Arrival:</span>
                <span className="font-bold text-[#2E8B57]">Tomorrow by 11:30 AM</span>
              </div>
              <div className="flex justify-between text-[#7A705A]">
                <span>Delivery Address:</span>
                <span>{confirmedOrder.address}, {confirmedOrder.city}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#1E2022] pt-2 border-t border-[#F4EAC8]">
                <span>Total Charged:</span>
                <span className="font-mono">${confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-[#FFF9D2] p-3 rounded-xl border border-[#FED729] text-xs text-[#554A25] max-w-md mx-auto">
              🍋 <strong>Lemmy & Melly Tip:</strong> Store your fruit mochi & sorbets in the freezer upon delivery for maximum chewy crispness!
            </div>

            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-[#1E2022] hover:bg-[#33373B] text-white rounded-xl font-bold text-sm cursor-pointer shadow-md"
            >
              Back to Storefront
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Contact Details */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#706650] block mb-2">
                1. Customer & Delivery Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#7A705A] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DEC0] bg-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#FED729]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#7A705A] block mb-1">Email (for Receipt)</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DEC0] bg-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#FED729]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#7A705A] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DEC0] bg-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#FED729]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#7A705A] block mb-1">City & Postal Code</label>
                  <input
                    type="text"
                    required
                    value={`${formData.city}, ${formData.postalCode}`}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value.split(',')[0] || formData.city })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DEC0] bg-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#FED729]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-[#7A705A] block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#E8DEC0] bg-[#FFFDF7] focus:outline-none focus:ring-2 focus:ring-[#FED729]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method Choice */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#706650] block mb-2">
                2. Delivery Method
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryMethod: 'express-cold' })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.deliveryMethod === 'express-cold'
                      ? 'bg-[#FFF9E6] border-[#FED729] ring-2 ring-[#FED729]'
                      : 'border-[#E8DEC0] bg-[#FFFDF7]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1E2022] mb-0.5">
                    <Truck className="w-4 h-4 text-[#FF3F5E]" />
                    <span>Express Cold-Pack Shipping</span>
                  </div>
                  <span className="text-[11px] text-[#7A705A] block">
                    Eco-insulated with reusable dry cold gel
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.deliveryMethod === 'pickup'
                      ? 'bg-[#EBF8EE] border-[#3BB35E] ring-2 ring-[#3BB35E]'
                      : 'border-[#E8DEC0] bg-[#FFFDF7]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1E2022] mb-0.5">
                    <MapPin className="w-4 h-4 text-[#3BB35E]" />
                    <span>Pop-Up Truck Pickup (FREE)</span>
                  </div>
                  <span className="text-[11px] text-[#7A705A] block">
                    Ready in 20 min at Central Park Booth
                  </span>
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#706650] block mb-2">
                3. Payment Method
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'apple-pay', label: ' Pay / Google Pay' },
                  { id: 'card', label: '💳 Credit / Debit Card' },
                  { id: 'cod', label: '💵 Cash on Delivery' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.paymentMethod === m.id
                        ? 'bg-[#1E2022] text-white border-[#1E2022]'
                        : 'bg-[#FFFDF7] border-[#E8DEC0] text-[#5C5542] hover:bg-white'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Line */}
            <div className="pt-3 border-t border-[#F0E6CA] flex items-center justify-between text-xs">
              <span className="text-[#7A705A]">
                Grand Total ({items.length} items):
              </span>
              <span className="font-mono tabular-nums text-xl font-bold text-[#1E2022]">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#FF3F5E] hover:bg-[#E62A48] disabled:opacity-70 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <span>Packing Cold Box...</span>
              ) : (
                <span>Place Order · ${grandTotal.toFixed(2)}</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
