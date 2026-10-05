'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flame, 
  Sparkles, 
  ChefHat, 
  CheckCircle2, 
  ArrowRight,
  Globe2,
  CalendarCheck
} from 'lucide-react';

export interface RegionalDishSlide {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  pricePerMeal: number;
  calories: number;
  image: string;
  accentBadge: string;
  accentColor: string; // Tailwind color class
  keyItems: string[];
  providerId: string;
  chefName: string;
  deliverySlot: string;
}

export const REGIONAL_DISHES: RegionalDishSlide[] = [
  {
    id: 'dish-north-1',
    name: 'Shahi Paneer & Ghee Phulka Thali',
    region: 'North Indian & Punjabi',
    tagline: 'Makhani gravy simmered in pure A2 desi ghee with 4 butter phulkas',
    description: 'Fresh cottage cheese cubes in silky cashew-tomato gravy, slow-simmered Dal Makhani, fragrant Jeera Basmati, and fresh farm salad.',
    pricePerMeal: 123,
    calories: 620,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    accentBadge: 'TOP POPULAR',
    accentColor: 'from-orange-500 to-amber-600',
    keyItems: ['4 Ghee Phulkas', 'Shahi Paneer', 'Dal Makhani', 'Jeera Rice', 'Gulab Jamun'],
    providerId: 'prov-1',
    chefName: 'Maa Ki Rasoi (HSR)',
    deliverySlot: '12:15 PM - 1:30 PM',
  },
  {
    id: 'dish-afro-1',
    name: 'Ethiopian Shiro Wat & Misir with Injera',
    region: 'African Vegetarian',
    tagline: 'Berbere spiced chickpea & red lentil stews with sourdough teff injera',
    description: 'Authentic Ethiopian plant-powered feast with slow-simmered Shiro (chickpea stew), spicy Misir Wat (red lentils), and soft fermented Teff Injera flatbreads.',
    pricePerMeal: 134,
    calories: 640,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    accentBadge: 'AFRICAN VEG SPECIAL',
    accentColor: 'from-emerald-500 to-teal-700',
    keyItems: ['3 Teff Injeras', 'Shiro Wat (Chickpea)', 'Misir Wat (Lentils)', 'Gomen (Collards)', 'Awaze Dip'],
    providerId: 'prov-5',
    chefName: 'Kilimanjaro Afro-Veg Canteen',
    deliverySlot: '12:00 PM - 1:30 PM',
  },
  {
    id: 'dish-kathi-1',
    name: 'Kathiyawadi Ringan Olo & Bajra Rotla',
    region: 'Kathiyawadi & Gujarati',
    tagline: 'Charred smoked eggplant bharta with golden bajra rotlo & white butter',
    description: 'Smoky fire-roasted Ringan No Olo cooked with garlic and spring onions, served with wood-fired Bajra Rotla, desi makhan, sweet Gujarati Kadhi, and Khichdi.',
    pricePerMeal: 109,
    calories: 590,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80',
    accentBadge: 'HERITAGE RECIPE',
    accentColor: 'from-amber-500 to-orange-600',
    keyItems: ['2 Bajra Rotla', 'Ringan No Olo', 'Desi Safed Makhan', 'Sweet Kadhi', 'Khichdi'],
    providerId: 'prov-2',
    chefName: 'Kathiyawadi Rasthal Mess',
    deliverySlot: '12:00 PM - 1:15 PM',
  },
  {
    id: 'dish-afro-2',
    name: 'West African Smoky Jollof & Kelewele',
    region: 'African Vegetarian',
    tagline: 'Firewood tomato Jollof rice with caramelized spiced plantains & Egusi',
    description: 'Smoky aromatic tomato-bell pepper Jollof rice, sweet fried plantains (Kelewele), nutritious melon seed spinach Egusi stew, and slow-braised honey beans.',
    pricePerMeal: 139,
    calories: 690,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    accentBadge: 'PAN-AFRICAN HIT',
    accentColor: 'from-red-500 to-amber-600',
    keyItems: ['Smoky Jollof Rice', 'Fried Kelewele Plantains', 'Egusi Spinach Stew', 'Ewa Riro Beans', 'Shito Sauce'],
    providerId: 'prov-5',
    chefName: 'Kilimanjaro Afro-Veg Canteen',
    deliverySlot: '12:00 PM - 1:30 PM',
  },
  {
    id: 'dish-south-1',
    name: 'Chettinad Sambar, Medu Vada & Avial',
    region: 'South Indian & Sattvic',
    tagline: 'Stone-ground spices, crispy lentil vadas, coconut avial & steaming rice',
    description: 'Traditional Tamil & Kerala home feast with fresh drumstick sambar, two crispy medu vadas, coconut-curd avial, rasam, and fresh coconut chutney.',
    pricePerMeal: 115,
    calories: 560,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    accentBadge: 'SATTVIC HOMESTYLE',
    accentColor: 'from-yellow-500 to-emerald-600',
    keyItems: ['2 Crispy Medu Vadas', 'Drumstick Sambar', 'Coconut Avial', 'Steamed Rice', 'Tomato Rasam'],
    providerId: 'prov-1',
    chefName: 'Dakshin Homestyle Meals',
    deliverySlot: '12:30 PM - 1:45 PM',
  },
  {
    id: 'dish-raj-1',
    name: 'Royal Dal Baati Churma & Gatte',
    region: 'Royal Rajasthani & Marwadi',
    tagline: 'Ghee-drenched baatis, Panchmel dal, besan gatte & dry fruit churma',
    description: 'A 7-star regal experience from the royal kitchens of Mewar: golden baatis soaked in A2 ghee, spicy Panchmel dal, tangy Rajasthani kadhi, and rose-infused churma.',
    pricePerMeal: 149,
    calories: 740,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    accentBadge: '7-STAR ROYALTY',
    accentColor: 'from-yellow-600 to-amber-700',
    keyItems: ['3 Ghee Baatis', 'Panchmel Dal', 'Govind Gatte', 'Dry Fruit Churma', 'Garlic Chutney'],
    providerId: 'prov-3',
    chefName: 'Rajputana Heritage Bhojanalaya',
    deliverySlot: '12:30 PM - 1:45 PM',
  },
  {
    id: 'dish-pune-1',
    name: 'Punekar Pithla Bhakri & Varan Bhaat',
    region: 'Maharashtrian / Punekar',
    tagline: 'Fresh besan pithla, hot jowar bhakri, fiery thecha & comforting toor dal',
    description: 'Authentic Maharashtrian comfort meal loved by students and techies alike. Served with hand-pressed Jowar Bhakri, spicy green chili thecha, and ghee varan bhaat.',
    pricePerMeal: 84,
    calories: 580,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    accentBadge: 'STUDENT FAVORITE',
    accentColor: 'from-blue-500 to-indigo-600',
    keyItems: ['2 Jowar Bhakri', 'Garam Pithla', 'Kolhapuri Thecha', 'Varan Bhaat (Ghee)', 'Fried Papad'],
    providerId: 'prov-4',
    chefName: 'Punekar Dabbawala & Student Mess',
    deliverySlot: '11:30 AM - 1:00 PM',
  },
  {
    id: 'dish-afro-3',
    name: 'Moroccan Apricot & Chickpea Tagine',
    region: 'African Vegetarian',
    tagline: 'Slow-simmered saffron cinnamon vegetable tagine with fluffy couscous',
    description: 'North African clay pot tagine bursting with sweet apricots, plump chickpeas, zucchini, roasted pumpkin, and fresh mint over steaming hand-rolled couscous.',
    pricePerMeal: 139,
    calories: 610,
    image: 'https://images.unsplash.com/photo-1505253758473-96b3015f240a?auto=format&fit=crop&w=1000&q=80',
    accentBadge: 'NORTH AFRICAN TASTE',
    accentColor: 'from-purple-500 to-rose-600',
    keyItems: ['Steamed Semolina Couscous', 'Clay Pot Chickpea Tagine', 'Dried Apricot Relish', 'Harissa Tahini', 'Mint Tea'],
    providerId: 'prov-5',
    chefName: 'Kilimanjaro Afro-Veg Canteen',
    deliverySlot: '12:00 PM - 1:30 PM',
  },
];

