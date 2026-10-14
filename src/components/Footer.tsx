import React from 'react';
import { CategoryFilter } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryFilter) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <span className="text-base font-bold text-white tracking-tight block">
              VELA HARDWARE
            </span>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Precision-crafted laptops, flagship smartphones, and reference acoustic handsfree equipment. Designed for professionals, creators, and discerning technologists worldwide.
            </p>
            <div className="text-[11px] text-zinc-500">
              Global Support · 2-Year Hardware Warranty · Zero Compromise
            </div>
          </div>

          {/* Laptops */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-200 mb-3">
              Laptops
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('laptop');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Blade 16 Pro (RTX 4080)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('laptop');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Air 14 Ultralight
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('laptop');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Studio 17 Max
                </button>
              </li>
            </ul>
          </div>

          {/* Smartphones */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-200 mb-3">
              Smartphones
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('phone');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Phone 1 Ultra (1-inch LYT)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('phone');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Phone Fold Flex
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('phone');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Phone 1 Neo
                </button>
              </li>
            </ul>
          </div>

          {/* Handsfree & Audio */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-200 mb-3">
              Handsfree Audio
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('handfree');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Pods Pro 48dB ANC
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('handfree');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Studio Master Wireless
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('handfree');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Pulse Active Neckband
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('handfree');
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Vela Clarity Type-C Earset
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Copyright & Legal Row */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © 2026 Vela Hardware Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Hardware Terms</span>
            <span>Security Compliance</span>
            <span>Recycling Program</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
