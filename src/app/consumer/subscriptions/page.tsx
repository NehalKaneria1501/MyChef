'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  CalendarCheck, 
  MapPin, 
  Pause, 
  Play, 
  SkipForward, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  UtensilsCrossed,
  ArrowRight,
  Clock,
  ShieldCheck,
  Zap,
  TrendingDown,
  Calendar,
  Sparkles,
  HelpCircle,
  Check
} from 'lucide-react';

export default function MySubscriptionsPage() {
  const { subscriptions, skipNextMeal, togglePauseSubscription, cancelSubscription } = useApp();
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Weekly vs Monthly comparison interactive state
  const [comparisonPlan, setComparisonPlan] = useState<'weekly' | 'monthly'>('monthly');

  // Interactive Pause Date range state
  const [pauseDuration, setPauseDuration] = useState<'3' | '7' | '14' | 'custom'>('7');
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);

  const activeSub = subscriptions.find((s) => s.status === 'active' || s.status === 'paused');
  const pastSubs = subscriptions.filter((s) => s.id !== activeSub?.id);

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleSkip = (id: string) => {
    skipNextMeal(id);
    showToast('Next meal has been skipped! +1 day automatically added to your plan end date.');
  };

  const handlePause = (id: string, currentStatus: string) => {
    togglePauseSubscription(id);
    showToast(
      currentStatus === 'active' 
        ? 'Subscription paused. Your meal credits are safely locked until you resume.' 
        : 'Subscription resumed! Your fresh daily meals will restart from tomorrow morning.'
    );
  };

  const handleConfirmScheduledPause = () => {
    if (!activeSub) return;
    if (activeSub.status === 'active') {
      togglePauseSubscription(activeSub.id);
    }
    setIsPauseModalOpen(false);
    showToast(`Pause scheduled for ${pauseDuration} days. Meal credits frozen with zero forfeiture!`);
  };

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel? Any remaining unconsumed meal credits will be refunded to your original payment method within 3-5 working days.')) {
      cancelSubscription(id);
      showToast('Subscription cancelled. Refund has been initiated.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast feedback */}
      {notificationMsg && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Consumer Subscription Desk</h1>
          <p className="text-xs text-stone-500 mt-1">
            Manage your daily home meals, review weekly vs monthly plans, and configure skip / pause policies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span>Browse More Tiffins</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {!activeSub ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">No Active Subscription</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You don&apos;t have any active tiffin plans right now. Choose a neighborhood home-chef to start receiving daily wholesome meals!
          </p>
          <Link
            href="/explore"
            className="inline-block px-5 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-xs"
          >
            Find Tiffins Nearby
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* ACTIVE SUBSCRIPTION HERO CARD */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
            
            {/* Header Status Bar */}
            <div className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              activeSub.status === 'active' ? 'bg-orange-50/60 border-orange-100' : 'bg-stone-100/70 border-stone-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  activeSub.status === 'active' ? 'bg-orange-600 text-white' : 'bg-stone-500 text-white'
                }`}>
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-stone-900 text-base">{activeSub.collectionName}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      activeSub.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {activeSub.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 capitalize">
                      {activeSub.planDuration} Plan
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Partner: <span className="text-stone-800 font-semibold">{activeSub.providerName}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-stone-500 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                  ID: {activeSub.id}
                </span>
              </div>
            </div>

            {/* Today's Delivery Tracker & Quick Cutoff Warning */}
            <div className="p-6 bg-stone-50/80 border-b border-stone-200/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                  </span>
                  <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Today&apos;s Meal Status (Slot: {activeSub.deliverySlot})
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {activeSub.status === 'active' ? 'Prep in Progress' : 'Delivery Paused'}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-stone-900">Today&apos;s Fresh Menu:</h4>
                  <p className="text-xs text-stone-600">
                    Paneer Bhurji Gravy, Yellow Dal Tadka, 4 Ghee Phulkas, Steamed Jeera Rice, Curd & Salad
                  </p>
                  <p className="text-[11px] text-stone-400 flex items-center gap-1 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>Delivering to: {activeSub.deliveryAddress.street} ({activeSub.deliveryAddress.pincode})</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSkip(activeSub.id)}
                    disabled={activeSub.status !== 'active'}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
                  >
                    <SkipForward className="w-3.5 h-3.5" />
                    <span>Skip Tomorrow&apos;s Meal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPauseModalOpen(true)}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>Schedule Pause</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Meals Progress Counters */}
            <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-b border-stone-200">
              <div className="p-3 bg-stone-50 rounded-2xl">
                <span className="text-xs text-stone-500 block">Total Plan Meals</span>
                <span className="text-xl font-black text-stone-900">{activeSub.totalMeals}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl">
                <span className="text-xs text-stone-500 block">Delivered So Far</span>
                <span className="text-xl font-black text-emerald-600">{activeSub.deliveredMeals}</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100">
                <span className="text-xs text-amber-700 font-bold block">Meals Skipped (Rolled Over)</span>
                <span className="text-xl font-black text-amber-600">{activeSub.skippedMeals}</span>
              </div>
              <div className="p-3 bg-orange-50 rounded-2xl border border-orange-100">
                <span className="text-xs text-orange-700 font-bold block">Remaining Meals</span>
                <span className="text-xl font-black text-orange-600">{activeSub.remainingMeals}</span>
              </div>
            </div>

            {/* Subscription Actions */}
            <div className="p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handlePause(activeSub.id, activeSub.status)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {activeSub.status === 'active' ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-500" />
                      <span>Instant Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Resume Subscription</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleCancel(activeSub.id)}
                  className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel Plan & Refund</span>
                </button>
              </div>

              <div className="text-xs text-stone-400">
                Paid: ₹{activeSub.amountPaid} • Gateway Ref: {activeSub.paymentId}
              </div>
            </div>

          </div>

          {/* SECTION 1: WEEKLY VS MONTHLY PLANS COMPARISON */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Consumer Decision Matrix</span>
                </div>
                <h3 className="text-xl font-extrabold text-stone-900">Weekly vs Monthly Plans</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Understand flexibility, savings, and rollover benefits to choose what fits your lifestyle best.
                </p>
              </div>

              {/* Plan Switch Selector */}
              <div className="flex bg-stone-100 p-1 rounded-2xl border border-stone-200 self-start sm:self-auto text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setComparisonPlan('weekly')}
                  className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                    comparisonPlan === 'weekly' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Weekly Trial Plan
                </button>
                <button
                  type="button"
                  onClick={() => setComparisonPlan('monthly')}
                  className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                    comparisonPlan === 'monthly' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Monthly Value Plan (Save 24%)
                </button>
              </div>
            </div>

            {/* Comparison Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Weekly Plan Card */}
              <div className={`p-6 rounded-3xl border-2 transition-all space-y-4 ${
                comparisonPlan === 'weekly' ? 'border-orange-500 bg-orange-50/20' : 'border-stone-200 bg-white'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                    High Flexibility
                  </span>
                  <span className="text-xs font-bold text-stone-400">6 Days / Week</span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-stone-900">Weekly Flex Pass</h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-stone-900">₹690</span>
                    <span className="text-xs text-stone-500 font-medium">/ 6 meals (₹115/meal)</span>
                  </div>
                </div>

                <ul className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-100">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>1 Meal Skip Permitted:</strong> Roll over up to 1 meal to the next week.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No Long-Term Lock-in:</strong> Perfect for temporary stays, exams, or chef tasting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Daily Lunch or Dinner:</strong> Choice of preferred time slot.</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    setComparisonPlan('weekly');
                    showToast('Weekly plan configuration selected! You can switch on your next renewal.');
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    comparisonPlan === 'weekly' 
                      ? 'bg-orange-600 text-white shadow-xs' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {comparisonPlan === 'weekly' ? 'Active Comparison' : 'Select Weekly Plan'}
                </button>
              </div>

              {/* Monthly Plan Card */}
              <div className={`p-6 rounded-3xl border-2 transition-all space-y-4 relative ${
                comparisonPlan === 'monthly' ? 'border-orange-500 bg-orange-50/20' : 'border-stone-200 bg-white'
              }`}>
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-xs">
                  Most Popular • Save ₹572/mo
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Maximum Savings</span>
                  </span>
                  <span className="text-xs font-bold text-stone-400">26 Days / Month</span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-stone-900">Monthly Wholesome Pass</h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-stone-900">₹2,288</span>
                    <span className="text-xs text-stone-500 font-medium">/ 26 meals (₹88/meal)</span>
                  </div>
                </div>

                <ul className="text-xs text-stone-600 space-y-2 pt-2 border-t border-stone-100">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>5 Rollover Skips Allowed:</strong> Never lose a rupee if you eat out or travel.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Complimentary Sunday Special:</strong> Free home-made sweet / kheer twice a month.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Pause Protection:</strong> Vacation pause up to 14 consecutive days.</span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={() => {
                    setComparisonPlan('monthly');
                    showToast('Monthly value plan selected! You are enjoying optimal ₹88/meal pricing.');
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    comparisonPlan === 'monthly' 
                      ? 'bg-orange-600 text-white shadow-xs' 
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {comparisonPlan === 'monthly' ? 'Currently Selected Value Plan' : 'Switch to Monthly (Save ₹572)'}
                </button>
              </div>

            </div>

          </div>

          {/* SECTION 2: SKIP & PAUSE POLICY ENGINE */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Forfeiture Guarantee</span>
              </div>
              <h3 className="text-xl font-extrabold text-stone-900">Skip & Pause Policy Engine</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Our kitchen partners purchase fresh produce each morning. Timely skips ensure zero food wastage.
              </p>
            </div>

            {/* Cutoff Timers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-stone-900">Lunch Meal Cutoff</h4>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                      8:00 AM Same Day
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Skip or pause before <strong>8:00 AM</strong> for today&apos;s lunch. Kitchen procurement & tadka preparation commences promptly at 8:15 AM.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-stone-900">Dinner Meal Cutoff</h4>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-200 text-blue-900">
                      4:00 PM Same Day
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Skip or pause before <strong>4:00 PM</strong> for dinner delivery. Fresh phulkas and evening curries begin baking at 4:30 PM.
                  </p>
                </div>
              </div>

            </div>

            {/* Transparent Policy Rules Table */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 text-xs">
              <div className="p-4 bg-stone-50 flex items-center justify-between font-bold text-stone-700">
                <span>Policy Clause</span>
                <span>My Chef Consumer Terms</span>
              </div>
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-stone-900 block">Meal Credit Rollover</span>
                  <span className="text-stone-500 text-[11px]">When you skip a meal prior to the cutoff time</span>
                </div>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 self-start sm:self-auto">
                  100% Value Rollover (+1 Day Extension)
                </span>
              </div>
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-stone-900 block">Vacation Pause Allowance</span>
                  <span className="text-stone-500 text-[11px]">Out of town or visiting hometown</span>
                </div>
                <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 self-start sm:self-auto">
                  Up to 14 Days Freezed Without Expiry
                </span>
              </div>
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-stone-900 block">Emergency Late Cancellation</span>
                  <span className="text-stone-500 text-[11px]">Notice within 2 hours after cutoff</span>
                </div>
                <span className="font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 self-start sm:self-auto">
                  50% Credit Recovery via Support Desk
                </span>
              </div>
            </div>

          </div>

          {/* SCHEDULE PAUSE MODAL */}
          {isPauseModalOpen && (
            <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-stone-200 shadow-2xl space-y-5 animate-in zoom-in-95">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <h3 className="font-black text-stone-900 text-base">Schedule Subscription Pause</h3>
                  </div>
                  <button
                    onClick={() => setIsPauseModalOpen(false)}
                    className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-stone-500">
                  Select your pause duration. No meals will be cooked or billed during this period, and your plan expiry will be extended by the exact number of paused days.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {(['3', '7', '14'] as const).map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setPauseDuration(days)}
                      className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        pauseDuration === days 
                          ? 'border-orange-600 bg-orange-50 text-orange-700 shadow-xs' 
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {days} Days
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl text-xs text-stone-600 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your active plan has <strong>{activeSub.remainingMeals} meal credits</strong> locked safely.</span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPauseModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmScheduledPause}
                    className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold cursor-pointer shadow-xs"
                  >
                    Activate Pause
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PREVIOUS / OTHER SUBSCRIPTIONS LOG (IF ANY) */}
          {pastSubs.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="text-base font-extrabold text-stone-900">Other / Past Subscriptions</h3>
              <div className="divide-y divide-stone-100">
                {pastSubs.map((sub) => (
                  <div key={sub.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{sub.collectionName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          sub.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px] mt-0.5">{sub.providerName} • {sub.planDuration.toUpperCase()}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="font-extrabold text-stone-900 block">₹{sub.amountPaid}</span>
                      <span className="text-[10px] text-stone-400 font-mono">ID: {sub.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