export default function DishesImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentDish = REGIONAL_DISHES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REGIONAL_DISHES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REGIONAL_DISHES.length) % REGIONAL_DISHES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REGIONAL_DISHES.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  return (
    <div 
      className="relative rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl transition-all"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Slider Header Bar */}
      <div className="px-4 py-3 bg-stone-950/80 backdrop-blur-md border-b border-stone-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-stone-300 font-extrabold flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Delicacies From All Regions (8 Regional Specials)</span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-stone-400 font-bold">
          <span>{currentIndex + 1}</span>
          <span className="text-stone-600">/</span>
          <span>{REGIONAL_DISHES.length}</span>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={currentDish.id}
          src={currentDish.image}
          alt={currentDish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-stone-950/70 via-transparent to-stone-950/40" />

        {/* Region & Highlight Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider shadow-md bg-linear-to-r ${currentDish.accentColor}`}>
              {currentDish.accentBadge}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-stone-200 border border-white/20 text-[10px] font-bold">
              {currentDish.region}
            </span>
          </div>
          <div className="bg-black/75 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-full border border-amber-400/30 text-xs font-black shadow-md flex items-center gap-1">
            <span>₹{currentDish.pricePerMeal}</span>
            <span className="text-[10px] text-stone-300 font-semibold">/meal</span>
          </div>
        </div>

        {/* Navigation Buttons (Prev / Next) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Dish"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-orange-600 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Dish"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-orange-600 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all hover:scale-110 active:scale-95 cursor-pointer z-10"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dish Title, Highlights & Kitchen Details */}
        <div className="absolute bottom-3 left-3 right-3 p-3 bg-stone-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg text-left">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-extrabold text-white text-sm sm:text-base leading-snug flex items-center gap-1.5">
                <span>{currentDish.name}</span>
                {currentDish.region.includes('African') && (
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-1.5 py-0.5 rounded-md">
                    Afro-Veg
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-stone-300 line-clamp-1">{currentDish.tagline}</p>
            </div>
            <div className="shrink-0 text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded-lg border border-amber-500/30">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>{currentDish.calories} kcal</span>
              </span>
            </div>
          </div>

          {/* Key Food Items Pills */}
          <div className="flex flex-wrap items-center gap-1 my-1.5">
            {currentDish.keyItems.slice(0, 4).map((item, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-stone-200 border border-white/10"
              >
                {item}
              </span>
            ))}
            {currentDish.keyItems.length > 4 && (
              <span className="text-[9px] text-stone-400 font-bold px-1">+more</span>
            )}
          </div>

          {/* Bottom Action & Dispatch Slot */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px]">
            <div className="flex items-center gap-1 text-stone-300">
              <Clock className="w-3 h-3 text-orange-400" />
              <span>Slot: <strong className="text-white font-semibold">{currentDish.deliverySlot}</strong></span>
            </div>
            <Link
              href={`/provider/${currentDish.providerId}`}
              className="inline-flex items-center gap-1 font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
            >
              <span>Subscribe Plan</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Thumbnails & Pagination Indicators */}
      <div className="p-2.5 bg-stone-950 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5">
          {REGIONAL_DISHES.map((dish, idx) => (
            <button
              key={dish.id}
              onClick={() => setCurrentIndex(idx)}
              title={`${dish.name} (${dish.region})`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-orange-500'
                  : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
            />
          ))}
        </div>

        <Link
          href="/explore"
          className="text-[11px] font-extrabold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0"
        >
          <span>View All 50+ Dishes</span>
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
