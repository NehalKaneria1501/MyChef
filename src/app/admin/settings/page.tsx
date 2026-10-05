'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  CreditCard, 
  Percent, 
  Bell, 
  Truck, 
  Sliders, 
  RefreshCw,
  UtensilsCrossed,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Flame,
  Settings as SettingsIcon,
  ChefHat
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Delivery Slot Configs
  const [lunchEarlyCutoff, setLunchEarlyCutoff] = useState('09:00 AM');
  const [lunchPeakCutoff, setLunchPeakCutoff] = useState('10:30 AM');
  const [dinnerEarlyCutoff, setDinnerEarlyCutoff] = useState('04:30 PM');
  const [dinnerLateCutoff, setDinnerLateCutoff] = useState('06:00 PM');
  const [guaranteeLateThreshold, setGuaranteeLateThreshold] = useState('15');

  // Regional Cuisines Toggles
  const [afroVegActive, setAfroVegActive] = useState(true);
  const [northIndianActive, setNorthIndianActive] = useState(true);
  const [kathiyawadiActive, setKathiyawadiActive] = useState(true);
  const [punekarActive, setPunekarActive] = useState(true);
  const [rajasthaniActive, setRajasthaniActive] = useState(true);
  const [southIndianActive, setSouthIndianActive] = useState(true);

  // African Vegetarian Menu Highlighting
  const [showAfroVegBanner, setShowAfroVegBanner] = useState(true);
  const [selectedAfroChef, setSelectedAfroChef] = useState('Kilimanjaro Afro-Veg Kitchen');

  // Financial & Mandate Settings
  const [mandateRetryAttempts, setMandateRetryAttempts] = useState('3');
  const [gracePeriodHours, setGracePeriodHours] = useState('48');
  const [platformCommissionRegular, setPlatformCommissionRegular] = useState('8.5');
  const [platformCommissionStudent, setPlatformCommissionStudent] = useState('5.0');

  // Notification Toggles
  const [whatsappMorningMenu, setWhatsappMorningMenu] = useState(true);
  const [smsDeliveryOtp, setSmsDeliveryOtp] = useState(true);
  const [evRiderGpsAlerts, setEvRiderGpsAlerts] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform operational settings, delivery slots & African Vegetarian menu configurations successfully updated!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1.5">
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Command Center</span>
            </Link>
            <span className="text-stone-600">•</span>
            <span className="flex items-center gap-1 text-blue-400">
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Platform Settings</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Operations & Global Menu Settings
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Manage daily meal delivery slot cutoffs, regional cuisine catalogs (including the new African Vegetarian menu), Razorpay auto-debit rules, and partner commission rates.
          </p>
        </div>

        {/* Action Button & Link back */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-bold transition-all cursor-pointer"
          >
            Dashboard
          </Link>
          <button
            onClick={handleSaveSettings}
            className="px-5 py-2.5 rounded-xl bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-orange-600/30 transition-all hover:scale-102 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Settings</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* 1. DELIVERY SLOTS & CUTOFF CONTROLS */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Dispatch Architecture</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                Delivery Slots & Kitchen Cutoff Timers
              </h2>
              <p className="text-xs text-stone-500">
                Configure when kitchens finalize small-batch food preparation and EV delivery loops depart.
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold">
              6 Active Dispatch Windows
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="text-xs font-extrabold text-stone-800 block">
                Early Lunch Cutoff (11:30 AM Slot)
              </label>
              <input
                type="text"
                value={lunchEarlyCutoff}
                onChange={(e) => setLunchEarlyCutoff(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-[11px] text-stone-500 block">Dispatch Window: 11:30 AM - 12:30 PM</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="text-xs font-extrabold text-stone-800 block">
                Peak Lunch Cutoff (12:30 PM Slot)
              </label>
              <input
                type="text"
                value={lunchPeakCutoff}
                onChange={(e) => setLunchPeakCutoff(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-[11px] text-stone-500 block">Dispatch Window: 12:30 PM - 01:45 PM</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="text-xs font-extrabold text-stone-800 block">
                Early Dinner Cutoff (07:00 PM Slot)
              </label>
              <input
                type="text"
                value={dinnerEarlyCutoff}
                onChange={(e) => setDinnerEarlyCutoff(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-[11px] text-stone-500 block">Dispatch Window: 07:00 PM - 08:15 PM</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="text-xs font-extrabold text-stone-800 block">
                Night Owl Cutoff (08:30 PM Slot)
              </label>
              <input
                type="text"
                value={dinnerLateCutoff}
                onChange={(e) => setDinnerLateCutoff(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-[11px] text-stone-500 block">Dispatch Window: 08:30 PM - 09:45 PM</span>
            </div>
          </div>

          {/* Late Delivery Guarantee Threshold */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600" />
                <span>On-Time Delivery Guarantee Threshold</span>
              </h4>
              <p className="text-[11px] text-stone-600">
                If the rider exceeds this arrival buffer past the slot window, the meal is automatically credited back to user.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <input
                type="number"
                value={guaranteeLateThreshold}
                onChange={(e) => setGuaranteeLateThreshold(e.target.value)}
                className="w-20 px-3 py-1.5 bg-white border border-orange-300 rounded-xl text-xs font-black text-center text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-xs font-bold text-stone-700">minutes buffer</span>
            </div>
          </div>
        </div>

        {/* 2. REGIONAL CUISINES & AFRICAN VEGETARIAN MENU */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                <Globe2 className="w-4 h-4 text-emerald-500" />
                <span>Culinary Catalogs & Regional Cuisines</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                Regional Cuisines & African Vegetarian Menu
              </h2>
              <p className="text-xs text-stone-500">
                Activate or toggle regional menus on the live customer portal and home page hero slider.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 text-xs font-extrabold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>African Veg Live</span>
            </span>
          </div>

          {/* African Vegetarian Showcase Box */}
          <div className="p-5 rounded-3xl bg-linear-to-br from-emerald-950 via-stone-900 to-emerald-950 text-white border border-emerald-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-800/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                    <span>African Vegetarian Culinary Menu</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-stone-950 uppercase tracking-wider">
                      Featured Regional Menu
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-200/80">
                    Featuring authentic Ethiopian Teff Injera, Shiro Wat, West African Jollof, Moroccan Tagines & Sukuma Wiki.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setAfroVegActive(!afroVegActive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                    afroVegActive 
                      ? 'bg-emerald-500 text-stone-950 shadow-md' 
                      : 'bg-stone-800 text-stone-400 border border-stone-700'
                  }`}
                >
                  {afroVegActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  <span>{afroVegActive ? 'Menu Visible' : 'Menu Paused'}</span>
                </button>
              </div>
            </div>

            {/* African Veg Menu Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-emerald-400 font-extrabold uppercase">Dish 1 • Ethiopian</span>
                <h4 className="font-bold text-white">Shiro & Misir Wat Injera</h4>
                <p className="text-[11px] text-stone-300">Spiced chickpea stew, red lentils & 3 teff injeras</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-amber-400 font-extrabold uppercase">Dish 2 • West African</span>
                <h4 className="font-bold text-white">Smoky Jollof & Kelewele</h4>
                <p className="text-[11px] text-stone-300">Tomato jollof, fried spiced plantains & egusi</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-purple-400 font-extrabold uppercase">Dish 3 • Moroccan</span>
                <h4 className="font-bold text-white">Apricot & Chickpea Tagine</h4>
                <p className="text-[11px] text-stone-300">Saffron cinnamon tagine with steamed couscous</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-blue-400 font-extrabold uppercase">Dish 4 • South African</span>
                <h4 className="font-bold text-white">Veggie Bunny Chow</h4>
                <p className="text-[11px] text-stone-300">Durban curried beans in loaf with sukuma wiki</p>
              </div>
            </div>
          </div>

          {/* Regional Cuisines Toggle Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            {[
              { name: 'North Indian', active: northIndianActive, toggle: () => setNorthIndianActive(!northIndianActive) },
              { name: 'Kathiyawadi', active: kathiyawadiActive, toggle: () => setKathiyawadiActive(!kathiyawadiActive) },
              { name: 'South Indian', active: southIndianActive, toggle: () => setSouthIndianActive(!southIndianActive) },
              { name: 'Punekar Mess', active: punekarActive, toggle: () => setPunekarActive(!punekarActive) },
              { name: 'Rajasthani', active: rajasthaniActive, toggle: () => setRajasthaniActive(!rajasthaniActive) },
              { name: 'African Veg', active: afroVegActive, toggle: () => setAfroVegActive(!afroVegActive) },
            ].map((cuisine, idx) => (
              <button
                key={idx}
                type="button"
                onClick={cuisine.toggle}
                className={`p-3 rounded-2xl border text-center font-extrabold text-xs transition-all cursor-pointer ${
                  cuisine.active 
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-2xs' 
                    : 'border-stone-200 bg-stone-50 text-stone-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {cuisine.active ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="w-3 h-3 rounded-full border border-stone-300 inline-block" />
                  )}
                  <span>{cuisine.active ? 'Active' : 'Disabled'}</span>
                </div>
                <span>{cuisine.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. AUTO-DEBIT & COMMISSIONS */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span>Financial Engine & Mandates</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-stone-900">
                Razorpay Auto-Debit & Partner Commissions
              </h2>
              <p className="text-xs text-stone-500">
                Configure auto-renewal retries for subscriptions and student hostel pass subsidy ratios.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="text-xs font-extrabold text-stone-800 block">
                Failed Mandate Retries
              </label>
              <select
                value={mandateRetryAttempts}
                onChange={(e) => setMandateRetryAttempts(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1 Automatic Retry (24h)</option>
                <option value="2">2 Automatic Retries (48h)</option>
                <option value="3">3 Automatic Retries (72h - Recommended)</option>
              </select>
              <span className="text-[11px] text-stone-500 block">Before subscription moves to paused</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="text-xs font-extrabold text-stone-800 block">
                Student Grace Period (Hours)
              </label>
              <input
                type="number"
                value={gracePeriodHours}
                onChange={(e) => setGracePeriodHours(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-[11px] text-stone-500 block">Allows students to dine while mandate retries</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="text-xs font-extrabold text-stone-800 block">
                Regular Plan Take-Rate (%)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={platformCommissionRegular}
                  onChange={(e) => setPlatformCommissionRegular(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-xs font-bold text-stone-600">%</span>
              </div>
              <span className="text-[11px] text-stone-500 block">Commission on 5★/7★ gourmet kitchens</span>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <label className="text-xs font-extrabold text-stone-800 block">
                Student Mess Take-Rate (%)
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={platformCommissionStudent}
                  onChange={(e) => setPlatformCommissionStudent(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-xs font-bold text-stone-600">%</span>
              </div>
              <span className="text-[11px] text-stone-500 block">Subsidized rate for campus mess partners</span>
            </div>
          </div>
        </div>

        {/* 4. NOTIFICATION & LIVE TRACKING ENGINE */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="pb-3 border-b border-stone-100">
            <h2 className="text-lg sm:text-xl font-black text-stone-900">
              Customer Communications & EV Dispatch Telemetry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-stone-900">WhatsApp Daily Menu (8:00 AM)</h4>
                <p className="text-[11px] text-stone-500">Sends today's lunch sabzi & dal notification</p>
              </div>
              <input
                type="checkbox"
                checked={whatsappMorningMenu}
                onChange={(e) => setWhatsappMorningMenu(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded-md focus:ring-orange-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-stone-900">SMS Delivery OTP on Dispatch</h4>
                <p className="text-[11px] text-stone-500">Provides contactless 4-digit verification code</p>
              </div>
              <input
                type="checkbox"
                checked={smsDeliveryOtp}
                onChange={(e) => setSmsDeliveryOtp(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded-md focus:ring-orange-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-stone-900">Live EV Rider GPS Alerts</h4>
                <p className="text-[11px] text-stone-500">Pings recipient when rider is within 1.5 km</p>
              </div>
              <input
                type="checkbox"
                checked={evRiderGpsAlerts}
                onChange={(e) => setEvRiderGpsAlerts(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded-md focus:ring-orange-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-xl shadow-orange-600/30 transition-all hover:scale-102 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes & Sync Operations</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
