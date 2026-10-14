import React from 'react';
import { ShoppingBag, SlidersHorizontal, Search, X } from 'lucide-react';
import { CategoryFilter } from '../types';

interface NavbarProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  cartCount: number;
  onOpenCart: () => void;
  compareCount: number;
  onOpenCompare: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  compareCount,
  onOpenCompare,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  setIsSearchOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090a0f]/90 border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
        >
          VELA HARDWARE
        </button>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
          <button
            onClick={() => onSelectCategory('all')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeCategory === 'all' ? 'text-white border-b-2 border-white pb-0.5' : 'hover:text-zinc-200'
            }`}
          >
            All Hardware
          </button>
          <button
            onClick={() => onSelectCategory('laptop')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeCategory === 'laptop' ? 'text-white border-b-2 border-white pb-0.5' : 'hover:text-zinc-200'
            }`}
          >
            Laptops
          </button>
          <button
            onClick={() => onSelectCategory('phone')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeCategory === 'phone' ? 'text-white border-b-2 border-white pb-0.5' : 'hover:text-zinc-200'
            }`}
          >
            Smartphones
          </button>
          <button
            onClick={() => onSelectCategory('handfree')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeCategory === 'handfree' ? 'text-white border-b-2 border-white pb-0.5' : 'hover:text-zinc-200'
            }`}
          >
            Handsfree & Audio
          </button>
          <a
            href="#audio-lab"
            className="whitespace-nowrap shrink-0 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Acoustic Lab
          </a>
        </nav>

        {/* Zone 3: Primary Action Cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Search Trigger */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 w-48 sm:w-64 transition-all">
                <Search className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search laptops, phones..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    onSearchChange('');
                    setIsSearchOpen(false);
                  }}
                  className="text-zinc-400 hover:text-white p-0.5 cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-zinc-800/60"
                aria-label="Open search"
                title="Search products"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Comparison Trigger */}
          <button
            onClick={onOpenCompare}
            className="relative p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-zinc-800/60 flex items-center gap-1.5"
            aria-label="Compare selected products"
            title="Device Comparison"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {compareCount > 0 && (
              <span className="text-[11px] font-mono font-semibold bg-zinc-800 border border-zinc-700 text-zinc-200 px-1.5 py-0.2 rounded-md">
                {compareCount}
              </span>
            )}
          </button>

          {/* Cart Primary CTA */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-zinc-950 bg-white rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-95"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="font-mono bg-zinc-900 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
