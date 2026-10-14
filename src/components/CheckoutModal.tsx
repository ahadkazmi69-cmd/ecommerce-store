import React, { useState } from 'react';
import { CartItem, CheckoutFormData, ConfirmedOrder } from '../types';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, PackageCheck, Copy, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  onOrderSuccess: (order: ConfirmedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  total,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Alexander Wright',
    email: 'alexander.wright@techlab.io',
    phone: '+1 (555) 382-9912',
    address: '450 Innovation Parkway, Suite 800',
    city: 'San Francisco',
    postalCode: '94107',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 9214',
    cardExp: '08/28',
    cardCvc: '849',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `VELA-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: ConfirmedOrder = {
        orderId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        items,
        subtotal,
        discount,
        shipping: 0,
        total,
        shippingAddress: `${formData.address}, ${formData.city} ${formData.postalCode}`,
        paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery (Pay on Inspection)' : 'Credit Card (Paid)',
        estimatedDelivery: 'Oct 17, 2026 (Priority Air)',
      };

      setConfirmedOrder(newOrder);
      onOrderSuccess(newOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  const copyTracking = () => {
    if (!confirmedOrder) return;
    navigator.clipboard.writeText(confirmedOrder.orderId);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/70 shrink-0">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              {confirmedOrder ? 'Order Confirmation' : 'Express Checkout'}
            </h3>
            <p className="text-xs text-zinc-400">
              {confirmedOrder ? 'Your shipment is being prepared' : 'Fast, encrypted hardware dispatch'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {confirmedOrder ? (
            /* Post-Order State */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                  Order Successfully Verified
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Order #{confirmedOrder.orderId} Confirmed
                </h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                  A verification confirmation receipt and invoice have been dispatched to{' '}
                  <span className="text-white font-medium">{formData.email}</span>.
                </p>
              </div>

              {/* Order Tracking Card */}
              <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 block">SHIPMENT TRACKING ID</span>
                    <span className="font-mono text-sm font-bold text-white">{confirmedOrder.orderId}</span>
                  </div>
                  <button
                    onClick={copyTracking}
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTracking ? 'Copied' : 'Copy Tracking'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-500 block">ESTIMATED DELIVERY</span>
                    <span className="text-zinc-200 font-semibold">{confirmedOrder.estimatedDelivery}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">PAYMENT METHOD</span>
                    <span className="text-zinc-200 font-semibold">{confirmedOrder.paymentMethod}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-zinc-500 block">SHIPPING DESTINATION</span>
                    <span className="text-zinc-200">{confirmedOrder.shippingAddress}</span>
                  </div>
                </div>

                {/* Items Summary in Receipt */}
                <div className="pt-3 border-t border-zinc-800 space-y-2">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                    Verified Manifest ({confirmedOrder.items.length} Products)
                  </span>
                  {confirmedOrder.items.map((it) => (
                    <div key={`${it.product.id}-${it.selectedColor}`} className="flex justify-between items-center text-xs">
                      <span className="text-zinc-300">
                        {it.quantity}x {it.product.name} ({it.selectedColor})
                      </span>
                      <span className="font-mono text-white tabular-nums">
                        ${(it.product.price * it.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-zinc-800/80 flex justify-between text-sm font-bold text-white">
                    <span>Total Charged</span>
                    <span className="font-mono tabular-nums">${confirmedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Summary Strip */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-400 block">Order Total ({items.length} items)</span>
                  <span className="font-mono text-lg font-bold text-white tabular-nums">${total.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-medium block flex items-center gap-1 justify-end">
                    <Truck className="w-3.5 h-3.5" /> Free Express Shipping
                  </span>
                  <span className="text-zinc-500 text-[11px]">2-Yr Hardware Warranty Included</span>
                </div>
              </div>

              {/* 1. Contact & Shipping Details */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3">
                  01. Customer & Shipping Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Email (for Order Confirmation)</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Phone Number (Delivery Verification)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Terms (COD or Card) */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-3">
                  02. Payment Terms
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      formData.paymentMethod === 'card'
                        ? 'bg-zinc-800 border-white text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Credit / Debit Card</div>
                      <div className="text-[10px] text-zinc-400">Immediate priority processing</div>
                    </div>
                    <CreditCard className="w-4 h-4 text-zinc-300" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-zinc-800 border-white text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Cash on Delivery (COD)</div>
                      <div className="text-[10px] text-zinc-400">Inspect parcel before payment</div>
                    </div>
                    <Banknote className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>

                {formData.paymentMethod === 'card' ? (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs">
                    <div>
                      <label className="block text-zinc-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-zinc-600"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 mb-1">Expiry</label>
                        <input
                          type="text"
                          required
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-zinc-600"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1">CVC</label>
                        <input
                          type="password"
                          required
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-zinc-600"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-zinc-950 border border-emerald-900/40 text-xs text-zinc-300 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Cash on Delivery Active</span>
                      <p className="text-[11px] text-zinc-400 mt-1">
                        Total of <span className="text-white font-mono font-bold">${total.toLocaleString()}</span> will be collected in cash by our verified courier after you inspect the hardware package seals upon delivery.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Order & Reservation...</span>
                ) : (
                  <>
                    <PackageCheck className="w-4 h-4" />
                    <span>Confirm Order (${total.toLocaleString()})</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
