import React from 'react';
import { ArrowRight, Laptop, Smartphone, Headphones, ShieldCheck, Zap, RotateCcw } from 'lucide-react';
import { CategoryFilter } from '../types';

interface HeroProps {
  onSelectCategory: (cat: CategoryFilter) => void;
  onExploreProduct: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory, onExploreProduct }) => {
  return (
    <section className="relative overflow-hidden bg-[#090a0f] pt-6 pb-16 lg:py-20 border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Clean Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-4 tracking-wide uppercase">
              <span>Next-Gen Hardware</span>
              <span aria-hidden="true">·</span>
              <span>2026 Collection</span>
              <span aria-hidden="true">·</span>
              <span>Lossless Acoustics</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12] mb-5 [text-wrap:balance]">
              Precision Compute, Mobile Optics & Acoustic Purity.
            </h1>

            {/* Body text */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-8">
              Engineered with aerospace titanium, 3nm neural silicon, and bespoke graphene drivers. Discover high-performance laptops, flagship smartphones, and true wireless handsfree earphones designed without compromise.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href="#catalog"
                onClick={() => onSelectCategory('all')}
                className="px-6 py-3 text-sm font-semibold text-zinc-950 bg-white rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg hover:shadow-white/10 active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => onExploreProduct('laptop-blade-16')}
                className="px-5 py-3 text-sm font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:text-white transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                View Flagship Blade 16
              </button>
            </div>

            {/* Fast Category Quick Selectors */}
            <div className="border-t border-zinc-800/80 pt-6">
              <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-3">
                Select Department
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => {
                    onSelectCategory('laptop');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 transition-colors text-left cursor-pointer group"
                >
                  <Laptop className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-semibold text-zinc-200 group-hover:text-white">Laptops</div>
                    <div className="text-[11px] text-zinc-500">From $1,399</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectCategory('phone');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 transition-colors text-left cursor-pointer group"
                >
                  <Smartphone className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-semibold text-zinc-200 group-hover:text-white">Phones</div>
                    <div className="text-[11px] text-zinc-500">From $699</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onSelectCategory('handfree');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850 transition-colors text-left cursor-pointer group"
                >
                  <Headphones className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                  <div className="truncate">
                    <div className="text-xs font-semibold text-zinc-200 group-hover:text-white">Handsfree</div>
                    <div className="text-[11px] text-zinc-500">From $59</div>
                  </div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: High-Fidelity Hero Showcase Media */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <img
                src="/src/assets/images/hero_flagship_tech_1791962093051.jpg"
                alt="Vela Hardware Flagship Trinity - Laptop, Smartphone, and Handsfree Earbuds"
                referrerPolicy="no-referrer"
                className="w-full h-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

              {/* Overlay Spec Strip */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 rounded-xl backdrop-blur-md bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-semibold text-white text-sm">The 2026 Ecosystem</div>
                  <div className="text-zinc-400 text-xs">One Unified Architecture · Seamless Fast Pairing</div>
                </div>
                <button
                  onClick={() => onExploreProduct('handfree-pods-pro')}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer shrink-0"
                >
                  Inspect Audio
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width Trust & Spec Bar below hero split */}
        <div className="mt-12 pt-8 border-t border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-zinc-400 text-xs">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-zinc-300 shrink-0" />
            <div>
              <span className="font-semibold text-zinc-200 block">Sub-10ms Ecosystem Sync</span>
              <span className="text-zinc-500">Instant peripheral handoff</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-zinc-300 shrink-0" />
            <div>
              <span className="font-semibold text-zinc-200 block">2-Year Global Hardware Warranty</span>
              <span className="text-zinc-500">Complimentary priority exchange</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="w-4 h-4 text-zinc-300 shrink-0" />
            <div>
              <span className="font-semibold text-zinc-200 block">30-Day Risk-Free Trial</span>
              <span className="text-zinc-500">Unconditional acoustic guarantee</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-zinc-400 shrink-0" />
            <div>
              <span className="font-semibold text-zinc-200 block">Cash on Delivery & Secure Pay</span>
              <span className="text-zinc-500">Inspected upon doorstep receipt</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
