'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  MapPin, 
  Star, 
  ChevronRight, 
  Sparkles, 
  Crown, 
  GraduationCap, 
  Bike, 
  ShoppingBag, 
  UtensilsCrossed, 
  X,
  Compass,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Calendar,
  Zap,
  PhoneCall,
  MessageSquare,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { KitchenCategory, StarRatingTier, DietaryType } from '@/lib/types';

type DietaryFilter = 'all' | DietaryType;
type StarFilter = 'all' | StarRatingTier;
type CategoryFilter = 'all' | KitchenCategory;
type FulfillmentFilter = 'all' | 'delivery' | 'parcel_locker' | 'dine_in';

function ExploreContent() {
  const { providers, pincode, setPincode, city } = useApp();
  const searchParams = useSearchParams();

  const [selectedDiet, setSelectedDiet] = useState<DietaryFilter>('all');
  const [selectedStarTier, setSelectedStarTier] = useState<StarFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedFulfillment, setSelectedFulfillment] = useState<FulfillmentFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openRouteFaq, setOpenRouteFaq] = useState<number | null>(null);

  // Sync search query and category from URL parameters
  useEffect(() => {
    const qParam = searchParams.get('q');
    const categoryParam = searchParams.get('category') as CategoryFilter | null;
    const tierParam = searchParams.get('star') as StarFilter | null;
    const dietParam = searchParams.get('diet') as DietaryFilter | null;
    const fulfillmentParam = searchParams.get('fulfillment') as FulfillmentFilter | null;

    if (qParam !== null) setSearchQuery(qParam);
    if (categoryParam) setSelectedCategory(categoryParam);
    if (tierParam) setSelectedStarTier(tierParam);
    if (dietParam) setSelectedDiet(dietParam);
    if (fulfillmentParam) setSelectedFulfillment(fulfillmentParam);
  }, [searchParams]);

  const filteredProviders = providers.filter((prov) => {
    // Diet match
    const dietMatch = selectedDiet === 'all' ? true : prov.dietary.includes(selectedDiet as DietaryType);

    // Star tier match
    const starMatch = selectedStarTier === 'all' ? true : prov.starTier === selectedStarTier;

    // Category match
    const categoryMatch = selectedCategory === 'all' ? true : prov.kitchenCategory === selectedCategory;

    // Fulfillment match
    let fulfillmentMatch = true;
    if (selectedFulfillment === 'delivery') {
      fulfillmentMatch = true; // all support delivery
    } else if (selectedFulfillment === 'parcel_locker') {
      fulfillmentMatch = !!prov.takeawayAvailable;
    } else if (selectedFulfillment === 'dine_in') {
      fulfillmentMatch = !!prov.hasDineIn;
    }

    // Pincode match
    const cleanPin = pincode.trim();
    const pincodeMatch = cleanPin.length === 6 
      ? prov.servicePincodes.some((pin) => pin.includes(cleanPin))
      : true;

    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const searchMatch = !q
      ? true 
      : prov.name.toLowerCase().includes(q) ||
        prov.city.toLowerCase().includes(q) ||
        prov.cuisine.some(c => c.toLowerCase().includes(q)) ||
        prov.tagline.toLowerCase().includes(q);

    return dietMatch && starMatch && categoryMatch && fulfillmentMatch && pincodeMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 bg-transparent">
      
      {/* BROWSING ROUTE HEADER & HERO BANNER */}
      <div className="relative overflow-hidden bg-linear-to-br from-stone-900 via-stone-800 to-orange-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-stone-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-black tracking-wide uppercase shadow-inner">
            <Compass className="w-3.5 h-3.5 text-orange-400 animate-spin" style={{ animationDuration: '12s' }} />
            <span>MyChef Browsing Route & Kitchen Directory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Explore Homestyle Kitchens & <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-300 to-yellow-300">Live Delivery Routes</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
            Browse verified neighborhood kitchens serving your area. Select between <strong>Insulated Doorstep Delivery</strong>, zero-fee <strong>Smart Parcel Lockers</strong>, or campus <strong>Mess Dine-In</strong> with certified FSSAI hygiene.
          </p>

          {/* Quick Route Status Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold text-stone-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Lunch & Dinner Routes Active</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Lunch: 11:30 AM–1:00 PM | Dinner: 7:00 PM–8:30 PM</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>60+ Tech Parks & College Hubs</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 CORE BROWSING ROUTE MODES GUIDE */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-600" />
              <span>How the Browsing Route Operates</span>
            </h2>
            <p className="text-xs text-stone-500">
              Choose the delivery or pickup route that matches your daily schedule
            </p>
          </div>
          <Link
            href="/contact?category=corporate&route=explore"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl border border-orange-200 transition-colors"
          >
            <span>Custom Route or Corporate Inquiry →</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Route 1: Doorstep Delivery */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 hover:border-emerald-400 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                ROUTE 1 • DOORSTEP
              </span>
              <h3 className="text-sm font-black text-stone-900 mt-1">Insulated Bike Delivery</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Hot tiffins transported inside thermal insulated boxes directly to your flat, PG room, or office desk.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-stone-600 flex items-center justify-between">
              <span>Delivery Window:</span>
              <span className="text-emerald-700">11:30 AM & 7:00 PM</span>
            </div>
          </div>

          {/* Route 2: Smart Parcel Lockers */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 hover:border-blue-400 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                ROUTE 2 • SMART LOCKER
              </span>
              <h3 className="text-sm font-black text-stone-900 mt-1">Zero-Fee Parcel Lockers</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Contactless pickup from temperature-controlled smart lockers placed at IT tech parks & student clusters.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-stone-600 flex items-center justify-between">
              <span>Delivery Fee:</span>
              <span className="text-blue-700 font-black">₹0 (Free Pickup)</span>
            </div>
          </div>

          {/* Route 3: Campus Mess Dine-in */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 hover:border-amber-400 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                ROUTE 3 • CAMPUS MESS
              </span>
              <h3 className="text-sm font-black text-stone-900 mt-1">Student Mess Dine-In</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Dine-in at partner student messes with unlimited hot rotis, verified hygiene, and digital QR passes.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-stone-600 flex items-center justify-between">
              <span>Starting at:</span>
              <span className="text-amber-700 font-black">₹84 / meal pass</span>
            </div>
          </div>

          {/* Route 4: Corporate Bulk & Catering */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 hover:border-purple-400 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                ROUTE 4 • CORPORATE & EVENTS
              </span>
              <h3 className="text-sm font-black text-stone-900 mt-1">Bulk Catering Trays</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Bulk executive meal boxes and celebration buffets for offices, birthdays, and anniversaries with GST billing.
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100 text-[11px] font-bold text-stone-600 flex items-center justify-between">
              <span>Bulk Discounts:</span>
              <Link href="/events?type=office" className="text-purple-700 font-black hover:underline">
                View Packages →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL CONSOLE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        
        {/* Row 1: Location & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-black text-orange-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SEARCH 60+ NEIGHBORHOOD HUBS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              Kitchens Serving <span className="text-orange-600">{city || 'All Covered Areas'}</span>
            </h2>
          </div>

          {/* Quick Pincode Change */}
          <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-2xl border border-stone-200">
            <MapPin className="w-4 h-4 text-orange-600 ml-2 shrink-0" />
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              placeholder="Pincode"
              className="w-24 text-xs font-black bg-transparent focus:outline-hidden"
            />
            <span className="text-stone-300">|</span>
            <span className="text-[11px] text-stone-500 font-semibold pr-2">Route Routing Engine</span>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by kitchen name, cuisine (Kathiyawadi, Rajasthani, Maharashtrian, South Indian), dish, or city..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl border border-stone-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-orange-500 placeholder:text-stone-400 shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* COMPREHENSIVE FILTER STRIPS */}
        <div className="space-y-3 pt-2 border-t border-stone-100 text-xs">
          
          {/* Fulfillment Route Mode Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-stone-400 font-bold shrink-0 text-[11px]">Route Mode:</span>
            {[
              { id: 'all' as const, label: 'All Routes' },
              { id: 'delivery' as const, label: '🛵 Doorstep Delivery' },
              { id: 'parcel_locker' as const, label: '🛍️ Smart Locker Pickup' },
              { id: 'dine_in' as const, label: '🍽️ Mess Dine-In' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFulfillment(f.id)}
                className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-colors cursor-pointer ${
                  selectedFulfillment === f.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Kitchen Type Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-stone-400 font-bold shrink-0 text-[11px]">Kitchen Type:</span>
            {[
              { id: 'all' as const, label: 'All Kitchens' },
              { id: 'student_mess' as const, label: '🎓 Student PG Mess & Canteen' },
              { id: 'home_chef' as const, label: '🏡 Homestyle Chefs' },
              { id: 'gourmet_dining' as const, label: '👑 7-Star Royal Dining' },
              { id: 'parcel_point' as const, label: '🛍️ Parcel Point & Lockers' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Star Rating Tier Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-stone-400 font-bold shrink-0 text-[11px]">Star Tier:</span>
            {[
              { id: 'all' as const, label: 'All Stars' },
              { id: '3_star' as const, label: '⭐ 3★ Student Budget' },
              { id: '4_star' as const, label: '⭐⭐ 4★ Traditional Mess' },
              { id: '5_star' as const, label: '⭐⭐⭐ 5★ Gourmet Homestyle' },
              { id: '7_star' as const, label: '✨ 7★ Royal Heritage VIP' },
            ].map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedStarTier(tier.id)}
                className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${
                  selectedStarTier === tier.id
                    ? 'bg-amber-500 text-stone-950 font-black'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Diet filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-stone-400 font-bold shrink-0 text-[11px]">Diet:</span>
            <button
              type="button"
              onClick={() => setSelectedDiet('all')}
              className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-colors cursor-pointer ${
                selectedDiet === 'all' ? 'bg-stone-800 text-white' : 'bg-stone-100 text-stone-600'
              }`}
            >
              All Diets
            </button>
            <button
              type="button"
              onClick={() => setSelectedDiet('pure-veg')}
              className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer ${
                selectedDiet === 'pure-veg' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Pure Veg (Kathiyawadi / Gujarati)</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedDiet('jain')}
              className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer ${
                selectedDiet === 'jain' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Strict Jain (No Root Veg)</span>
            </button>
          </div>

        </div>
      </div>

      {/* QUICK INQUIRY CALLOUT BANNER FOR BROWSERS */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-orange-600 via-amber-600 to-yellow-600 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black uppercase">
            <Building2 className="w-3.5 h-3.5" />
            <span>Need Custom Meal Routes or Corporate Tie-Up?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Organizing Food for Teams, Colleges or an Event?
          </h3>
          <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
            Submit a quick inquiry to our Route Dispatch Desk for customized pricing, tasting sample boxes, or bulk lunch passes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Link
            href="/contact?category=corporate&route=explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-black text-xs shadow-md transition-all"
          >
            <span>Inquiry Form & Sample Box</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://wa.me/919876543210?text=Hello%20MyChef!%20I%20am%20browsing%20kitchens%20and%20would%20like%20to%20inquire%20about%20a%20custom%20meal%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-900 font-black text-xs shadow-md transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>

      {/* KITCHEN CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-stone-500">
            Showing <span className="text-stone-900 font-black">{filteredProviders.length}</span> kitchens on active delivery routes
          </p>
          {(selectedDiet !== 'all' || selectedStarTier !== 'all' || selectedCategory !== 'all' || selectedFulfillment !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedDiet('all');
                setSelectedStarTier('all');
                setSelectedCategory('all');
                setSelectedFulfillment('all');
                setSearchQuery('');
              }}
              className="text-xs text-orange-600 font-bold hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredProviders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-stone-900">No kitchens found matching your route criteria</h3>
              <p className="text-stone-500 text-xs max-w-md mx-auto">
                Try clearing your search query or selecting &quot;All Routes&quot; to view verified kitchens across all neighborhoods.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedDiet('all');
                setSelectedStarTier('all');
                setSelectedCategory('all');
                setSelectedFulfillment('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl hover:bg-orange-700 transition-colors cursor-pointer"
            >
              Reset Filters & Show All
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => {
              const is7Star = provider.starTier === '7_star';
              const isStudentFav = provider.isStudentFavorite;

              return (
                <div
                  key={provider.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image & Badges */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={provider.coverImage}
                        alt={provider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

                      {/* Star Tier Badge */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase flex items-center gap-1 ${
                          is7Star 
                            ? 'bg-amber-400 text-stone-950 shadow-md' 
                            : 'bg-white/90 backdrop-blur-md text-stone-900'
                        }`}>
                          {is7Star && <Crown className="w-3 h-3 text-stone-950" />}
                          <span>{provider.starTier.replace('_', ' ').toUpperCase()}</span>
                        </span>

                        {isStudentFav && (
                          <span className="px-2 py-1 rounded-full text-[10px] font-black bg-blue-600 text-white flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            <span>CAMPUS MESS</span>
                          </span>
                        )}
                      </div>

                      {/* Rating Pill */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-xl text-stone-900 font-black text-xs shadow-xs">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{provider.rating}</span>
                        <span className="text-[10px] text-stone-400 font-normal">({provider.reviewCount})</span>
                      </div>

                      {/* City Location */}
                      <div className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-orange-400" />
                        <span>{provider.city.split('/')[0]}</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <h2 className="font-black text-base text-stone-900 group-hover:text-orange-600 transition-colors">
                          {provider.name}
                        </h2>
                        <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                          {provider.tagline}
                        </p>
                      </div>

                      {/* Cuisines */}
                      <div className="flex flex-wrap gap-1.5">
                        {provider.cuisine.map((c, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold rounded-md"
                          >
                            {c}
                          </span>
                        ))}
                      </div>

                      {/* Active Fulfillment Modes Available */}
                      <div className="pt-2 border-t border-stone-100 flex items-center gap-3 text-[11px] text-stone-500">
                        <span className="flex items-center gap-1 text-emerald-700 font-bold" title="Doorstep bike delivery">
                          <Bike className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Doorstep</span>
                        </span>
                        {provider.takeawayAvailable && (
                          <span className="flex items-center gap-1 text-blue-700 font-bold" title="Free Smart Locker pickup">
                            <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                            <span>Locker</span>
                          </span>
                        )}
                        {provider.hasDineIn && (
                          <span className="flex items-center gap-1 text-purple-700 font-bold" title="Mess hall dine-in">
                            <UtensilsCrossed className="w-3.5 h-3.5 text-purple-600" />
                            <span>Mess Dine-In</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 uppercase font-black block">From</span>
                        <span className="text-base font-black text-stone-900">
                          ₹{provider.startingPriceMonthly}
                        </span>
                        <span className="text-[10px] text-stone-500"> / month</span>
                      </div>

                      <Link
                        href={`/provider/${provider.id}`}
                        className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <span>View Menu & Plans</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* BROWSING ROUTE FAQS & SCHEDULE INFORMATION */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6 mt-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black text-orange-600 uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            <span>ROUTE LOGISTICS & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            Everything About Our Meal Delivery Routes
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How do the morning and evening browsing routes work?',
              a: 'Our certified home chefs begin morning cooking at 8:00 AM using freshly sourced ingredients. At 10:30 AM, meals are temperature-sealed inside thermal containers. The Lunch Route delivers between 11:30 AM and 1:00 PM. The Dinner Route cooks at 5:00 PM and delivers between 7:00 PM and 8:30 PM.',
            },
            {
              q: 'What is the Smart Parcel Locker route and how do I pick up my food?',
              a: 'Smart Lockers are temperature-maintained holding units placed at major tech parks, metro stations, and PG colonies. Delivery is completely free. When your meal is placed in the locker, you receive a WhatsApp notification with a 4-digit OTP and QR code to unlock your pod anytime within 3 hours.',
            },
            {
              q: 'Can I switch my delivery route or pause if I am traveling?',
              a: 'Yes! You have full flexibility. Through your subscriber dashboard or WhatsApp concierge, you can pause meals or shift from Doorstep Delivery to Smart Locker pickup with a single tap up until 8:00 AM for lunch and 4:00 PM for dinner.',
            },
            {
              q: 'Do all kitchens adhere to FSSAI hygiene standards on the browsing route?',
              a: 'Every single kitchen listed on the MyChef Browsing Route has undergone a 32-point food safety inspection, mandatory oil quality verification, and temperature audits during morning packaging.',
            },
          ].map((faq, idx) => {
            const isOpen = openRouteFaq === idx;
            return (
              <div
                key={idx}
                className="bg-stone-50 rounded-2xl border border-stone-200/80 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenRouteFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-stone-900 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-500 shrink-0 border border-stone-200">
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 bg-white">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-stone-600 font-bold text-sm">
          <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading Browsing Route & Kitchens...</span>
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
