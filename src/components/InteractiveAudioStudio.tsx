import React, { useState } from 'react';
import { Volume2, VolumeX, Shield, Smartphone, Laptop, Headphones, Waves, Cpu, Eye, Zap } from 'lucide-react';

export const InteractiveAudioStudio: React.FC = () => {
  // Audio state
  const [ambientEnv, setAmbientEnv] = useState<'cabin' | 'subway' | 'cafe'>('cabin');
  const [ancMode, setAncMode] = useState<'off' | 'transparency' | 'anc'>('anc');
  const [isAudioSimulating, setIsAudioSimulating] = useState(true);

  // Phone display state
  const [refreshRate, setRefreshRate] = useState<60 | 120>(120);
  const [cameraZoom, setCameraZoom] = useState<'1x' | '3.5x' | '10x'>('1x');

  // Laptop power profile state
  const [powerProfile, setPowerProfile] = useState<'eco' | 'balanced' | 'turbo'>('turbo');

  // Active module tab
  const [activeModule, setActiveModule] = useState<'audio' | 'phone' | 'laptop'>('audio');

  const getDbReduction = () => {
    if (ancMode === 'off') return '0 dB (Open)';
    if (ancMode === 'transparency') return '-6 dB (Natural Speech Pass)';
    return '-48 dB (Acoustic Silence)';
  };

  return (
    <section id="audio-lab" className="py-20 bg-[#0c0d14] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">
            <span>Hardware Lab</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Real-Time Benchmarks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Experience the Core Hardware Innovations
          </h2>
          <p className="mt-3 text-base text-zinc-400 leading-relaxed">
            Test our hybrid active noise cancellation algorithms, examine the fluid 120Hz LTPO display difference, and inspect high-wattage laptop thermal profiles.
          </p>
        </div>

        {/* Module Switcher Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl w-fit mb-8">
          <button
            onClick={() => setActiveModule('audio')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModule === 'audio'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Headphones className="w-4 h-4 text-zinc-300" />
            <span>Handsfree ANC Chamber</span>
          </button>

          <button
            onClick={() => setActiveModule('phone')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModule === 'phone'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-zinc-300" />
            <span>Phone 120Hz & Optics</span>
          </button>

          <button
            onClick={() => setActiveModule('laptop')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeModule === 'laptop'
                ? 'bg-zinc-800 text-white shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4 text-zinc-300" />
            <span>Laptop Vapor Chamber</span>
          </button>
        </div>

        {/* Module 1: Handsfree ANC Simulator */}
        {activeModule === 'audio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual Acoustic Frequency Analyzer */}
            <div className="lg:col-span-7 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-500">Dual-Membrane Transducer</span>
                    <h3 className="text-lg font-bold text-white">Hybrid Active Noise Cancellation Waveform</h3>
                  </div>
                  <div className="font-mono text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
                    ATTENUATION: <span className="text-emerald-400 font-bold">{getDbReduction()}</span>
                  </div>
                </div>

                {/* Simulated Audio Spectrum Analyzer */}
                <div className="h-44 sm:h-52 w-full bg-zinc-900/60 rounded-xl border border-zinc-800/80 p-4 flex items-end justify-between gap-1 sm:gap-1.5 overflow-hidden relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-rows-4 pointer-events-none opacity-20">
                    <div className="border-b border-zinc-500" />
                    <div className="border-b border-zinc-500" />
                    <div className="border-b border-zinc-500" />
                  </div>

                  {/* Frequency bars (simulated dynamic spectrum) */}
                  {[
                    40, 65, 80, 95, 88, 72, 60, 52, 48, 62, 78, 85, 92, 70, 58, 45,
                    55, 68, 82, 75, 64, 50, 42, 38, 45, 52, 60, 54, 46, 35, 28, 20
                  ].map((baseHeight, idx) => {
                    let adjustedHeight = baseHeight;
                    if (ancMode === 'anc') {
                      adjustedHeight = Math.max(8, baseHeight * 0.18);
                    } else if (ancMode === 'transparency') {
                      adjustedHeight = baseHeight * 0.65;
                    }

                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-zinc-700 to-zinc-300 rounded-t transition-all duration-300"
                        style={{
                          height: isAudioSimulating ? `${adjustedHeight}%` : '6%',
                          opacity: ancMode === 'anc' ? 0.45 : 0.9,
                        }}
                      />
                    );
                  })}
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mt-2 px-1">
                  <span>20 Hz (Sub-Bass)</span>
                  <span>1 kHz (Vocals & Engine)</span>
                  <span>20 kHz (Cymbals & Air)</span>
                </div>
              </div>

              {/* Real-time description */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span>
                  {ancMode === 'anc' && 'Six outward and inward MEMS microphones generate anti-phase waves in real time.'}
                  {ancMode === 'transparency' && 'Natural low-latency pass-through feeds human speech directly into the ear canal.'}
                  {ancMode === 'off' && 'Passive silicone seal isolates high frequencies; external low frequencies pass through.'}
                </span>
              </div>
            </div>

            {/* Right: Controls & Presets */}
            <div className="lg:col-span-5 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-4">
                  01. Acoustic Isolation Mode
                </h4>
                <div className="space-y-2.5 mb-6">
                  <button
                    onClick={() => setAncMode('anc')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      ancMode === 'anc'
                        ? 'bg-zinc-800/90 border-white text-white shadow-md'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Hybrid ANC (Full 48dB)</div>
                      <div className="text-[11px] text-zinc-400">Maximum attenuation for flights & transit</div>
                    </div>
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </button>

                  <button
                    onClick={() => setAncMode('transparency')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      ancMode === 'transparency'
                        ? 'bg-zinc-800/90 border-white text-white shadow-md'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Natural Transparency</div>
                      <div className="text-[11px] text-zinc-400">Stay aware of street traffic & airport announcements</div>
                    </div>
                    <Volume2 className="w-4 h-4 text-zinc-300" />
                  </button>

                  <button
                    onClick={() => setAncMode('off')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      ancMode === 'off'
                        ? 'bg-zinc-800/90 border-white text-white shadow-md'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">Passive Physical Seal</div>
                      <div className="text-[11px] text-zinc-400">Standard acoustic foam & silicone dampening</div>
                    </div>
                    <VolumeX className="w-4 h-4 text-zinc-500" />
                  </button>
                </div>

                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3">
                  02. Simulated Ambient Environment
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setAmbientEnv('cabin')}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                      ambientEnv === 'cabin'
                        ? 'bg-zinc-800 border-zinc-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Jet Cabin (82 dB)
                  </button>
                  <button
                    onClick={() => setAmbientEnv('subway')}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                      ambientEnv === 'subway'
                        ? 'bg-zinc-800 border-zinc-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Subway Rail (90 dB)
                  </button>
                  <button
                    onClick={() => setAmbientEnv('cafe')}
                    className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                      ambientEnv === 'cafe'
                        ? 'bg-zinc-800 border-zinc-500 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    Busy Cafe (72 dB)
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <a
                  href="#catalog"
                  className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Browse Vela Pods Pro & Handsfree Lineup
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Module 2: Smartphone 120Hz & Camera Optics */}
        {activeModule === 'phone' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual Viewport */}
            <div className="lg:col-span-7 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-500">LTPO 4.0 Dynamic AMOLED</span>
                    <h3 className="text-lg font-bold text-white">High-Refresh Kinetic Smoothness & Optics</h3>
                  </div>
                  <div className="font-mono text-xs text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
                    REFRESH: <span className="text-emerald-400 font-bold">{refreshRate} Hz</span>
                  </div>
                </div>

                {/* Simulated Screen with smooth animation */}
                <div className="h-56 w-full bg-zinc-900 rounded-xl border border-zinc-800 p-4 relative overflow-hidden flex flex-col justify-center items-center">
                  {/* Kinetic Bouncing Target */}
                  <div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-zinc-600 to-zinc-200 shadow-xl flex items-center justify-center text-zinc-950 font-mono font-bold text-xs"
                    style={{
                      animation: `bounceSmooth ${refreshRate === 120 ? '1.4s' : '1.4s'} infinite alternate ease-in-out`,
                      filter: refreshRate === 60 ? 'blur(0.8px)' : 'none',
                    }}
                  >
                    {refreshRate} FPS
                  </div>

                  {/* Horizontal Motion Ticker */}
                  <div className="absolute bottom-4 inset-x-4 overflow-hidden border-t border-zinc-800 pt-2">
                    <div
                      className="text-xs font-mono whitespace-nowrap text-zinc-400"
                      style={{
                        animation: `tickerScroll ${refreshRate === 120 ? '5s' : '5s'} linear infinite`,
                      }}
                    >
                      ★ 1-120Hz LTPO 4.0 DYNAMIC ADAPTIVE REFRESH ★ ZERO TEARING ★ 4500 NITS OUTDOOR PEAK ★ ZERO FLICKER PWM
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400 flex items-center justify-between">
                <span>
                  {refreshRate === 120
                    ? '120Hz provides microsecond responsiveness during scrolling, high-frame gaming, and UI transitions.'
                    : '60Hz drops half the intermediate frames, creating perceptible micro-stutter when tracking text.'}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3">
                  01. Refresh Rate Toggle
                </h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setRefreshRate(60)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      refreshRate === 60
                        ? 'bg-zinc-800 border-white text-white font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="text-base font-mono">60 Hz</div>
                    <div className="text-[11px] text-zinc-400 font-normal">Legacy Standard</div>
                  </button>
                  <button
                    onClick={() => setRefreshRate(120)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      refreshRate === 120
                        ? 'bg-zinc-800 border-white text-white font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="text-base font-mono text-emerald-400">120 Hz LTPO</div>
                    <div className="text-[11px] text-zinc-400 font-normal">Fluid Flagship</div>
                  </button>
                </div>

                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3">
                  02. 1-Inch Sensor Periscope Zoom
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setCameraZoom('1x')}
                    className={`p-3 rounded-lg border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                      cameraZoom === '1x'
                        ? 'bg-zinc-800 border-white text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    1x (24mm f/1.6)
                  </button>
                  <button
                    onClick={() => setCameraZoom('3.5x')}
                    className={`p-3 rounded-lg border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                      cameraZoom === '3.5x'
                        ? 'bg-zinc-800 border-white text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    3.5x (85mm Pro)
                  </button>
                  <button
                    onClick={() => setCameraZoom('10x')}
                    className={`p-3 rounded-lg border text-xs font-mono font-bold text-center transition-all cursor-pointer ${
                      cameraZoom === '10x'
                        ? 'bg-zinc-800 border-white text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    10x (Periscope)
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <a
                  href="#catalog"
                  className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Vela Phone 1 Ultra
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Module 3: Laptop Thermal & Performance Chamber */}
        {activeModule === 'laptop' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visualizer */}
            <div className="lg:col-span-7 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase text-zinc-500">Dual Vapor Chamber Liquid Cooling</span>
                    <h3 className="text-lg font-bold text-white">Sustained Clock Rate & Thermal Dissipation</h3>
                  </div>
                  <div className="font-mono text-xs text-white bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
                    TGP TARGET: <span className="text-emerald-400 font-bold">{powerProfile === 'turbo' ? '175 Watts' : powerProfile === 'balanced' ? '115 Watts' : '45 Watts'}</span>
                  </div>
                </div>

                {/* Performance Matrix */}
                <div className="grid grid-cols-3 gap-3 my-6">
                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <span className="text-xs text-zinc-500 font-mono block">CPU CLOCK</span>
                    <span className="text-xl font-mono font-bold text-white tabular-nums">
                      {powerProfile === 'turbo' ? '5.10 GHz' : powerProfile === 'balanced' ? '4.20 GHz' : '2.80 GHz'}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-1">Boost frequency</span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <span className="text-xs text-zinc-500 font-mono block">ACOUSTICS</span>
                    <span className="text-xl font-mono font-bold text-white tabular-nums">
                      {powerProfile === 'turbo' ? '39.2 dBA' : powerProfile === 'balanced' ? '28.4 dBA' : '0.0 dBA'}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-1">
                      {powerProfile === 'eco' ? 'Fanless Silent' : 'Vapor Chamber'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <span className="text-xs text-zinc-500 font-mono block">BATTERY LIFE</span>
                    <span className="text-xl font-mono font-bold text-emerald-400 tabular-nums">
                      {powerProfile === 'turbo' ? '~6.5 Hrs' : powerProfile === 'balanced' ? '~11.0 Hrs' : '~21.5 Hrs'}
                    </span>
                    <span className="text-[10px] text-zinc-400 block mt-1">99.9 Wh pack</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
                Aerospace-grade thermal paste and micro-sintered copper heatpipes guarantee zero thermal throttling during multi-hour 3D rendering.
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3">
                  Select Performance Profile
                </h4>
                <div className="space-y-2.5 mb-6">
                  <button
                    onClick={() => setPowerProfile('turbo')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      powerProfile === 'turbo'
                        ? 'bg-zinc-800 border-white text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Full Boost Turbo (175W)</div>
                      <div className="text-[11px] text-zinc-400">Unrestricted GPU power for 4K rendering & Unreal 5</div>
                    </div>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </button>

                  <button
                    onClick={() => setPowerProfile('balanced')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      powerProfile === 'balanced'
                        ? 'bg-zinc-800 border-white text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">Studio Balanced (115W)</div>
                      <div className="text-[11px] text-zinc-400">Whisper-quiet acoustics with sustained multi-core speed</div>
                    </div>
                    <Cpu className="w-4 h-4 text-blue-400" />
                  </button>

                  <button
                    onClick={() => setPowerProfile('eco')}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      powerProfile === 'eco'
                        ? 'bg-zinc-800 border-white text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">All-Day Autonomous Eco</div>
                      <div className="text-[11px] text-zinc-400">Completely fanless operation with 21+ hours battery</div>
                    </div>
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <a
                  href="#catalog"
                  className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Inspect Vela Blade 16 & Air 14
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
