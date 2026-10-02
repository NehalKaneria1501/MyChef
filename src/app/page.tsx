'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Search,
  MapPin,
  Sparkles,
  ShieldCheck,
  Clock,
  Flame,
  Star,
  ChevronRight,
  ChevronLeft,
  Check,
  Leaf,
  ChefHat,
  Zap,
  Tag,
  Heart,
  Plus,
  ShoppingBag,
  SlidersHorizontal,
  TrendingUp,
  Percent,
  Timer,
  X,
  CheckCircle2,
  Utensils,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { pincode, setPincode, providers, setCheckoutPlan, checkoutPlan } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedKitchens, setLikedKitchens] = useState<Record<string, boolean>>({});

  // Quick Food Categories (Swiggy / Zomato / Zepto style)
  const categories = [
    { id: 'all', name: 'All Cravings', icon: '🍽️', count: '12+ Menus' },
    { id: 'thali', name: 'Ghar Ki Thali', icon: '🍛', count: 'Standard & Deluxe' },
    { id: 'bowls', name: 'Healthy Bowls', icon: '🥗', count: 'Low Calorie' },
    { id: 'jain', name: 'Pure Jain', icon: '🌿', count: 'No Onion-Garlic' },
    { id: 'south', name: 'South Meals', icon: '🥥', count: 'Rice & Sambar' },
    { id: 'diet', name: 'Millet & Keto', icon: '🥑', count: 'High Protein' },
    { id: 'dessert', name: 'Sweet Treats', icon: 'Gulab Jamun' },
  ];

  // Quick Commerce Add-on Extras (Blinkit / Zepto / Instamart style)
  const quickExtras = [
    { id: 'ext-1', name: 'Desi Ghee Phulkas (Pack of 4)', price: 49, originalPrice: 65, img: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80', tag: 'Freshly Rolled' },
    { id: 'ext-2', name: 'Homestyle Fresh Dahi (200g)', price: 35, originalPrice: 45, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80', tag: 'Thick & Creamy' },
    { id: 'ext-3', name: 'Hot Gulab Jamun (2 Pcs)', price: 59, originalPrice: 80, img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80', tag: 'Desi Ghee' },
    { id: 'ext-4', name: 'Roasted Lijjat Papad & Pickle', price: 25, originalPrice: 35, img: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=300&q=80', tag: 'Crunchy' },
  ];

  // Slider reference and scroll control for famous food dishes
  const famousSliderRef = React.useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (famousSliderRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      famousSliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Famous food dishes from our verified kitchen partners
  const famousDishes = [
    {
      id: 'dish-1',
      name: 'Shahi Paneer Lababdar & Ghee Phulkas',
      kitchen: 'Maa Ki Rasoi',
      rating: 4.9,
      reviews: 420,
      price: 98,
      badge: 'Desi Ghee Tadka',
      diet: 'Pure Veg',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
      description: 'Soft malai paneer simmered in buttery tomato-cashew gravy with 4 desi ghee phulkas and jeera basmati rice.',
      providerId: 'prov-1'
    },
    {
      id: 'dish-2',
      name: 'Kathiyawadi Ringan Olo & Bajra Rotla',
      kitchen: 'Radhe Krishna Kathiyawadi',
      rating: 4.8,
      reviews: 310,
      price: 92,
      badge: 'Wood Smoked Roast',
      diet: 'Kathiyawad',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
      description: 'Smoked roasted eggplant bharta with spring garlic, fresh white makhan (butter), organic jaggery & hot bajra rotla.',
      providerId: 'prov-2'
    },
    {
      id: 'dish-3',
      name: '16-Hour Slow-Simmered Dal Makhani',
      kitchen: 'Amritsari Dhabewala Homestyle',
      rating: 4.9,
      reviews: 540,
      price: 110,
      badge: 'Overnight Dum Cooked',
      diet: 'North Indian',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
      description: 'Whole black urad lentils slow-simmered on low flame with cultured white butter, fresh garlic & kasturi methi.',
      providerId: 'prov-1'
    },
    {
      id: 'dish-4',
      name: 'Royal Sambar & Mixed Veg Coconut Avial',
      kitchen: 'Annapoorna Traditional Kitchen',
      rating: 4.8,
      reviews: 280,
      price: 88,
      badge: 'Cold-Pressed Coconut Oil',
      diet: 'South Indian',
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80',
      description: 'Drumstick & shallot sambar, creamy coconut yogurt avial, spiced rasam, cooling curd and red Kerala rice.',
      providerId: 'prov-3'
    },
    {
      id: 'dish-5',
      name: 'Rajasthani Gatta Curry & Panchmel Dal',
      kitchen: 'Marwari Rasoi Heritage',
      rating: 4.9,
      reviews: 390,
      price: 105,
      badge: 'Heritage Family Recipe',
      diet: 'Marwari Special',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
      description: 'Steamed gram-flour gattas simmered in tangy spiced yogurt gravy, five-lentil Panchmel dal and phulkas.',
      providerId: 'prov-2'
    },
    {
      id: 'dish-6',
      name: 'High Protein Turmeric Paneer & Millet Bowl',
      kitchen: 'Fit & Clean Meal Prep',
      rating: 4.7,
      reviews: 195,
      price: 135,
      badge: 'Zero Refined Carbs • 32g Protein',
      diet: 'Fitness Special',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      description: 'Low-GI organic foxtail millet, grilled turmeric paneer steaks, steamed broccoli, sprouts & roasted seeds.',
      providerId: 'prov-3'
    },
    {
      id: 'dish-7',
      name: 'Ghar Jaisa Yellow Dal Tadka & Jeera Aloo',
      kitchen: 'Ghar Ka Swad Daily Tiffin',
      rating: 4.8,
      reviews: 610,
      price: 84,
      badge: 'Zero Acidity Guarantee',
      diet: 'Daily Comfort',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      description: 'Homestyle light arhar dal with heeng-jeera tadka, crisp cumin potatoes, fresh curd and soft handmade rotis.',
      providerId: 'prov-1'
    }
  ];

  // Dish Quick-View Modal state (WooCommerce Restaurant style)
  const [quickViewDish, setQuickViewDish] = useState<typeof famousDishes[0] | null>(null);
  const [selectedDishDuration, setSelectedDishDuration] = useState<'weekly' | 'monthly'>('monthly');
  const [modalAddons, setModalAddons] = useState<string[]>([]);

  const handleSubscribeFromModal = (dish: typeof famousDishes[0]) => {
    const prov = providers.find(p => p.id === dish.providerId) || providers[0];
    const collection = prov.mealCollections[0];
    const price = selectedDishDuration === 'weekly' ? 690 : 2288;
    
    setCheckoutPlan({
      provider: prov,
      collection: {
        ...collection,
        name: dish.name,
      },
      planDuration: selectedDishDuration,
      mealType: 'lunch',
      fulfillmentMode: 'delivery',
      totalPrice: price,
    });
    setQuickViewDish(null);
    router.push('/checkout');
  };

  const toggleModalAddon = (addon: string) => {
    setModalAddons(prev => 
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedKitchens((prev: { [x: string]: any; }) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProviders = providers.filter((p: { servicePincodes: string | any[]; dietary: string | string[]; name: string; cuisine: string[]; }) => {
    const servesPin = p.servicePincodes.includes(pincode);
    const vegMatch = vegOnly ? p.dietary.includes('pure-veg') || p.dietary.includes('jain') : true;
    const searchMatch = searchQuery.trim() === ''
      ? true
      : p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cuisine.some((c: string) => {
        return c.toLowerCase().includes(searchQuery.toLowerCase());
      });
    return vegMatch && searchMatch;
  });

  return (
    <div className="flex flex-col gap-8 pb-28 bg-[#faf8f5]">

      {/* 1. TOP FLASH SALE PROMO STRIP (ZEPTO / SWIGGY STYLE) */}
      <div className="bg-linear-to-r from-orange-600 via-amber-600 to-rose-600 text-white text-xs font-bold py-2.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>FLASH OFFER</span>
            </span>
            <span>FLAT ₹150 OFF on your first Monthly Plan! Use coupon code: <span className="underline decoration-wavy font-mono text-amber-200">MYCHEF150</span></span>
          </div>
          <Link href="/explore" className="hidden sm:flex items-center gap-1 text-[11px] underline hover:text-amber-200">
            <span>Explore All Kitchens</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. INSTAMART / SWIGGY HERO BANNER CAROUSEL & SEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-stone-900 via-orange-950 to-stone-900 text-white p-6 sm:p-10 shadow-2xl border border-stone-800">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-7 space-y-4">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold">
                <Timer className="w-3.5 h-3.5 text-orange-400" />
                <span>Next Slot Dispatches by 12:15 PM</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Authentic Homestyle Food, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-300 to-yellow-400">
                  Delivered on Daily Loop.
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed">
                Cooked by verified neighborhood home-chefs using cold-pressed oils, pure desi ghee, and unadulterated spices. Subscribe weekly or monthly with zero cancellation penalties.
              </p>

              {/* Quick Search & Delivery Bar */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15 max-w-xl shadow-lg">
                  <div className="flex items-center gap-2 px-3 py-2 flex-1 bg-white rounded-xl text-stone-900">
                    <Search className="w-4 h-4 text-orange-600 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for Thalis, Paneer, Dal Makhani, Khichdi..."
                      className="w-full text-xs font-semibold focus:outline-none placeholder:text-stone-400"
                    />
                  </div>
                  <Link
                    href={`/explore?q=${ encodeURIComponent(searchQuery) }`}
                    className="px-6 py-2.5 rounded-xl btn-animated-primary text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/30 transition-all hover:scale-102 cursor-pointer"
                  >
                    <span>Search</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Quick Portals & Jump Links: Local Kitchens, PG Mess, Admin */}
                <div className="flex flex-wrap items-center gap-2 pt-3">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition-all hover:scale-102 cursor-pointer"
                  >
                    <ChefHat className="w-3.5 h-3.5 text-orange-400" />
                    <span>Local Kitchens</span>
                  </Link>
                  <Link
                    href="/passes"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-bold transition-all hover:scale-102 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                    <span>PG Mess (₹84/meal)</span>
                  </Link>
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold transition-all hover:scale-102 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
                    <span>Admin Portal</span>
                  </Link>
                </div>
              </div>

              {/* Delivery stats ticker */}
              <div className="flex items-center gap-6 pt-2 text-[11px] text-stone-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% FSSAI Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Free Doorstep Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Zero Palm Oil</span>
                </div>
              </div>

            </div>

            {/* Banner Right Feature Box */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-3.5 border border-white/20 shadow-2xl">
                <div className="relative h-60 w-full rounded-xl overflow-hidden mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=700&q=80"
                    alt="Delicious Homestyle Thali"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Trending #1 in {pincode}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md p-2.5 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-extrabold text-white">Maa Ki Rasoi (HSR)</h4>
                      <p className="text-[11px] text-stone-300">Ghar Ki Thali • Paneer Bhurji & Yellow Dal</p>
                    </div>
                    <span className="font-black text-amber-400 text-sm">₹123/meal</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs px-1">
                  <span className="text-stone-300">Slot: 12:15 PM - 1:30 PM</span>
                  <Link
                    href="/provider/prov-1"
                    className="px-3.5 py-1.5 btn-animated-primary text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Subscribe Today
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. "WHAT'S ON YOUR MIND?" CATEGORY CIRCLES (SWIGGY / ZOMATO STYLE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Explore Cravings</h2>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">What are you craving today?</h3>
          </div>
          <span className="text-xs text-stone-500 font-semibold hidden sm:inline">Delivering hot to {pincode}</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center p-3.5 rounded-2xl shrink-0 transition-all text-center min-w-[105px] border ${ isSelected
                    ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20 scale-105'
                    : 'bg-white hover:bg-orange-50/60 text-stone-800 border-stone-200/80 shadow-xs'
                  }`}
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span className="text-xs font-bold whitespace-nowrap">{cat.name}</span>
                <span className={`text-[10px] mt-0.5 ${ isSelected ? 'text-orange-100' : 'text-stone-400' }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3.5 FAMOUS DISHES SLIDER (FEATURED FROM VERIFIED KITCHENS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-orange-600 uppercase tracking-wider mb-0.5">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span>Kitchen Chef Signatures</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">Famous Food Dishes of the Kitchens</h3>
            <p className="text-xs text-stone-500 mt-0.5">Hand-crafted daily specialties cooked with pure ingredients by top neighborhood home chefs</p>
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollSlider('left')}
              aria-label="Previous dishes"
              className="w-9 h-9 rounded-2xl bg-white hover:bg-orange-50 text-stone-700 hover:text-orange-600 border border-stone-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              aria-label="Next dishes"
              className="w-9 h-9 rounded-2xl bg-white hover:bg-orange-50 text-stone-700 hover:text-orange-600 border border-stone-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Card Slider */}
        <div
          ref={famousSliderRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
        >
          {famousDishes.map((dish) => (
            <div
              key={dish.id}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1 restaurant-card-pro"
            >
              <div onClick={() => setQuickViewDish(dish)} className="cursor-pointer">
                {/* Dish Photo */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-stone-900 text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>{dish.badge}</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-emerald-700 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{dish.rating}</span>
                  </div>

                  {/* Quick View Hover Pill (WordPress / WooCommerce Food Style) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/35 backdrop-blur-xs">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-stone-900 text-xs font-black shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Utensils className="w-3.5 h-3.5 text-orange-600" />
                      <span>Quick View & Nutrition</span>
                    </span>
                  </div>

                  {/* Kitchen Name & Diet */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-bold flex items-center gap-1 drop-shadow-sm truncate">
                      <ChefHat className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                      <span>{dish.kitchen}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md font-semibold shrink-0">
                      {dish.diet}
                    </span>
                  </div>
                </div>

                {/* Dish Details */}
                <div className="p-4 space-y-2">
                  <h4 className="font-black text-stone-900 text-sm leading-snug line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {dish.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Card Footer with Price & Actions */}
              <div className="p-4 pt-0 border-t border-stone-100 flex items-center justify-between gap-2 mt-2">
                <div>
                  <span className="text-[10px] text-stone-400 font-semibold block">Meal Pass Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-black text-stone-900">₹{dish.price}</span>
                    <span className="text-[10px] text-stone-500">/meal</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setQuickViewDish(dish)}
                    className="px-2.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xs"
                  >
                    Quick View
                  </button>
                  <Link
                    href={`/provider/${dish.providerId}`}
                    className="px-3 py-1.5 rounded-xl btn-animated-primary text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Menu</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. QUICK FILTERS & TOGGLES (SWIGGY / ZOMATO FILTER BAR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-stone-200 shadow-xs">

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Pure Veg Toggle like Swiggy */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold transition-all ${ vegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
            >
              <div className="w-3.5 h-3.5 border-2 border-current p-0.5 flex items-center justify-center rounded-xs">
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
              </div>
              <span>Pure Veg Only</span>
            </button>

            <span className="text-stone-300">|</span>

            <button className="px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold border border-stone-200">
              ⭐ 4.5+ Rating
            </button>
            <button className="px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold border border-stone-200">
              Under ₹120 / meal
            </button>
            <button className="px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold border border-stone-200">
              ⚡ Instant Lunch Slot
            </button>
          </div>

          <div className="text-xs font-semibold text-stone-500">
            Showing <span className="font-bold text-stone-900">{filteredProviders.length}</span> Verified Kitchens
          </div>

        </div>
      </section>

      {/* 5. POPULAR VERIFIED KITCHENS (SWIGGY / ZOMATO RESTAURANT CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6">
        <div>
          <h2 className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Top Rated Neighborhood Kitchens</h2>
          <h3 className="text-2xl font-black text-stone-900">Recommended Home Chefs Near You</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((prov) => {
            const isLiked = !!likedKitchens[prov.id];

            return (
              <div
                key={prov.id}
                className="group bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prov.coverImage}
                      alt={prov.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Like button */}
                    <button
                      onClick={(e) => toggleLike(prov.id, e)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-red-500 transition-colors shadow-sm"
                    >
                      <Heart className={`w-4 h-4 ${ isLiked ? 'fill-red-500 text-red-500' : '' }`} />
                    </button>

                    {/* Swiggy-style Discount Ribbon */}
                    <div className="absolute bottom-3 left-3 bg-blue-700/90 backdrop-blur-md px-3 py-1 rounded-xl text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <Percent className="w-3.5 h-3.5 text-amber-300" />
                      <span>FLAT ₹300 OFF ON MONTHLY</span>
                    </div>

                    {/* FSSAI Badge */}
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wide flex items-center gap-1 shadow-sm">
                      <ShieldCheck className="w-3 h-3" />
                      <span>FSSAI VERIFIED</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">

                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-stone-900 text-base group-hover:text-orange-600 transition-colors leading-snug">
                          {prov.name}
                        </h4>
                        <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                          {prov.tagline}
                        </p>
                      </div>

                      {/* Rating chip */}
                      <div className="bg-emerald-700 text-white px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 shadow-xs">
                        <span>{prov.rating}</span>
                        <Star className="w-3 h-3 fill-white" />
                      </div>
                    </div>

                    {/* Cuisine pills */}
                    <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                      {prov.cuisine.map((c) => (
                        <span key={c} className="text-stone-600 font-medium">
                          {c} •
                        </span>
                      ))}
                      <span className="text-orange-600 font-bold">₹{Math.round(prov.startingPriceMonthly / 26)}/meal</span>
                    </div>

                    {/* Delivery Slot Strip */}
                    <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-orange-600" />
                        <span>Lunch: {prov.deliverySlots.lunch}</span>
                      </div>
                      <span className="text-emerald-700 font-bold">Free Delivery</span>
                    </div>

                    {/* Meal Collections Quick Preview */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider block">
                        Popular Meal Plans
                      </span>
                      <div className="space-y-1">
                        {prov.mealCollections.map((col) => (
                          <div key={col.id} className="flex items-center justify-between text-xs bg-orange-50/40 px-2.5 py-1.5 rounded-xl border border-orange-100/60">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${ col.dietType === 'pure-veg' || col.dietType === 'jain' ? 'bg-emerald-500' : 'bg-red-500' }`}></span>
                              <span className="font-bold text-stone-800 text-[11px]">{col.name}</span>
                            </div>
                            <span className="font-extrabold text-orange-600 text-xs">₹{col.monthlyPrice}/mo</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/provider/${ prov.id }`}
                    className="w-full py-2.5 rounded-2xl btn-animated-primary text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <span>View 7-Day Menu & Subscribe</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 6. QUICK COMMERCE MEAL EXTRAS (ZEPTO / BLINKIT / INSTAMART STYLE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-4">
        <div className="bg-linear-to-r from-amber-50 via-orange-50 to-amber-50 p-6 sm:p-8 rounded-3xl border border-orange-200/80 shadow-xs space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-orange-600 uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4 text-orange-600 fill-orange-600" />
                <span>Quick Commerce Daily Add-ons</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                Enhance Your Tiffin (Delivered in 15–25 Mins)
              </h3>
            </div>
            <span className="text-xs font-bold text-stone-600 bg-white px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs self-start sm:self-auto">
              ⚡ Instant Pantry Dispatch
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickExtras.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-3"
              >
                <div className="relative h-32 w-full rounded-xl overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-stone-900 text-xs line-clamp-1">{item.name}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-black text-stone-900">₹{item.price}</span>
                    <span className="text-[11px] text-stone-400 line-through">₹{item.originalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Added ${ item.name } to your tiffin bundle!`)}
                  className="w-full py-1.5 rounded-xl bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-600 font-extrabold text-xs flex items-center justify-center gap-1 border border-orange-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD TO TIFFIN</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FLOATING QUICK COMMERCE CART BAR (ZEPTO / BLINKIT STYLE) */}
      {checkoutPlan ? (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto animate-in slide-in-from-bottom-6 duration-300">
          <div className="bg-stone-900 text-white p-4 rounded-3xl shadow-2xl border border-stone-700 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-white">{checkoutPlan.collection.name}</span>
                  <span className="text-[10px] font-bold uppercase bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded">
                    {checkoutPlan.planDuration}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 font-medium">
                  {checkoutPlan.provider.name} • Total: ₹{checkoutPlan.totalPrice}
                </p>
              </div>
            </div>

            <Link
              href="/checkout"
              className="px-5 py-2.5 rounded-2xl btn-animated-primary text-white font-black text-xs flex items-center gap-1.5 shrink-0 shadow-lg shadow-orange-600/30 transition-all hover:scale-102"
            >
              <span>View Cart & Pay</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Floating Quick Commerce Pill (WooCommerce CartFlows / Zepto Style) */
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-stone-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-700/80 flex items-center justify-between gap-3 quick-commerce-pill">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div className="truncate">
                <p className="text-xs font-black text-white truncate flex items-center gap-1.5">
                  <span>Lunch Dispatches in 38m</span>
                  <span className="text-[10px] text-amber-300 font-bold bg-amber-500/20 px-1.5 py-0.2 rounded hidden sm:inline">
                    Code: MYCHEF150
                  </span>
                </p>
                <p className="text-[11px] text-stone-400 truncate">Free Delivery • 100% Skip Rollover Guarantee</p>
              </div>
            </div>

            <Link
              href="/explore"
              className="px-4 py-2 rounded-xl btn-animated-primary text-white font-extrabold text-xs flex items-center gap-1 shrink-0 shadow-md"
            >
              <span>Subscribe Tiffin</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* 8. WOOCOMMERCE RESTAURANT STYLE DISH QUICK VIEW MODAL */}
      {quickViewDish && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="fixed inset-0"
            onClick={() => setQuickViewDish(null)}
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-stone-200 shadow-2xl z-10 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            
            {/* Modal Image Header */}
            <div className="relative h-56 w-full shrink-0 bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={quickViewDish.image}
                alt={quickViewDish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
              
              <button
                onClick={() => setQuickViewDish(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors backdrop-blur-xs"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute top-3 left-3 bg-white/95 text-stone-900 text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{quickViewDish.badge}</span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md font-semibold">
                    {quickViewDish.diet}
                  </span>
                  <div className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{quickViewDish.rating} ({quickViewDish.reviews}+ reviews)</span>
                  </div>
                </div>
                <h3 className="text-lg font-black leading-tight drop-shadow-sm">{quickViewDish.name}</h3>
                <p className="text-xs text-amber-200 font-semibold flex items-center gap-1 mt-0.5">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Prepared by {quickViewDish.kitchen}</span>
                </p>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-5 space-y-4 overflow-y-auto text-xs">
              
              {/* Macro Nutrition Breakdown */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 block">
                  Nutritional Breakdown per Tiffin Meal
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white p-2 rounded-xl border border-stone-100 shadow-2xs">
                    <span className="text-[10px] text-stone-400 block font-semibold">Calories</span>
                    <span className="font-black text-stone-900 text-sm">520 kcal</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-stone-100 shadow-2xs">
                    <span className="text-[10px] text-stone-400 block font-semibold">Protein</span>
                    <span className="font-black text-emerald-600 text-sm">28g</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-stone-100 shadow-2xs">
                    <span className="text-[10px] text-stone-400 block font-semibold">Carbs</span>
                    <span className="font-black text-stone-900 text-sm">54g</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-stone-100 shadow-2xs">
                    <span className="text-[10px] text-stone-400 block font-semibold">Good Fats</span>
                    <span className="font-black text-amber-600 text-sm">14g</span>
                  </div>
                </div>
              </div>

              {/* Chef Description */}
              <div className="space-y-1">
                <span className="font-extrabold text-stone-900 block">Chef&apos;s Recipe Story</span>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  {quickViewDish.description} Cooked daily in small batches with cold-pressed oils, hand-ground masalas, and zero artificial coloring or palm oil.
                </p>
              </div>

              {/* Add-on Extras Checklist (WooCommerce Food Style) */}
              <div className="space-y-2">
                <span className="font-extrabold text-stone-900 block">Optional Meal Add-ons</span>
                <div className="space-y-1.5">
                  {[
                    { id: 'ghee-roti', name: '2 Extra Desi Ghee Phulkas', price: 19 },
                    { id: 'fresh-dahi', name: 'Thick Homestyle Dahi (100g)', price: 25 },
                    { id: 'gulab-jamun', name: 'Warm Desi Ghee Gulab Jamun', price: 35 },
                  ].map((addon) => {
                    const isChecked = modalAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleModalAddon(addon.id)}
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-colors cursor-pointer ${
                          isChecked 
                            ? 'border-orange-500 bg-orange-50/50 text-orange-950 font-bold' 
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100/70 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'border-orange-600 bg-orange-600 text-white' : 'border-stone-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-stone-900">+₹{addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Plan Duration Selector */}
              <div className="space-y-2">
                <span className="font-extrabold text-stone-900 block">Choose Subscription Duration</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDishDuration('weekly')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedDishDuration === 'weekly'
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span className="block text-xs">Weekly Flex Pass</span>
                    <span className="block font-black text-sm text-stone-900 mt-0.5">₹690</span>
                    <span className="block text-[10px] text-stone-400">6 Days • 1 Skip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDishDuration('monthly')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative ${
                      selectedDishDuration === 'monthly'
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span className="absolute -top-2 right-3 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                      SAVE 24%
                    </span>
                    <span className="block text-xs">Monthly Value Pass</span>
                    <span className="block font-black text-sm text-stone-900 mt-0.5">₹2,288</span>
                    <span className="block text-[10px] text-stone-400">26 Days • 5 Skips</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Sticky CTA Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-stone-400 font-semibold block">Total Subscription Cost</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-stone-900">
                    ₹{selectedDishDuration === 'weekly' ? 690 : 2288}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    ({selectedDishDuration === 'weekly' ? '₹115/meal' : '₹88/meal'})
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSubscribeFromModal(quickViewDish)}
                className="px-5 py-3 rounded-2xl btn-animated-primary text-white text-xs font-black shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <span>Subscribe & Order</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
