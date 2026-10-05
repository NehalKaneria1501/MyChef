'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { MEMBERSHIP_PASSES } from '@/lib/mockData';
import { 
  trackViewItemList, 
  trackSelectItem, 
  EcommerceItem 
} from '@/lib/analytics';
import { 
  Sparkles, 
  Check, 
  GraduationCap, 
  Building2, 
  Crown, 
  PauseCircle, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Bike
} from 'lucide-react';

export default function MembershipPassesPage() {
  const router = useRouter();
  const { setCheckoutPlan, providers } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  // GA4 Ecommerce: view_item_list
  useEffect(() => {
    const items: EcommerceItem[] = MEMBERSHIP_PASSES.map((pass) => ({
      item_id: pass.id,
      item_name: pass.title,
      item_category: 'Student & Corporate Pass',
      item_variant: pass.targetAudience,
      item_brand: 'MyChef Pass Loop',
      price: pass.monthlyPrice,
      quantity: 1,
    }));
    trackViewItemList(items, 'L_PASSES', 'Subscription Passes');
  }, []);

  const handleSelectPass = (pass: typeof MEMBERSHIP_PASSES[0]) => {
    if (!providers.length) return;
    const provider = providers[0];
    const collection = provider.mealCollections[0];

    const price = billingCycle === 'monthly' ? pass.monthlyPrice : Math.round(pass.monthlyPrice * 3 * 0.9);

    // GA4 Ecommerce: select_item
    trackSelectItem({
      item_id: pass.id,
      item_name: pass.title,
      item_category: 'Student & Corporate Pass',
      item_variant: pass.targetAudience,
      item_brand: 'MyChef Pass Loop',
      price,
      quantity: 1,
    }, 'L_PASSES', 'Subscription Passes');

    setCheckoutPlan({
      provider,
      collection: {
        ...collection,
        name: pass.title,
        tagline: pass.tagline,
        monthlyPrice: price,
      },
      planDuration: 'monthly',
      mealType: 'lunch',
      fulfillmentMode: pass.targetAudience === 'Student' ? 'takeaway' : 'delivery',
      totalPrice: price,
    });

    router.push('/checkout');
  };


  const regionalSpecialPasses = [
    {
      title: 'Kathiyawadi Saurashtra Mess Pass',
      region: 'Rajkot, Jamnagar, Bhavnagar & Ahmedabad',
      price: '₹2,399/mo',
      rawPrice: 2399,
      perk: 'Makai/Bajra Rotla with White Butter, Ringan Olo & Masala Chaas everyday',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
    },
    {
      title: 'Rajasthani Marwari Bhojanalaya Pass',
      region: 'Kota, Jaipur, Jodhpur & Udaipur',
      price: '₹2,499/mo',
      rawPrice: 2499,
      perk: 'Authentic Panchmel Dal, Baati, Gatta Curry & Missi Roti rotation',
      color: 'bg-rose-50 border-rose-200 text-rose-900',
    },
    {
      title: 'Punekar & Mumbai Dabbawala Pass',
      region: 'Pune, Mumbai, Nashik, Nagpur & Thane',
      price: '₹2,299/mo',
      rawPrice: 2299,
      perk: 'Garam Poli, Varan Bhat, Sukhi Bhaji, Thecha & Pithla Bhakri',
      color: 'bg-orange-50 border-orange-200 text-orange-900',
    },
    {
      title: 'South Traditional Meals & Tiffin Pass',
      region: 'Bengaluru, Hyderabad, Chennai & Kochi',
      price: '₹2,399/mo',
      rawPrice: 2399,
      perk: 'Steamed Rice, Drumstick Sambar, Rasam, Poriyal & Homemade Curd',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    },
  ];

  const handleSelectRegional = (reg: typeof regionalSpecialPasses[0]) => {
    if (!providers.length) return;
    const provider = providers[0];
    const collection = provider.mealCollections[0];

    setCheckoutPlan({
      provider,
      collection: {
        ...collection,
        name: reg.title,
        tagline: reg.perk,
        monthlyPrice: reg.rawPrice,
      },
      planDuration: 'monthly',
      mealType: 'lunch',
      fulfillmentMode: 'delivery',
      totalPrice: reg.rawPrice,
    });

    router.push('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-transparent">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>DAILY MEAL FREEDOM PASSES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
          Never Worry About <span className="text-orange-600">&ldquo;What to Eat&rdquo;</span> Again
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Budget-smart campus passes for students, desk-delivered executive meals for tech parks, and 7-star gourmet thalis crafted in pure desi ghee.
        </p>

        {/* Monthly vs Quarterly Toggle */}
        <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-stone-200/80 mt-2">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              billingCycle === 'monthly' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Monthly Pass (26 Meals)
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('quarterly')}
            className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              billingCycle === 'quarterly' ? 'bg-orange-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Quarterly Pass (3 Months)</span>
            <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              SAVE 10%
            </span>
          </button>
        </div>
      </div>

      {/* Main 3 Membership Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {MEMBERSHIP_PASSES.map((pass) => {
          const isGourmet = pass.targetAudience === 'VIP Gourmet';
          const isStudent = pass.targetAudience === 'Student';
          const price = billingCycle === 'monthly' ? pass.monthlyPrice : Math.round(pass.monthlyPrice * 3 * 0.9);

          return (
            <div
              key={pass.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] border ${
                isGourmet
                  ? 'bg-linear-to-b from-stone-950 via-stone-900 to-amber-950 text-white border-amber-500/40 shadow-xl'
                  : isStudent
                  ? 'bg-white text-stone-900 border-blue-200 shadow-md ring-2 ring-blue-500/10'
                  : 'bg-white text-stone-900 border-orange-300 shadow-lg ring-2 ring-orange-500/20'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                  isGourmet 
                    ? 'bg-amber-500 text-stone-950' 
                    : isStudent 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-orange-600 text-white'
                }`}>
                  {pass.badge}
                </span>

                <div className="flex items-center gap-1 text-[11px] font-bold text-stone-400">
                  {isStudent && <GraduationCap className="w-4 h-4 text-blue-600" />}
                  {!isStudent && !isGourmet && <Building2 className="w-4 h-4 text-orange-600" />}
                  {isGourmet && <Crown className="w-4 h-4 text-amber-400" />}
                  <span>{pass.targetAudience}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black">{pass.title}</h2>
                <p className={`text-xs mt-1 leading-relaxed ${isGourmet ? 'text-stone-300' : 'text-stone-500'}`}>
                  {pass.tagline}
                </p>

                {/* Price Display */}
                <div className="my-6 pt-4 border-t border-stone-200/20">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">₹{price}</span>
                    <span className={`text-xs ${isGourmet ? 'text-stone-400' : 'text-stone-500'}`}>
                      / {billingCycle === 'monthly' ? 'month (26 meals)' : '3 months'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-emerald-600 mt-1">
                    Just ₹{pass.pricePerMeal} per wholesome meal
                  </p>
                </div>

                {/* Perks List */}
                <div className="space-y-3 my-6">
                  {pass.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isGourmet ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        <Check className="w-3 h-3 font-bold" />
                      </div>
                      <span className={isGourmet ? 'text-stone-200' : 'text-stone-700'}>
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-stone-200/20 space-y-2">
                <button
                  type="button"
                  onClick={() => handleSelectPass(pass)}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    isGourmet
                      ? 'bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-stone-950 font-black'
                      : isStudent
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  <span>Activate with Razorpay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-stone-400">
                  Instant activation • Pause anytime with 1-click
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Regional Traditional Mess Passes */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-orange-600 uppercase tracking-widest">
            AUTHENTIC REGIONAL KITCHENS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Regional Traditional Style Passes
          </h2>
          <p className="text-xs text-stone-500">
            Cooked by native home chefs with traditional recipes from your hometown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {regionalSpecialPasses.map((reg, idx) => (
            <div key={idx} className={`p-5 rounded-3xl border ${reg.color} space-y-3 shadow-2xs flex flex-col justify-between`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-white/70 shadow-2xs">
                    {reg.price}
                  </span>
                  <span className="text-[10px] font-bold opacity-75">MONTHLY</span>
                </div>
                <h3 className="font-black text-sm">{reg.title}</h3>
                <p className="text-[11px] font-medium opacity-80 leading-relaxed">
                  {reg.perk}
                </p>
                <div className="text-[10px] font-bold text-stone-600 pt-2 border-t border-black/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-600" />
                  <span>{reg.region}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectRegional(reg)}
                className="w-full mt-3 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Select Pass</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pass Benefits Overview Grid */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="text-xl font-black text-stone-900">Why 50,000+ Students & Professionals Love My Chef Passes</h3>
          <p className="text-xs text-stone-500">Everything designed for zero friction and complete flexibility.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-2 p-4 rounded-2xl bg-orange-50/50">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <PauseCircle className="w-6 h-6" />
            </div>
            <h4 className="font-black text-stone-900 text-sm">Flexible Meal Pause</h4>
            <p className="text-xs text-stone-600">Going home for the weekend or traveling? Pause your meal before 9:00 AM without losing money.</p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-blue-50/50">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h4 className="font-black text-stone-900 text-sm">Campus Parcel Lockers</h4>
            <p className="text-xs text-stone-600">Pick up anytime from heated smart lockers outside hostels and office campus gates.</p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-emerald-50/50">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Bike className="w-6 h-6" />
            </div>
            <h4 className="font-black text-stone-900 text-sm">Free EV Delivery</h4>
            <p className="text-xs text-stone-600">Zero surge fees, zero delivery charges on all monthly subscriptions across 60+ cities.</p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-amber-50/50">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-black text-stone-900 text-sm">100% Food Safety</h4>
            <p className="text-xs text-stone-600">Every kitchen partner is FSSAI verified, audited for oil quality, hygiene, and kitchen cleanliness.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
