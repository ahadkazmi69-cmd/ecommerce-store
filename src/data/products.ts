export interface ProductSpec {
  [key: string]: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'laptop' | 'phone' | 'handfree';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
  colors: { name: string; hex: string; class: string }[];
  keyHighlights: string[];
  specs: ProductSpec;
  description: string;
  audioFeatures?: {
    ancLevel: string;
    driverSize: string;
    batteryLife: string;
    latencyMs: number;
  };
  phoneFeatures?: {
    screenHz: number;
    sensorMp: number;
    zoomOptic: string;
    batteryMah: number;
  };
  laptopFeatures?: {
    cpu: string;
    gpu: string;
    ram: string;
    screenRes: string;
    batteryHours: number;
  };
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  // LAPTOPS
  {
    id: 'laptop-blade-16',
    name: 'Vela Blade 16 Pro',
    subtitle: 'Aerospace-Grade Titanium Ultra-Performance Workstation',
    category: 'laptop',
    categoryLabel: 'Laptop',
    price: 2499,
    originalPrice: 2699,
    rating: 4.9,
    reviewCount: 142,
    image: '/src/assets/images/laptop_flagship_pro_1791962094303.jpg',
    badge: 'Flagship Performer',
    inStock: true,
    colors: [
      { name: 'Titanium Silver', hex: '#d1d5db', class: 'bg-zinc-300' },
      { name: 'Basalt Charcoal', hex: '#27272a', class: 'bg-zinc-800' },
    ],
    keyHighlights: [
      'Intel Core Ultra 9 185H / 16 Cores with Neural Engine',
      'NVIDIA GeForce RTX 4080 (16GB GDDR6, 175W TGP)',
      '16" 3.2K (3200x2000) Mini-LED, 120Hz, 1000 nits Peak',
      'Dual Vapor Chamber cooling with liquid metal thermal interface'
    ],
    specs: {
      'Processor': 'Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1 GHz)',
      'Graphics': 'NVIDIA GeForce RTX 4080 Laptop GPU 16GB GDDR6',
      'Memory': '32GB LPDDR5X 7467 MHz Dual-Channel',
      'Storage': '1TB PCIe 4.0 NVMe M.2 SSD (expandable slot)',
      'Display': '16.0" 3.2K Mini-LED, 120Hz, 100% DCI-P3, HDR 1000',
      'Battery & Power': '99.9 Wh Lithium-Polymer, 240W GaN Fast Charger (0-80% in 35m)',
      'Ports': '2x Thunderbolt 4, 2x USB-A 3.2, 1x HDMI 2.1, UHS-II SD Card, 3.5mm Combo',
      'Chassis & Weight': 'CNC Milled Aerospace Aluminum 6000 series, 1.95 kg (4.3 lbs)',
      'Audio & Cam': 'Quad Dolby Atmos speakers + 1080p IR Windows Hello webcam'
    },
    laptopFeatures: {
      cpu: 'Core Ultra 9',
      gpu: 'RTX 4080',
      ram: '32GB LPDDR5X',
      screenRes: '3.2K 120Hz Mini-LED',
      batteryHours: 14
    },
    description: 'Engineered for uncompromising creators, engineers, and competitive gamers. The Vela Blade 16 Pro marries high-efficiency thermal architecture with a calibrated 3.2K Mini-LED panel for flawless color precision and sustained top-tier clock speeds.',
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2026-09-12',
        title: 'Unbelievable thermals and stunning display',
        comment: 'Rendered a 4K 10-bit project in Premiere in half the time of my previous rig. The keyboard deck stays cool under load.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        rating: 5,
        date: '2026-08-28',
        title: 'The display alone justifies the price',
        comment: 'Black levels on this Mini-LED panel rival OLED without any fear of burn-in. Peak brightness outdoors is incredible.',
        verified: true
      }
    ]
  },
  {
    id: 'laptop-air-14',
    name: 'Vela Air 14 Ultralight',
    subtitle: 'Whisper-Quiet Carbon Fiber Mobility Companion',
    category: 'laptop',
    categoryLabel: 'Laptop',
    price: 1399,
    originalPrice: 1499,
    rating: 4.8,
    reviewCount: 98,
    image: '/src/assets/images/laptop_flagship_pro_1791962094303.jpg',
    badge: 'Under 1 Kilogram',
    inStock: true,
    colors: [
      { name: 'Frosted Silver', hex: '#e2e8f0', class: 'bg-slate-200' },
      { name: 'Midnight Onyx', hex: '#0f172a', class: 'bg-slate-900' }
    ],
    keyHighlights: [
      'Ultra-dense Magnesium-Carbon chassis weighing just 0.98 kg',
      '14.0" 2.8K 90Hz PureOLED with 100% sRGB & DCI-P3',
      'Up to 21 hours battery life with ultra-efficient 3nm architecture',
      'Silent passive-assisted zero-fan acoustic mode under everyday loads'
    ],
    specs: {
      'Processor': 'Vela Silicon V2 Ultra / 12-core ARM Architecture',
      'Graphics': 'Integrated 16-Core Neural GPU',
      'Memory': '16GB Unified High-Bandwidth Memory',
      'Storage': '512GB High-Speed NVMe Gen4 SSD',
      'Display': '14.0" 2.8K (2880x1800) OLED, 90Hz, 600 nits HDR',
      'Battery & Power': '72 Wh High-Density Battery, 65W Pocket GaN Charger',
      'Ports': '3x USB4 Type-C (DisplayPort, PowerDelivery), 3.5mm Audio',
      'Chassis & Weight': 'Forged Carbon Fiber & Magnesium Alloy, 0.98 kg',
      'Audio & Cam': 'Studio dual-membrane stereo speakers, 1080p f/2.0 webcam'
    },
    laptopFeatures: {
      cpu: 'Vela Silicon V2',
      gpu: '16-Core Neural GPU',
      ram: '16GB Unified',
      screenRes: '2.8K 90Hz PureOLED',
      batteryHours: 21
    },
    description: 'The featherweight champion of modern computing. Built for travelers, scholars, and founders who demand full-day autonomy and zero luggage weight.',
    reviews: [
      {
        id: 'rev-3',
        author: 'Sarah Chen',
        rating: 5,
        date: '2026-09-02',
        title: 'I never pack my charger for day trips',
        comment: 'Worked an entire 11-hour flight from Tokyo to San Francisco with Spotify running and still landed with 34% battery.',
        verified: true
      }
    ]
  },
  {
    id: 'laptop-studio-17',
    name: 'Vela Studio 17 Max',
    subtitle: 'Color-Graded Reference Canvas for Creative Directors',
    category: 'laptop',
    categoryLabel: 'Laptop',
    price: 3199,
    originalPrice: 3499,
    rating: 5.0,
    reviewCount: 64,
    image: '/src/assets/images/laptop_flagship_pro_1791962094303.jpg',
    badge: 'Creator Reference',
    inStock: true,
    colors: [
      { name: 'Space Gray', hex: '#4b5563', class: 'bg-zinc-600' },
      { name: 'Anodized Silver', hex: '#d4d4d8', class: 'bg-zinc-300' }
    ],
    keyHighlights: [
      '17.3" TrueColor 4K 144Hz calibrated Delta-E < 0.8',
      'NVIDIA GeForce RTX 4090 (16GB GDDR6, Studio Driver Certified)',
      '64GB DDR5 5600MHz RAM + 2TB NVMe Dual-RAID support',
      'Integrated haptic precision creative dial on keyboard deck'
    ],
    specs: {
      'Processor': 'Intel Core i9-14900HX (24 Cores, 32 Threads)',
      'Graphics': 'NVIDIA GeForce RTX 4090 Laptop 16GB Studio Edition',
      'Memory': '64GB Dual-Channel DDR5 (up to 128GB user upgradable)',
      'Storage': '2TB M.2 PCIe 4.0 NVMe SSD',
      'Display': '17.3" 4K UHD (3840x2160) 144Hz IPS Pro calibrated',
      'Battery & Power': '99.9 Wh Lithium-Polymer, 280W Slim Adapter',
      'Ports': '2x Thunderbolt 4, 3x USB 3.2 Gen 2, Full-size SD Express 7.0, HDMI 2.1, 2.5G Ethernet',
      'Chassis & Weight': 'Unibody Aviation Aluminum, 2.45 kg'
    },
    laptopFeatures: {
      cpu: 'Core i9-14900HX',
      gpu: 'RTX 4090 Studio',
      ram: '64GB DDR5',
      screenRes: '17.3" 4K 144Hz Delta-E<0.8',
      batteryHours: 10
    },
    description: 'Designed in collaboration with world-class colorists and 3D animators. Calibrated out of the box with individual spectrophotometer certificates.',
    reviews: [
      {
        id: 'rev-4',
        author: 'David O’Connor',
        rating: 5,
        date: '2026-07-19',
        title: 'Desktop replacement in every sense',
        comment: 'Handles 8K RED RAW playback in DaVinci Resolve smoothly with real-time color grades without dropping frames.',
        verified: true
      }
    ]
  },

  // MOBILE PHONES
  {
    id: 'phone-ultra-1',
    name: 'Vela Phone 1 Ultra',
    subtitle: 'Periscope 1-Inch Sensor & Pro-Grade Edge-to-Edge Display',
    category: 'phone',
    categoryLabel: 'Smartphone',
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 310,
    image: '/src/assets/images/phone_flagship_ultra_1791962094031.jpg',
    badge: 'Best Camera 2026',
    inStock: true,
    colors: [
      { name: 'Obsidian Black', hex: '#18181b', class: 'bg-zinc-900' },
      { name: 'Ceramic Titanium', hex: '#71717a', class: 'bg-zinc-500' },
      { name: 'Arctic White', hex: '#f8fafc', class: 'bg-slate-100' }
    ],
    keyHighlights: [
      '50MP 1-inch Sony LYT-900 primary sensor with variable aperture f/1.4 - f/4.0',
      '6.82" QHD+ LTPO 4.0 AMOLED with 1-120Hz adaptive refresh & 4500 nits peak',
      'Qualcomm Snapdragon 8 Elite 3nm mobile platform with Vela AI neural engine',
      '5500 mAh Silicon-Carbon anode battery with 100W wired & 50W wireless flash charge'
    ],
    specs: {
      'Chipset': 'Snapdragon 8 Elite (3nm, Oryon CPU, Adreno 830 GPU)',
      'Display': '6.82" Curved LTPO AMOLED, 3168x1440, 1-120Hz, Dolby Vision, Gorilla Glass Armor',
      'Rear Camera': '50MP 1" Main (OIS, f/1.6) + 50MP Ultra-Wide (122°) + 50MP 5x Periscope Telephoto (120x Digital)',
      'Front Camera': '32MP f/2.2 with 4K60 HDR video recording',
      'Battery & Charging': '5500 mAh, 100W HyperWired (0-100% in 22m), 50W Qi2 Wireless',
      'Storage & RAM': '16GB LPDDR5X + 512GB UFS 4.0',
      'Build & Protection': 'Grade 5 Titanium frame, IP68 dust/water resistant (up to 2m for 30m)',
      'Connectivity': '5G Sub-6/mmWave, Wi-Fi 7, Bluetooth 5.4, Ultra-Wideband (UWB)',
      'Weight': '218 grams'
    },
    phoneFeatures: {
      screenHz: 120,
      sensorMp: 50,
      zoomOptic: '5x Optical / 120x Hybrid',
      batteryMah: 5500
    },
    description: 'The pinnacle of mobile optical imaging. Featuring a physical 1-inch sensor co-developed with legendary glassmakers, capture genuine optical depth of field with zero digital artificial sharpness.',
    reviews: [
      {
        id: 'rev-5',
        author: 'Hassan K.',
        rating: 5,
        date: '2026-09-29',
        title: 'Replaced my mirrorless camera on hikes',
        comment: 'Night shots have natural noise grain instead of over-processed muddy watercolor textures. Dynamic range is peerless.',
        verified: true
      },
      {
        id: 'rev-6',
        author: 'Julian Thorne',
        rating: 5,
        date: '2026-09-14',
        title: 'Battery lasts 2 full days',
        comment: 'Silicon carbon battery is no gimmick. I consistently get 8.5 hours screen-on-time with 120Hz and 5G active.',
        verified: true
      }
    ]
  },
  {
    id: 'phone-fold-1',
    name: 'Vela Phone Fold Flex',
    subtitle: 'Zero-Crease Titanium Hinge with Seamless Tablet Real Estate',
    category: 'phone',
    categoryLabel: 'Smartphone',
    price: 1799,
    originalPrice: 1999,
    rating: 4.8,
    reviewCount: 88,
    image: '/src/assets/images/phone_flagship_ultra_1791962094031.jpg',
    badge: 'Dual Screen Foldable',
    inStock: true,
    colors: [
      { name: 'Onyx Slate', hex: '#1e293b', class: 'bg-slate-800' },
      { name: 'Champagne Gold', hex: '#e2d4b7', class: 'bg-amber-100' }
    ],
    keyHighlights: [
      '7.92" Foldable LTPO OLED (2344x2156, 120Hz) + 6.43" Outer OLED Display',
      'Patented Dual-Helix Titanium teardrop hinge with zero visible crease',
      'Only 9.2mm folded thickness and 4.3mm unfolded profile',
      'Three-app split view multitasking with stylus pen compatibility'
    ],
    specs: {
      'Chipset': 'Snapdragon 8 Elite Mobile Platform',
      'Inner Display': '7.92" LTPO Foldable OLED, 1-120Hz, 2800 nits, HDR10+',
      'Outer Display': '6.43" FHD+ 120Hz OLED, 20:9 ratio, Nanocrystal Glass',
      'Cameras': '50MP OIS Main + 50MP Ultra-Wide + 50MP 3.5x Portrait Telephoto',
      'Battery': '5000 mAh Dual-Cell, 66W SuperCharge, 30W Wireless',
      'Memory': '16GB RAM + 512GB Storage',
      'Weight': '229 grams (lighter than standard ultra bricks)',
      'Durability': 'Titanium alloy hinge rated for 500,000 folds, IPX8 water protection'
    },
    phoneFeatures: {
      screenHz: 120,
      sensorMp: 50,
      zoomOptic: '3.5x Optical',
      batteryMah: 5000
    },
    description: 'Transform from a comfortable single-handed smartphone to an expansive 8-inch workstation. The zero-crease display allows seamless document markup, multi-window trading, and immersive cinematic viewing.',
    reviews: [
      {
        id: 'rev-7',
        author: 'Zoe Martinez',
        rating: 5,
        date: '2026-08-11',
        title: 'The hinge is pure magic',
        comment: 'You literally cannot feel or see the fold when reading articles or watching videos. Incredible engineering achievement.',
        verified: true
      }
    ]
  },
  {
    id: 'phone-neo-1',
    name: 'Vela Phone 1 Neo',
    subtitle: 'Pure Flat Aesthetics with Flagship Optics & Clean Zero-Bloat OS',
    category: 'phone',
    categoryLabel: 'Smartphone',
    price: 699,
    originalPrice: 799,
    rating: 4.7,
    reviewCount: 175,
    image: '/src/assets/images/phone_flagship_ultra_1791962094031.jpg',
    badge: 'Exceptional Value',
    inStock: true,
    colors: [
      { name: 'Matte Slate', hex: '#334155', class: 'bg-slate-700' },
      { name: 'Pure White', hex: '#f1f5f9', class: 'bg-slate-100' },
      { name: 'Sage Green', hex: '#84a98c', class: 'bg-emerald-700' }
    ],
    keyHighlights: [
      '6.4" Flat 1.5K 120Hz AMOLED with symmetrical 1.4mm razor bezels',
      '50MP Sony IMX890 sensor with optical image stabilization and natural color tuning',
      'Stock Clean OS: Guaranteed 5 years of security updates and zero bloatware',
      'Fast 80W wired charger and case included in the sustainable box'
    ],
    specs: {
      'Chipset': 'MediaTek Dimensity 9300+ (4nm TSMC Flagship SoC)',
      'Display': '6.4" Flat AMOLED, 2772x1240, 120Hz, 3000 nits peak',
      'Rear Camera': '50MP Main (f/1.88, OIS) + 50MP Ultra-Wide Macro',
      'Front Camera': '32MP punch-hole selfie with 4K recording',
      'Battery': '5000 mAh battery with 80W FlashCharge',
      'Memory': '12GB RAM + 256GB High-Speed Storage',
      'Build': 'Recycled aluminum frame with frosted Gorilla Glass back, IP68 rated',
      'Weight': '182 grams'
    },
    phoneFeatures: {
      screenHz: 120,
      sensorMp: 50,
      zoomOptic: '2x In-Sensor Lossless',
      batteryMah: 5000
    },
    description: 'Everything you need in a modern flagship with zero gimmicks. Perfect tactile grip in a compact form factor with blazing speed and instant camera shutter response.',
    reviews: [
      {
        id: 'rev-8',
        author: 'Liam Davies',
        rating: 5,
        date: '2026-09-08',
        title: 'Finally a normal-sized flagship phone',
        comment: 'Fits comfortably in one hand and in pockets. The flat screen means no accidental edge touches.',
        verified: true
      }
    ]
  },

  // HANDFREE & AUDIO
  {
    id: 'handfree-pods-pro',
    name: 'Vela Pods Pro ANC',
    subtitle: 'Bespoke 11mm Graphene Drivers with 48dB Hybrid Soundproofing',
    category: 'handfree',
    categoryLabel: 'Handsfree Earphones',
    price: 249,
    originalPrice: 289,
    rating: 4.9,
    reviewCount: 420,
    image: '/src/assets/images/handfree_wireless_anc_1791962094521.jpg',
    badge: 'Editor’s Choice',
    inStock: true,
    colors: [
      { name: 'Matte Basalt', hex: '#18181b', class: 'bg-zinc-900' },
      { name: 'Brushed Silver', hex: '#d4d4d8', class: 'bg-zinc-300' }
    ],
    keyHighlights: [
      'Active Noise Cancellation up to 48dB across 4000Hz broad frequency band',
      'Lossless Hi-Res Wireless with LDAC and LC3 codec support',
      '38 hours total playback with magnetic fast-charge aerospace case',
      'Six-microphone beamforming array with bone-conduction voice sensor'
    ],
    specs: {
      'Driver Size': '11mm Graphene Dynamic Driver + Balanced Armature Tweeter',
      'Noise Cancellation': 'Active Hybrid ANC (up to 48dB) + Adaptive Smart Pass-Through',
      'Microphone Array': '6 Beamforming MEMS Mics + Bone Conduction Voice Pick-Up (VPU)',
      'Battery Life': '9 hours per charge (ANC Off), 7 hours (ANC On), 38 hours with Case',
      'Charging': 'USB-C + Qi Wireless charging (10 min charge = 3 hours playback)',
      'Connectivity': 'Bluetooth 5.4, Multipoint dual-device connection, Google Fast Pair',
      'Latency': 'Ultra-low 35ms gaming audio mode',
      'Water Resistance': 'IP54 earbuds and IPX4 charging case',
      'Weight': '4.8g per earbud / 42g case'
    },
    audioFeatures: {
      ancLevel: '48dB Hybrid ANC',
      driverSize: '11mm Graphene + Armature',
      batteryLife: '38h Total (7h ANC)',
      latencyMs: 35
    },
    description: 'Precision acoustics designed to silence commute rumblings and office chatter while reproducing sub-bass textures and crystalline vocals with studio truth.',
    reviews: [
      {
        id: 'rev-9',
        author: 'Claire Dufresne',
        rating: 5,
        date: '2026-10-01',
        title: 'Microphone clarity during windy walks is sensational',
        comment: 'Clients on Zoom couldn’t hear city traffic while I was walking downtown. ANC cuts airplane engine hum instantly.',
        verified: true
      },
      {
        id: 'rev-10',
        author: 'Arjun Patel',
        rating: 5,
        date: '2026-09-19',
        title: 'The acoustic profile is perfectly balanced',
        comment: 'Not that bass-heavy muddy mess typical of commercial earbuds. Rich sub-bass with sparkling instrument separation.',
        verified: true
      }
    ]
  },
  {
    id: 'handfree-studio-master',
    name: 'Vela Studio Master Wireless',
    subtitle: 'Over-Ear Reference Lossless Headphones with Dual DAC System',
    category: 'handfree',
    categoryLabel: 'Handsfree Headset',
    price: 449,
    originalPrice: 499,
    rating: 5.0,
    reviewCount: 168,
    image: '/src/assets/images/headphone_studio_pro_1791962094227.jpg',
    badge: 'Audiophile Reference',
    inStock: true,
    colors: [
      { name: 'Anodized Gunmetal', hex: '#374151', class: 'bg-zinc-700' },
      { name: 'Cast Steel Black', hex: '#111827', class: 'bg-zinc-900' }
    ],
    keyHighlights: [
      '45mm Custom Planar Magnetic Drivers with near-zero 0.05% harmonic distortion',
      'Direct Lossless 24-bit / 96kHz streaming over USB-C or aptX Lossless Bluetooth',
      '60 hours continuous playtime on a single charge with memory velour pads',
      'Physical tactile volume wheel and dedicated transparency slider'
    ],
    specs: {
      'Transducer': '45mm Planar Magnetic with Neodymium N52 magnet array',
      'Frequency Response': '5 Hz - 45,000 Hz',
      'Active Noise Cancellation': '4-stage adaptive ambient control with anti-wind isolation',
      'Battery Endurance': '60 hours (ANC On), 75 hours (ANC Off)',
      'Wired Modes': 'Lossless USB-C Digital Audio (24-bit/96kHz) + 3.5mm analog input',
      'Microphones': 'Broadcast-grade 4-mic beamforming array with noise cancellation',
      'Weight': '298 grams with ventilated lambskin and memory foam headband'
    },
    audioFeatures: {
      ancLevel: 'Adaptive Studio ANC',
      driverSize: '45mm Planar Magnetic',
      batteryLife: '60h Playtime',
      latencyMs: 25
    },
    description: 'Created for sound engineers, producers, and discerning audiophiles who want planar magnetic transparency without tethering to a bulky desktop amplifier.',
    reviews: [
      {
        id: 'rev-11',
        author: 'Felix Baumgartner',
        rating: 5,
        date: '2026-09-22',
        title: 'Planar sound in a wireless headphone',
        comment: 'The soundstage width and transient response rival wired open-backs. The USB-C wired mode transforms them into a mastering monitor.',
        verified: true
      }
    ]
  },
  {
    id: 'handfree-pulse-neckband',
    name: 'Vela Pulse Active Neckband',
    subtitle: 'Magnetic Lock Handsfree with Kevlar Core & IPX7 Sports Durability',
    category: 'handfree',
    categoryLabel: 'Handsfree Earphones',
    price: 119,
    originalPrice: 149,
    rating: 4.8,
    reviewCount: 215,
    image: '/src/assets/images/handfree_wireless_anc_1791962094521.jpg',
    badge: 'Sports & Commute',
    inStock: true,
    colors: [
      { name: 'Graphite Black', hex: '#18181b', class: 'bg-zinc-900' },
      { name: 'Neon Cobalt', hex: '#1d4ed8', class: 'bg-blue-700' }
    ],
    keyHighlights: [
      'Titanium memory alloy neckband wrapped in skin-friendly liquid silicone',
      'Magnetic earbud auto-pause / auto-resume smart clasp sensors',
      '32-hour endurance with 10-minute Quick-Burst charging giving 12 hours',
      'IPX7 certified waterproof against sweat, rain, and gym workouts'
    ],
    specs: {
      'Driver': '12.4mm Titanium-Coated Polyurethane Diaphragm',
      'Battery': '32 hours playback, 10-min USB-C quick-charge for 12 hours',
      'Microphone': 'Dual AI Environmental Noise Cancellation mics for wind reduction',
      'Durability': 'IPX7 Water & Sweatproof rating',
      'Controls': 'Textured tactile buttons for volume, track skip, voice assistant trigger',
      'Bluetooth': 'v5.3 with Fast Pair & instant magnetic connection',
      'Weight': '28.5 grams'
    },
    audioFeatures: {
      ancLevel: 'AI Environmental Noise Reduction',
      driverSize: '12.4mm Titanium Diaphragm',
      batteryLife: '32h Endurance',
      latencyMs: 40
    },
    description: 'The reliable everyday companion for marathon runners, cycling commutes, and marathon phone calls. Magnetic earbuds snap securely together around your neck when not in use.',
    reviews: [
      {
        id: 'rev-12',
        author: 'Tariq Al-Mansoor',
        rating: 5,
        date: '2026-09-05',
        title: 'Never lose another earbud',
        comment: 'I run half-marathons and TWS earbuds always slip out. This stays completely stable and the battery lasts for weeks of training.',
        verified: true
      }
    ]
  },
  {
    id: 'handfree-clarity-typec',
    name: 'Vela Clarity Type-C Earset',
    subtitle: 'Lossless 32-bit DAC In-Ear Handsfree with Quad MEMS Boom',
    category: 'handfree',
    categoryLabel: 'Handsfree Earphones',
    price: 59,
    originalPrice: 79,
    rating: 4.7,
    reviewCount: 130,
    image: '/src/assets/images/handfree_wireless_anc_1791962094521.jpg',
    badge: 'Zero-Latency Wired',
    inStock: true,
    colors: [
      { name: 'Dark Gunmetal', hex: '#374151', class: 'bg-zinc-700' },
      { name: 'Silver Matte', hex: '#e5e7eb', class: 'bg-zinc-200' }
    ],
    keyHighlights: [
      'Integrated 32-bit / 384kHz Hi-Res hardware DAC inside USB-C connector',
      'Direct plug-and-play compatibility with Vela Laptops, Smartphones, and tablets',
      'Braided Kevlar reinforced tangle-free cable with inline tactile 3-button remote',
      'Zero battery anxiety and zero millisecond latency for competitive gaming & calls'
    ],
    specs: {
      'DAC': 'Integrated 32-bit / 384kHz Cirrus Logic Hi-Fi DAC',
      'Drivers': '10mm Beryllium-Plated dynamic units',
      'Cable': '1.25m High-Purity OFC Braided Copper with Kevlar Core',
      'Mic': 'Studio-grade omnidirectional condenser inline microphone with hardware mute',
      'Connection': 'USB Type-C (Digital Audio Class 2.0)',
      'Weight': '16 grams'
    },
    audioFeatures: {
      ancLevel: 'Passive Acoustic Seal (-26dB)',
      driverSize: '10mm Beryllium Driver',
      batteryLife: 'Unlimited (Wired Type-C)',
      latencyMs: 0
    },
    description: 'Pure uncompressed sound without batteries, bluetooth pairing delays, or compression artifacts. Plug directly into your laptop or phone for broadcast-clean voice calls and lossless acoustic reproduction.',
    reviews: [
      {
        id: 'rev-13',
        author: 'Jessica Miller',
        rating: 5,
        date: '2026-08-30',
        title: 'Essential for video conference calls',
        comment: 'No bluetooth disconnects in the middle of meetings. Everyone complimented how clear my voice sounded right away.',
        verified: true
      }
    ]
  }
];
