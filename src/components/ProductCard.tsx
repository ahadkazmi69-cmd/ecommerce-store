import React, { useState } from 'react';
import { Product } from '../data/products';
import { Star, SlidersHorizontal, Check, ShoppingBag, Eye, Cpu, Radio, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isCompared,
  onToggleCompare,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1600);
  };

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-zinc-900/60 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 cursor-pointer overflow-hidden"
    >
      {/* Visual Header / Image Container (takes substantial height) */}
      <div className="relative aspect-[4/3] w-full bg-zinc-950 overflow-hidden flex items-center justify-center p-4">
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500 p-4 text-center">
            <Cpu className="w-10 h-10 mb-2 opacity-50 text-zinc-400" />
            <span className="text-xs font-medium text-zinc-400">{product.name}</span>
            <span className="text-[11px] text-zinc-600 mt-1">{product.categoryLabel}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-center transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Top-Right Action: Compare Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            isCompared
              ? 'bg-white text-zinc-950 shadow-md'
              : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700/60'
          }`}
          title={isCompared ? 'Remove from comparison' : 'Compare product'}
          aria-label="Toggle comparison"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>

        {/* Top-Left: Subtle Text Kicker / Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wide text-zinc-300 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 px-2 py-0.5 rounded">
            {product.badge}
          </div>
        )}

        {/* Quick View Hover Pill */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-md bg-zinc-900/95 text-white border border-zinc-700/80 shadow-md flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-zinc-400">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-zinc-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-mono tabular-nums font-medium text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-zinc-600">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors mb-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Key Bullet / Hardware highlight */}
          <div className="space-y-1 mb-4 text-[11px] text-zinc-400">
            {product.category === 'laptop' && product.laptopFeatures && (
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-zinc-500 font-mono">CPU:</span>
                <span className="text-zinc-300 truncate">{product.laptopFeatures.cpu} · {product.laptopFeatures.gpu}</span>
              </div>
            )}
            {product.category === 'phone' && product.phoneFeatures && (
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-zinc-500 font-mono">OPTICS:</span>
                <span className="text-zinc-300 truncate">{product.phoneFeatures.sensorMp}MP 1-inch · {product.phoneFeatures.screenHz}Hz OLED</span>
              </div>
            )}
            {product.category === 'handfree' && product.audioFeatures && (
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-zinc-500 font-mono">AUDIO:</span>
                <span className="text-zinc-300 truncate">{product.audioFeatures.ancLevel} · {product.audioFeatures.batteryLife}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: Color Swatches + Pricing + Quick Add */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${color.class} ${
                  selectedColor === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-950 scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                title={color.name}
                aria-label={`Select color ${color.name}`}
              />
            ))}
          </div>

          {/* Price & Add to Bag */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-mono text-base font-bold text-white tabular-nums">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="block text-[11px] font-mono text-zinc-500 line-through tabular-nums">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleAdd}
              className={`p-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center ${
                addedFeedback
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-800 hover:bg-white hover:text-zinc-950 text-zinc-200 border border-zinc-700'
              }`}
              title="Add to bag"
              aria-label={`Add ${product.name} to shopping bag`}
            >
              {addedFeedback ? (
                <Check className="w-4 h-4 animate-scale" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
