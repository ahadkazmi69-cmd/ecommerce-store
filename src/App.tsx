import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS, Product } from './data/products';
import { CartItem, CategoryFilter, SortOption, ConfirmedOrder } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ComparisonModal } from './components/ComparisonModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { InteractiveAudioStudio } from './components/InteractiveAudioStudio';
import { Footer } from './components/Footer';
import { Filter, SlidersHorizontal, ArrowUpDown, Laptop, Smartphone, Headphones, Layers, Sparkles, Check, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation & Filtering State
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(3500);

  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vela_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Comparison State
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Promo & Discounts
  const [discountPercentage, setDiscountPercentage] = useState(0);

  // Temporary Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('vela_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add to Cart
  const handleAddToCart = (product: Product, color: string, qty: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      }
      return [...prev, { product, quantity: qty, selectedColor: color }];
    });
    showToast(`Added ${qty}x ${product.name} to shopping bag.`);
  };

  // Instant Buy Now
  const handleBuyNow = (product: Product, color: string, qty: number = 1) => {
    handleAddToCart(product, color, qty);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (productId: string, selectedColor: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor === selectedColor) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove Item
  const handleRemoveCartItem = (productId: string, selectedColor: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.selectedColor === selectedColor))
    );
  };

  // Toggle Compare
  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from comparison.`);
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        showToast('Maximum 3 items can be compared simultaneously.');
        return prev;
      }
      showToast(`Added ${product.name} to comparison matrix.`);
      return [...prev, product];
    });
  };

  // Promo Code Check
  const handleApplyPromoCode = (code: string): boolean => {
    if (code.toUpperCase() === 'VELA10') {
      setDiscountPercentage(10);
      return true;
    }
    if (code.toUpperCase() === 'FLAGSHIP') {
      setDiscountPercentage(15);
      return true;
    }
    return false;
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // Price range filter
      if (p.price > maxPrice) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSubtitle = p.subtitle.toLowerCase().includes(q);
        const matchCategory = p.categoryLabel.toLowerCase().includes(q);
        const matchSpecs = Object.values(p.specs).some((val) => val.toLowerCase().includes(q));
        return matchName || matchSubtitle || matchCategory || matchSpecs;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [activeCategory, searchQuery, sortBy, maxPrice]);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercentage) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-zinc-100 selection:bg-zinc-700 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-700 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (1 Line Brand — 4-5 Nav Links — Primary Action) */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        compareCount={comparedProducts.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      {/* Main Showcase Hero */}
      <Hero
        onSelectCategory={setActiveCategory}
        onExploreProduct={(id) => {
          const prod = PRODUCTS.find((p) => p.id === id);
          if (prod) setSelectedProduct(prod);
        }}
      />

      {/* Catalog & Filter Section */}
      <main id="catalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">
              <span>Hardware Catalog</span>
              <span aria-hidden="true">·</span>
              <span>Available for Immediate Delivery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeCategory === 'all' && 'The Full Hardware Collection'}
              {activeCategory === 'laptop' && 'Precision Performance Laptops'}
              {activeCategory === 'phone' && 'Flagship 5G Smartphones'}
              {activeCategory === 'handfree' && 'Lossless Handsfree & Audio'}
            </h2>
          </div>

          {/* Department Tabs (Interactive Filter Controls) */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All ({PRODUCTS.length})</span>
            </button>
            <button
              onClick={() => setActiveCategory('laptop')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeCategory === 'laptop'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Laptops ({PRODUCTS.filter((p) => p.category === 'laptop').length})</span>
            </button>
            <button
              onClick={() => setActiveCategory('phone')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeCategory === 'phone'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phones ({PRODUCTS.filter((p) => p.category === 'phone').length})</span>
            </button>
            <button
              onClick={() => setActiveCategory('handfree')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeCategory === 'handfree'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Handsfree ({PRODUCTS.filter((p) => p.category === 'handfree').length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Strip: Search Status, Max Price, Sorting */}
        <div className="py-5 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Price Range Slider */}
          <div className="flex items-center gap-3">
            <span className="text-zinc-500 font-medium">MAX BUDGET:</span>
            <input
              type="range"
              min="50"
              max="3500"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-28 sm:w-36 accent-white cursor-pointer"
            />
            <span className="font-mono font-bold text-white tabular-nums">${maxPrice.toLocaleString()}</span>
            {maxPrice < 3500 && (
              <button
                onClick={() => setMaxPrice(3500)}
                className="text-zinc-500 hover:text-white underline cursor-pointer text-[11px]"
              >
                Reset
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-500 font-medium">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-zinc-900 border border-zinc-800 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-zinc-700 cursor-pointer"
            >
              <option value="featured">Featured Hardware</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid: 3-column desktop with generous whitespace */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 rounded-full bg-zinc-900 text-zinc-500 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">No matching devices found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">
              Try adjusting your price ceiling, removing filters, or clearing your search term.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setMaxPrice(3500);
              }}
              className="px-4 py-2 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelectedProduct}
                onAddToCart={handleAddToCart}
                isCompared={comparedProducts.some((p) => p.id === product.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        )}

      </main>

      {/* Floating Compare Matrix Drawer Indicator */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 rounded-2xl px-5 py-3 shadow-2xl flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">
              {comparedProducts.length} device{comparedProducts.length > 1 ? 's' : ''} in comparison
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors cursor-pointer shadow-sm"
            >
              View Matrix
            </button>
            <button
              onClick={() => setComparedProducts([])}
              className="text-zinc-400 hover:text-white px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Interactive Hardware & Audio Innovation Lab */}
      <InteractiveAudioStudio />

      {/* Craftsmanship & Engineering Story Section */}
      <section className="py-20 bg-[#090a0f] border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <span className="font-mono text-xs text-zinc-500 font-bold block mb-2">01. MATERIALS</span>
              <h3 className="text-lg font-bold text-white mb-3">Grade 5 Aerospace Titanium</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every laptop unibody and phone midframe undergoes high-precision CNC multi-axis milling, offering unmatched torsional rigidity while keeping overall weight below class averages.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <span className="font-mono text-xs text-zinc-500 font-bold block mb-2">02. SILICON</span>
              <h3 className="text-lg font-bold text-white mb-3">Neural Multi-Core Architecture</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Co-developed with premier semiconductor foundries on leading 3nm nodes. Delivers sustained clock speeds with intelligent workload offloading to dedicated low-power cores.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-zinc-950/70 border border-zinc-800">
              <span className="font-mono text-xs text-zinc-500 font-bold block mb-2">03. ACOUSTICS</span>
              <h3 className="text-lg font-bold text-white mb-3">Bespoke Graphene Transducers</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our handsfree earbuds and studio headphones utilize atomic-thin graphene membranes, eliminating cone flex distortion and maintaining 0.05% total harmonic distortion across all volumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PDP Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isCompared={selectedProduct ? comparedProducts.some((p) => p.id === selectedProduct.id) : false}
        onToggleCompare={handleToggleCompare}
      />

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveProduct={(id) => setComparedProducts((prev) => prev.filter((p) => p.id !== id))}
        onClearAll={() => setComparedProducts([])}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => {
          setIsCompareOpen(false);
          setSelectedProduct(p);
        }}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountPercentage={discountPercentage}
        onApplyPromoCode={handleApplyPromoCode}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discountAmount}
        total={finalTotal}
        onOrderSuccess={(order) => {
          // Clear cart on successful purchase
          setCartItems([]);
          showToast(`Order #${order.orderId} verified successfully!`);
        }}
      />

      {/* Clean Technical Brand Footer */}
      <Footer onSelectCategory={setActiveCategory} />

    </div>
  );
}
