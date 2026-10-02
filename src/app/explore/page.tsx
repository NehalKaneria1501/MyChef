'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  X
} from 'lucide-react';
import { KitchenCategory, StarRatingTier, DietaryType } from '@/lib/types';

type DietaryFilter = 'all' | DietaryType;
type StarFilter = 'all' | StarRatingTier;
type CategoryFilter = 'all' | KitchenCategory;

export default function ExplorePage() {
  const { providers, pincode, setPincode, city } = useApp();
  const [selectedDiet, setSelectedDiet] = useState<DietaryFilter>('all');
  const [selectedStarTier, setSelectedStarTier] = useState<StarFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProviders = providers.filter((prov) => {
    // Diet match
    const dietMatch = selectedDiet === 'all' ? true : prov.dietary.includes(selectedDiet as DietaryType);

    // Star tier match
    const starMatch = selectedStarTier === 'all' ? true : prov.starTier === selectedStarTier;

    // Category match
    const categoryMatch = selectedCategory === 'all' ? true : prov.kitchenCategory === selectedCategory;

    // Pincode match (if user entered a 6-digit pincode)
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
        prov.cuisine.some(c => c.toLowerCase().includes(q));

    return dietMatch && starMatch && categoryMatch && pincodeMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#faf8f5]">
      
      {/* HEADER & LOCATION FILTER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-orange-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3★ to 7★ KITCHENS • STUDENT MESS • PARCEL LOCKERS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              Kitchens Serving <span className="text-orange-600">{city || 'All Covered Areas'}</span>
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Filtered for Doorstep Delivery 🛵, Smart Locker Takeaway 🛍️, and Campus Mess Dine-in 🍽️
            </p>
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
            <span className="text-[11px] text-stone-400 pr-2">Serving 60+ Hubs</span>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by kitchen name, regional style (Kathiyawadi, Rajasthani, Maharashtrian, South Indian), or city..."
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

        {/* CATEGORY & STAR TIER FILTER TABS */}
        <div className="space-y-3 pt-2 border-t border-stone-100 text-xs">
          
          {/* Kitchen Type Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-stone-400 font-bold shrink-0 text-[11px]">Type:</span>
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
                selectedDiet === 'all' ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600'
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
              <span>Pure Veg</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedDiet('jain')}
              className={`px-3 py-1 rounded-lg font-bold shrink-0 transition-colors flex items-center gap-1 cursor-pointer ${
                selectedDiet === 'jain' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Jain (No Onion/Garlic)</span>
            </button>
          </div>

        </div>
      </div>

      {/* KITCHEN CARDS GRID */}
      {filteredProviders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-3">
          <p className="text-stone-400 text-base font-bold">No kitchens found matching your filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedDiet('all');
              setSelectedStarTier('all');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl hover:bg-orange-700 transition-colors cursor-pointer"
          >
            Reset Filters
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
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={provider.coverImage}
                      alt={provider.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

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
                    <div className="absolute bottom-3 right-3 text-[10px] font-bold text-white bg-black/50 px-2 py-0.5 rounded-lg backdrop-blur-xs flex items-center gap-1">
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

                    {/* Fulfillment Modes Available */}
                    <div className="pt-2 border-t border-stone-100 flex items-center gap-3 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <Bike className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Delivery</span>
                      </span>
                      {provider.takeawayAvailable && (
                        <span className="flex items-center gap-1 text-blue-700 font-bold">
                          <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                          <span>Parcel Locker</span>
                        </span>
                      )}
                      {provider.hasDineIn && (
                        <span className="flex items-center gap-1 text-purple-700 font-bold">
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
                      <span>View Menu</span>
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
  );
}
