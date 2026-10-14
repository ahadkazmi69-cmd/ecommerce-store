import React, { useState } from 'react';
import { Product } from '../data/products';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, SlidersHorizontal, Volume2, Sparkles, Smartphone, Laptop } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, qty: number) => void;
  onBuyNow: (product: Product, color: string, qty: number) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isCompared,
  onToggleCompare,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews'>('specs');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
              {product.categoryLabel}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400 font-mono">MODEL: {product.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Top Section: Split Media + Purchase Module */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left: Product Visual */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="w-full aspect-square bg-zinc-950 rounded-xl border border-zinc-800/80 p-6 flex items-center justify-center overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 text-xs font-medium text-zinc-300 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Quick Trust Badges below visual */}
              <div className="w-full grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                  <ShieldCheck className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 block font-medium">2-Yr Warranty</span>
                </div>
                <div className="p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                  <Truck className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 block font-medium">Express Dispatch</span>
                </div>
                <div className="p-2 rounded bg-zinc-950/60 border border-zinc-800/60">
                  <RotateCcw className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 block font-medium">30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                {/* Rating & In-Stock Status */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-mono tabular-nums font-semibold">{product.rating}</span>
                    <span className="text-zinc-500">({product.reviewCount} verified reviews)</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    In Stock
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  {product.name}
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3 mb-6 p-4 rounded-xl bg-zinc-950 border border-zinc-800/80">
                  <span className="text-3xl font-bold font-mono text-white tabular-nums">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base font-mono text-zinc-500 line-through tabular-nums">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded">
                      Save ${(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Color Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-medium text-zinc-400 mb-2">
                    <span>FINISH / COLOR:</span>
                    <span className="text-white font-semibold">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                          selectedColor === color.name
                            ? 'bg-zinc-800 border-white text-white shadow-sm'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${color.class}`} />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-xs font-medium text-zinc-400">QUANTITY:</span>
                  <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 text-sm font-mono font-semibold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now & Compare */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Bag
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-xl text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-200 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-95"
                  >
                    Instant Checkout
                  </button>
                </div>

                <button
                  onClick={() => onToggleCompare(product)}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                    isCompared
                      ? 'bg-zinc-800 text-white border border-zinc-600'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {isCompared ? 'Item in Comparison Matrix (Click to Remove)' : 'Add to Comparison Matrix'}
                </button>
              </div>

            </div>
          </div>

          {/* Deep Tabs Section: Specs, Highlights, Reviews */}
          <div className="border-t border-zinc-800 pt-6">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 p-1 bg-zinc-950 rounded-lg w-fit mb-6 border border-zinc-800">
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'features'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Engineering Highlights
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Customer Reviews ({product.reviews.length})
              </button>
            </div>

            {/* Tab: Specs Table */}
            {activeTab === 'specs' && (
              <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-zinc-800/80">
                    {Object.entries(product.specs).map(([specKey, specVal]) => (
                      <tr key={specKey} className="hover:bg-zinc-900/40 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-zinc-400 w-1/3 bg-zinc-900/30 font-mono text-[11px] tracking-wide">
                          {specKey}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-200 font-medium">
                          {specVal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab: Features */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-800">
                  <h4 className="text-sm font-bold text-white mb-2">Architectural Summary</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.keyHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3"
                    >
                      <span className="font-mono text-xs font-bold text-zinc-500 mt-0.5">
                        0{idx + 1}.
                      </span>
                      <p className="text-xs font-medium text-zinc-300 leading-relaxed">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-zinc-500 font-mono text-[11px]">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                          }`}
                        />
                      ))}
                    </div>

                    <h5 className="text-xs font-bold text-zinc-200">{rev.title}</h5>
                    <p className="text-xs text-zinc-400 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
