'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Star,
  MapPin,
  ShieldCheck,
  Clock,
  Check,
  Flame,
  Calendar,
  Utensils,
  ChevronRight,
  Sparkles,
  Award,
  ArrowLeft
} from 'lucide-react';
import { MealCollection, OrderFulfillmentMode } from '@/lib/types';

export default function ProviderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { providers, setCheckoutPlan } = useApp();

  const provider = providers.find((p) => p.id === resolvedParams.id) || providers[0];

  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedMealType, setSelectedMealType] = useState<'lunch' | 'dinner'>('lunch');
  const [selectedCollection, setSelectedCollection] = useState<MealCollection>(provider.mealCollections[0]);
  const [planDuration, setPlanDuration] = useState<'weekly' | 'monthly'>('monthly');
  const [planMealType, setPlanMealType] = useState<'lunch' | 'dinner' | 'both'>('lunch');
  const [fulfillmentMode, setFulfillmentMode] = useState<OrderFulfillmentMode>('delivery');

  // Price Calculation
  const basePrice = planDuration === 'weekly' ? selectedCollection.weeklyPrice : selectedCollection.monthlyPrice;
  const multiplier = planMealType === 'both' ? 1.9 : 1; // 10% discount on both meals
  const totalPrice = Math.round(basePrice * multiplier);

  const handleSubscribe = () => {
    setCheckoutPlan({
      provider,
      collection: selectedCollection,
      planDuration,
      mealType: planMealType,
      fulfillmentMode,
      totalPrice,
    });
    router.push('/checkout');
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDayMenu = provider.weeklyMenu.find((m) => m.day === selectedDay) || provider.weeklyMenu[0];
  const activeMenuSlot = selectedMealType === 'lunch' ? currentDayMenu.lunch : currentDayMenu.dinner;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Back link */}
      <Link href="/explore" className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-orange-600 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Kitchens</span>
      </Link>

      {/* KITCHEN PROFILE HERO */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">

        {/* Cover image banner */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={provider.coverImage}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={provider.avatar}
                alt={provider.ownerName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>FSSAI Verified</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold">
                    {provider.ownerName} (Head Chef)
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {provider.name}
                </h1>
                <p className="text-xs text-stone-200 mt-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{provider.kitchenAddress}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
              <div className="text-center px-2">
                <div className="flex items-center justify-center gap-1 font-extrabold text-lg text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{provider.rating}</span>
                </div>
                <span className="text-[10px] text-stone-300">{provider.reviewCount} Reviews</span>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center px-2">
                <span className="block font-extrabold text-lg text-white">{provider.subscriberCount}</span>
                <span className="text-[10px] text-stone-300">Active Subs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timings & Highlights strip */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="font-semibold text-stone-800">Lunch Delivery:</span>
              <span className="text-stone-500">{provider.deliverySlots.lunch}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="font-semibold text-stone-800">Dinner Delivery:</span>
              <span className="text-stone-500">{provider.deliverySlots.dinner}</span>
            </div>
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            FSSAI Reg: {provider.fssaiNumber}
          </div>
        </div>

      </div>

      {/* TWO COLUMN WORKSPACE: WEEKLY MENU (LEFT) + PLAN CUSTOMIZER (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT: INTERACTIVE ROTATING WEEKLY MENU */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-orange-600">7-Day Fresh Rotation</h2>
                <h3 className="text-xl font-extrabold text-stone-900">Weekly Menu Schedule</h3>
              </div>

              {/* Lunch / Dinner switcher */}
              <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200">
                <button
                  onClick={() => setSelectedMealType('lunch')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${ selectedMealType === 'lunch'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                    }`}
                >
                  Lunch Menu
                </button>
                <button
                  onClick={() => setSelectedMealType('dinner')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${ selectedMealType === 'dinner'
                      ? 'bg-white text-orange-600 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                    }`}
                >
                  Dinner Menu
                </button>
              </div>
            </div>

            {/* Day Selector Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1 border-b border-stone-100">
              {days.map((day) => {
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${ isSelected
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Today's Course Breakdown */}
            <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wide">
                  {selectedDay} {selectedMealType.toUpperCase()} ITEMS
                </span>
                <span className="text-[11px] font-semibold text-orange-600 bg-white px-2 py-0.5 rounded-md border border-orange-200">
                  Freshly Cooked
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-orange-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Main Curry</span>
                  <p className="text-xs font-extrabold text-stone-900">{activeMenuSlot.curry}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-orange-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Lentils / Dal</span>
                  <p className="text-xs font-extrabold text-stone-900">{activeMenuSlot.dal}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-orange-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Breads (Rotis)</span>
                  <p className="text-xs font-extrabold text-stone-900">{activeMenuSlot.bread}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-orange-100">
                  <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Rice / Grains</span>
                  <p className="text-xs font-extrabold text-stone-900">{activeMenuSlot.rice}</p>
                </div>
              </div>

              {activeMenuSlot.sides && (
                <div className="bg-white p-3 rounded-xl border border-orange-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-500">Accompaniments & Sides:</span>
                  <span className="font-bold text-emerald-700">{activeMenuSlot.sides}</span>
                </div>
              )}
            </div>

            {/* Hygiene & Preparation Standards */}
            <div className="border-t border-stone-100 pt-4 space-y-2">
              <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Kitchen Quality Standards</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Cold-pressed oils</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>RO purified water</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>No artificial color</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Lead-free steel prep</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Daily fresh sabzis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Insulated packaging</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: PLAN SELECTOR & CHECKOUT TRIGGER */}
        <div className="lg:col-span-5 sticky top-24 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-lg space-y-6">

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Select Plan & Customise</span>
              <h3 className="text-xl font-extrabold text-stone-900">Choose Subscription</h3>
            </div>

            {/* Step 1: Select Meal Collection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700">1. Select Meal Collection</label>
              <div className="space-y-2">
                {provider.mealCollections.map((col) => {
                  const isChosen = selectedCollection.id === col.id;
                  return (
                    <div
                      key={col.id}
                      onClick={() => setSelectedCollection(col)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${ isChosen
                          ? 'border-orange-600 bg-orange-50/60 ring-2 ring-orange-500/20 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300'
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-stone-900 text-xs">{col.name}</h4>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">
                              {col.dietType}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">{col.tagline}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-orange-600">₹{col.monthlyPrice}</span>
                          <span className="text-[10px] text-stone-400 block">/26 meals</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Duration (Weekly vs Monthly) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700">2. Select Duration</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlanDuration('weekly')}
                  className={`p-3 rounded-2xl border text-left transition-all ${ planDuration === 'weekly'
                      ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                >
                  <span className="text-xs block">Weekly Plan</span>
                  <span className="text-[11px] text-stone-500">6 Days (Trial)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanDuration('monthly')}
                  className={`p-3 rounded-2xl border text-left relative transition-all ${ planDuration === 'monthly'
                      ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                >
                  <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                    Best Value
                  </span>
                  <span className="text-xs block">Monthly Plan</span>
                  <span className="text-[11px] text-stone-500">26 Days (Save 15%)</span>
                </button>
              </div>
            </div>

            {/* Step 3: Meal Time (Lunch / Dinner / Both) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700">3. Select Meal Time</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['lunch', 'dinner', 'both'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPlanMealType(m)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${ planMealType === m
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Selected Plan:</span>
                <span className="font-semibold text-stone-900 capitalize">
                  {selectedCollection.name} ({planDuration})
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Total Meals:</span>
                <span className="font-semibold text-stone-900">
                  {planDuration === 'weekly' ? '6' : '26'} meals ({planMealType})
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Delivery:</span>
                <span className="font-semibold text-emerald-600">FREE Doorstep</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between font-bold text-sm">
                <span className="text-stone-900">Total Amount:</span>
                <span className="text-orange-600 text-base">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102"
            >
              <span>Proceed to Checkout</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-stone-400 text-center">
              🛡️ 100% Refund on remaining meals if you cancel anytime.
            </p>

          </div>
        </div>

      </div>

    </div>
  );
}
