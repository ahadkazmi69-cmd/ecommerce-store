import React from 'react';
import { Product } from '../data/products';
import { X, Trash2, ShoppingBag, Plus } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onAddToCart: (product: Product, color: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveProduct,
  onClearAll,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/70 shrink-0">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Hardware Comparison Matrix</h3>
            <p className="text-xs text-zinc-400">
              Comparing {comparedProducts.length} devices side-by-side
            </p>
          </div>
          <div className="flex items-center gap-3">
            {comparedProducts.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-zinc-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          {comparedProducts.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">No Devices Selected</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
                Click the comparison icon on any laptop, phone, or handsfree product card to compare their specifications side-by-side.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
              >
                Explore Hardware
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                {/* Product Column Headers */}
                <div
                  className="grid gap-4 pb-6 border-b border-zinc-800 items-start"
                  style={{ gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(200px, 1fr))` }}
                >
                  <div className="text-xs font-mono font-semibold uppercase text-zinc-500 pt-4">
                    Device Overview
                  </div>
                  {comparedProducts.map((prod) => (
                    <div key={prod.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider">
                            {prod.categoryLabel}
                          </span>
                          <button
                            onClick={() => onRemoveProduct(prod.id)}
                            className="text-zinc-500 hover:text-rose-400 p-0.5 cursor-pointer"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="w-full aspect-[4/3] bg-zinc-900 rounded-lg p-2 mb-3 flex items-center justify-center overflow-hidden">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4
                          onClick={() => onSelectProduct(prod)}
                          className="text-sm font-bold text-white hover:text-zinc-300 transition-colors cursor-pointer line-clamp-1 mb-1"
                        >
                          {prod.name}
                        </h4>
                        <div className="font-mono text-base font-bold text-white tabular-nums mb-3">
                          ${prod.price.toLocaleString()}
                        </div>
                      </div>

                      <button
                        onClick={() => onAddToCart(prod, prod.colors[0]?.name || '')}
                        className="w-full py-2 px-3 text-xs font-semibold bg-zinc-800 hover:bg-white hover:text-zinc-950 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Spec Comparison Rows */}
                <div className="divide-y divide-zinc-800 text-xs">
                  {/* Category */}
                  <div
                    className="grid gap-4 py-3.5 items-center"
                    style={{ gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(200px, 1fr))` }}
                  >
                    <span className="font-mono font-semibold text-zinc-500">Department</span>
                    {comparedProducts.map((p) => (
                      <span key={p.id} className="text-zinc-300 capitalize font-medium">{p.categoryLabel}</span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div
                    className="grid gap-4 py-3.5 items-center"
                    style={{ gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(200px, 1fr))` }}
                  >
                    <span className="font-mono font-semibold text-zinc-500">Verified Rating</span>
                    {comparedProducts.map((p) => (
                      <span key={p.id} className="text-zinc-300 font-mono tabular-nums">
                        ★ {p.rating} / 5.0 ({p.reviewCount} reviews)
                      </span>
                    ))}
                  </div>

                  {/* Primary Performance / Core */}
                  <div
                    className="grid gap-4 py-3.5 items-center"
                    style={{ gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(200px, 1fr))` }}
                  >
                    <span className="font-mono font-semibold text-zinc-500">Core Architecture</span>
                    {comparedProducts.map((p) => (
                      <span key={p.id} className="text-zinc-200 font-medium">
                        {p.specs['Processor'] || p.specs['Chipset'] || p.specs['Transducer'] || p.specs['Driver Size'] || 'Bespoke Silicon'}
                      </span>
                    ))}
                  </div>

                  {/* Display or Acoustic Rating */}
                  <div
                    className="grid gap-4 py-3.5 items-center"
                    style={{ gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(200px, 1fr))` }}
                  >
                    <span className="font-mono font-semibold text-zinc-500">Display / Soundstage</span>
                    {comparedProducts.map((p) => (
                      <span key={p.id} className="text-zinc-200">
                        {p.specs['Display'] || p.specs['Noise Cancellation'] || p.specs['Active Noise Cancellation'] || 'Hi-Fi Audio'}
                      </span>
                    ))}
                  </div>

                  {/* Battery Life */}
                  <div
                    className="grid gap-4 py-3.5 items-center"
                    style={{ gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(200px, 1fr))` }}
                  >
                    <span className="font-mono font-semibold text-zinc-500">Battery Endurance</span>
                    {comparedProducts.map((p) => (
                      <span key={p.id} className="text-zinc-200 font-mono">
                        {p.specs['Battery & Power'] || p.specs['Battery Life'] || p.specs['Battery'] || p.specs['Battery Endurance'] || 'Full Day'}
                      </span>
                    ))}
                  </div>

                  {/* Weight / Form Factor */}
                  <div
                    className="grid gap-4 py-3.5 items-center"
                    style={{ gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(200px, 1fr))` }}
                  >
                    <span className="font-mono font-semibold text-zinc-500">Chassis & Weight</span>
                    {comparedProducts.map((p) => (
                      <span key={p.id} className="text-zinc-300">
                        {p.specs['Chassis & Weight'] || p.specs['Weight'] || 'Titanium Alloy'}
                      </span>
                    ))}
                  </div>

                  {/* Available Finishes */}
                  <div
                    className="grid gap-4 py-3.5 items-center"
                    style={{ gridTemplateColumns: `180px repeat(${comparedProducts.length}, minmax(200px, 1fr))` }}
                  >
                    <span className="font-mono font-semibold text-zinc-500">Finishes</span>
                    {comparedProducts.map((p) => (
                      <div key={p.id} className="flex items-center gap-1.5">
                        {p.colors.map((c) => (
                          <span
                            key={c.name}
                            className={`w-3.5 h-3.5 rounded-full ${c.class}`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
