'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Navigation, 
  ShieldCheck, 
  ChefHat, 
  Package, 
  Bike, 
  UtensilsCrossed, 
  Key, 
  ArrowLeft,
  RefreshCw,
  Sparkles,
  ShoppingBag,
  Store
} from 'lucide-react';

export default function OrderTrackingPage() {
  const { liveOrder, setLiveOrder } = useApp();
  const [eta, setEta] = useState(liveOrder.estimatedMinutes || 18);
  const [copiedOtp, setCopiedOtp] = useState(false);

  // Timer countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev: number) => (prev > 1 ? prev - 1 : 1));
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  const copyOtp = () => {
    navigator.clipboard?.writeText(liveOrder.deliveryOtp);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const advanceStep = () => {
    setLiveOrder((prev) => ({
      ...prev,
      currentStep: prev.currentStep < 5 ? ((prev.currentStep + 1) as 1 | 2 | 3 | 4 | 5) : 1,
    }));
  };

  const steps = [
    {
      step: 1,
      title: 'Order Confirmed',
      desc: 'Kitchen received order & generated kitchen token #921',
      icon: CheckCircle2,
      time: '11:42 AM',
    },
    {
      step: 2,
      title: 'Chef Cooking in Pure Desi Ghee',
      desc: 'Hygiene & food safety inspection passed; fresh phulkas rolling',
      icon: ChefHat,
      time: '11:48 AM',
    },
    {
      step: 3,
      title: 'Insulated Thermal Packaging',
      desc: 'Sealed in 4-tier hot stainless-steel container with freshness seal',
      icon: Package,
      time: '12:02 PM',
    },
    {
      step: 4,
      title: liveOrder.fulfillmentMode === 'delivery' 
        ? 'Rider On The Way (Hero EV)' 
        : liveOrder.fulfillmentMode === 'takeaway'
        ? 'Ready at Campus Smart Locker / Parcel Point'
        : 'Table Token Ready at Dining Counter',
      desc: liveOrder.fulfillmentMode === 'delivery'
        ? 'Eco-friendly EV rider Ramesh Kumar is navigating to your address'
        : liveOrder.fulfillmentMode === 'takeaway'
        ? `Use locker code ${liveOrder.parcelLockerCode || 'LOCKER-BOX-A12'} to unlock your parcel`
        : 'Show this screen at the mess counter for hot unlimited serving',
      icon: liveOrder.fulfillmentMode === 'delivery' ? Bike : Store,
      time: '12:14 PM',
    },
    {
      step: 5,
      title: 'Order Handed Over & Enjoyed',
      desc: 'OTP verified. Enjoy your homestyle hot comfort meal!',
      icon: UtensilsCrossed,
      time: '12:28 PM',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-transparent">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link 
          href="/consumer/subscriptions" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>My Subscriptions</span>
        </Link>

        {/* Step Simulator Pill */}
        <button
          type="button"
          onClick={advanceStep}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
          title="Click to test live status progression"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-600" />
          <span>Simulate Next Step ({liveOrder.currentStep}/5)</span>
        </button>
      </div>

      {/* Hero Tracking Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-stone-900 via-stone-800 to-orange-950 text-white p-6 sm:p-8 shadow-xl border border-stone-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-black tracking-widest uppercase">
                LIVE TRACKING
              </span>
              <span className="text-xs font-mono text-stone-400">#{liveOrder.orderNumber}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1 text-white">
              {liveOrder.dishName}
            </h1>
            <p className="text-xs text-stone-300 flex items-center gap-1.5 mt-0.5">
              <ChefHat className="w-3.5 h-3.5 text-orange-400" />
              <span>{liveOrder.kitchenName}</span>
            </p>
          </div>

          {/* ETA & Handover OTP */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/15 text-center">
              <span className="block text-[10px] uppercase font-bold text-stone-300">ESTIMATED ETA</span>
              <span className="text-2xl font-black text-amber-300 flex items-center justify-center gap-1">
                <Clock className="w-5 h-5 text-amber-300" />
                <span>{eta} mins</span>
              </span>
            </div>

            <div 
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') copyOtp(); }}
              className="bg-orange-600 px-4 py-3 rounded-2xl text-center shadow-lg cursor-pointer hover:bg-orange-500 transition-colors" 
              onClick={copyOtp}
            >
              <span className="block text-[10px] uppercase font-black text-orange-200">DELIVERY OTP</span>
              <span className="text-2xl font-black tracking-widest text-white">
                {liveOrder.deliveryOtp}
              </span>
              <span className="block text-[9px] text-orange-200 mt-0.5">
                {copiedOtp ? 'Copied!' : 'Click to copy'}
              </span>
            </div>
          </div>
        </div>

        {/* Fulfillment Mode Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-400">Fulfillment Mode:</span>
            <div className="inline-flex rounded-xl bg-white/10 p-1 border border-white/15">
              <button
                type="button"
                onClick={() => setLiveOrder(prev => ({ ...prev, fulfillmentMode: 'delivery' }))}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  liveOrder.fulfillmentMode === 'delivery' ? 'bg-orange-600 text-white' : 'text-stone-300 hover:text-white'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Doorstep Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setLiveOrder(prev => ({ ...prev, fulfillmentMode: 'takeaway' }))}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  liveOrder.fulfillmentMode === 'takeaway' ? 'bg-orange-600 text-white' : 'text-stone-300 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Parcel Point Locker</span>
              </button>
              <button
                type="button"
                onClick={() => setLiveOrder(prev => ({ ...prev, fulfillmentMode: 'dinein' }))}
                className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  liveOrder.fulfillmentMode === 'dinein' ? 'bg-orange-600 text-white' : 'text-stone-300 hover:text-white'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Mess Dining</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>FSSAI Certified 100% Contactless Handover</span>
          </div>
        </div>

      </div>

      {/* Grid: Live Step Timeline & Visual Map/Rider Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: 5-Stage Live Timeline */}
        <div className="md:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-base font-black text-stone-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Real-Time Kitchen & Transit Progress</span>
            </h2>
            <span className="text-xs font-mono text-stone-400">Step {liveOrder.currentStep} of 5</span>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {steps.map((s) => {
              const isCompleted = liveOrder.currentStep > s.step;
              const isCurrent = liveOrder.currentStep === s.step;
              const Icon = s.icon;

              return (
                <div key={s.step} className="relative flex items-start gap-4">
                  {/* Step Dot Icon */}
                  <div 
                    className={`absolute -left-[27px] w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted 
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' 
                        : isCurrent 
                        ? 'bg-orange-600 border-orange-500 text-white ring-4 ring-orange-500/20 shadow-md' 
                        : 'bg-white border-stone-300 text-stone-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-sm font-black ${
                        isCurrent ? 'text-orange-600' : isCompleted ? 'text-stone-900' : 'text-stone-400'
                      }`}>
                        {s.title}
                      </h3>
                      <span className="text-[11px] font-mono text-stone-400">{s.time}</span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isCurrent ? 'text-stone-700 font-medium' : 'text-stone-500'}`}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Chef’s Note:</strong> Food is prepared in small artisanal batches with zero soda, low spice, and served in double-walled insulated dabbas.
            </span>
          </div>

        </div>

        {/* RIGHT: Map Simulation & Rider Contact Card */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Animated Route Simulation Map Card */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="relative h-48 bg-stone-100 flex items-center justify-center overflow-hidden border-b border-stone-200">
              {/* Map grid background pattern */}
              <div 
                className="absolute inset-0 opacity-40" 
                style={{ 
                  backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', 
                  backgroundSize: '16px 16px' 
                }} 
              />

              {/* Simulated road line */}
              <svg className="absolute inset-0 w-full h-full stroke-orange-400/70" strokeWidth="4" strokeDasharray="8 6">
                <path d="M 40 140 Q 150 40 280 120 T 360 80" fill="none" />
              </svg>

              {/* Kitchen Pin */}
              <div className="absolute left-8 bottom-6 text-center">
                <div className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg border-2 border-white mx-auto">
                  <ChefHat className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black bg-stone-900 text-white px-2 py-0.5 rounded shadow mt-1 inline-block">
                  Kitchen
                </span>
              </div>

              {/* Moving Rider EV Bike */}
              <div className="absolute left-1/2 top-14 -translate-x-1/2 text-center animate-bounce">
                <div className="w-11 h-11 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-xl border-2 border-white mx-auto">
                  <Bike className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-black bg-orange-600 text-white px-2 py-0.5 rounded-full shadow mt-1 inline-block">
                  Hero EV ({eta}m)
                </span>
              </div>

              {/* Destination Pin */}
              <div className="absolute right-6 top-8 text-center">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white mx-auto">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black bg-emerald-700 text-white px-2 py-0.5 rounded shadow mt-1 inline-block">
                  You
                </span>
              </div>
            </div>

            {/* Address Details */}
            <div className="p-4 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">Destination:</span>
                  <p className="text-stone-600">{liveOrder.destinationAddress}</p>
                </div>
              </div>

              {liveOrder.fulfillmentMode === 'takeaway' && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-950 mt-2 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Key className="w-4 h-4 text-blue-600" />
                    <span>Campus Parcel Locker Box #A12</span>
                  </div>
                  <p className="text-[11px] text-blue-800">
                    Your locker pin is: <strong className="font-mono text-sm tracking-wider text-blue-900">{liveOrder.parcelLockerCode || 'LOCKER-BOX-A12'}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rider / Partner Contact Card */}
          {liveOrder.fulfillmentMode === 'delivery' && (
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-black text-lg">
                    {liveOrder.riderName ? liveOrder.riderName.charAt(0) : 'R'}
                  </div>
                  <div>
                    <h3 className="font-black text-stone-900 text-sm">{liveOrder.riderName || 'Ramesh Kumar'}</h3>
                    <p className="text-xs text-stone-500">{liveOrder.riderVehicle || 'Hero Electric EV • KA-05-EV-4192'}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1">
                      ⭐ 4.95 Rating • Vaccinated & Thermal Insulated
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${liveOrder.riderPhone || '+919845122390'}`}
                  className="py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </a>
                <button
                  type="button"
                  onClick={() => alert(`Connecting via WhatsApp to rider ${liveOrder.riderName}...`)}
                  className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-stone-600" />
                  <span>Send Directions</span>
                </button>
              </div>
            </div>
          )}

          {/* Need Help Card */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 text-xs text-stone-600 space-y-2">
            <h4 className="font-bold text-stone-900">Need support with this tiffin?</h4>
            <p>Our kitchen concierge is active 7:00 AM - 10:30 PM for instant slot rescheduling or meal pause.</p>
            <Link
              href="/"
              className="inline-block font-bold text-orange-600 hover:underline pt-1"
            >
              Contact My Chef Concierge →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
