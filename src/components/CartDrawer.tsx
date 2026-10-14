import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, selectedColor: string, delta: number) => void;
  onRemoveItem: (productId: string, selectedColor: string) => void;
  onProceedToCheckout: () => void;
  discountPercentage: number;
  onApplyPromoCode: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountPercentage,
  onApplyPromoCode,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const total = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = 100;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromoCode(promoInput.trim());
    if (success) {
      setPromoMessage({ type: 'success', text: 'Promo code applied! 10% discount.' });
    } else {
      setPromoMessage({ type: 'error', text: 'Invalid code. Try "VELA10".' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h3 className="text-base font-bold text-white tracking-tight">Shopping Bag</h3>
              <span className="text-xs font-mono font-medium text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tracker */}
          <div className="px-6 py-3 bg-zinc-950 border-b border-zinc-800/80 text-xs">
            {isFreeShipping ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Free Express Shipping Applied to Entire Order
              </span>
            ) : (
              <span className="text-zinc-400">
                Add <span className="text-white font-mono font-bold">${freeShippingThreshold - subtotal}</span> more to unlock complimentary express shipping.
              </span>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-zinc-800/80">
            {items.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-white mb-1">Your bag is empty</p>
                <p className="text-xs text-zinc-400 mb-6 max-w-xs mx-auto">
                  Discover precision laptops, flagship phones, and handsfree audio devices.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-zinc-950 rounded-lg border border-zinc-800 p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info & Modifiers */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                          className="text-zinc-500 hover:text-rose-400 p-0.5 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                        <span>{item.selectedColor}</span>
                        <span aria-hidden="true">·</span>
                        <span className="uppercase text-zinc-500">{item.product.categoryLabel}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-md overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, -1)}
                          className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-semibold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedColor, 1)}
                          className="px-2 py-0.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-sm font-bold text-white tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. VELA10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <div
                  className={`text-[11px] font-medium ${
                    promoMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {promoMessage.text}
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white tabular-nums">${subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Hardware Discount ({discountPercentage}%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Expedited Shipping</span>
                  <span className="text-emerald-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Due</span>
                  <span className="font-mono text-base tabular-nums">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 256-Bit SSL Checkout · Cash on Delivery Supported</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
