'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  Save, 
  ShieldCheck,
  Users,
  Check,
  Award,
  Thermometer,
  FileText,
  CreditCard,
  Download,
  AlertTriangle,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface MockSubscriber {
  id: string;
  name: string;
  plan: string;
  slot: string;
  address: string;
  status: string;
  todayReady: boolean;
}

interface HygieneCheckItem {
  id: string;
  label: string;
  desc: string;
  completed: boolean;
}

interface PayoutRecord {
  id: string;
  weekRange: string;
  grossAmount: number;
  platformFee: number;
  netPayout: number;
  utrNumber: string;
  settledDate: string;
  status: 'Settled' | 'Processing';
}

export default function ProviderDashboardPage() {
  const { providers, updateProviderMenu } = useApp();
  
  // Use first provider as the active partner kitchen session
  const provider = providers[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'subscribers' | 'earnings' | 'hygiene'>('overview');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedMealType, setSelectedMealType] = useState<'lunch' | 'dinner'>('lunch');
  
  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [mockSubscribers, setMockSubscribers] = useState<MockSubscriber[]>([
    { id: 'sub-1', name: 'Rohan Verma', plan: 'Ghar Ki Thali (Monthly)', slot: 'Lunch', address: 'Flat 402, Green Glen, Bellandur', status: 'Active', todayReady: true },
    { id: 'sub-2', name: 'Ananya Deshmukh', plan: 'Shahi Royal Thali (Monthly)', slot: 'Lunch', address: 'Tower B, RMZ Ecoworld, Bellandur', status: 'Active', todayReady: true },
    { id: 'sub-3', name: 'Karthik S.', plan: 'Ghar Ki Thali (Weekly)', slot: 'Dinner', address: 'Sector 2, HSR Layout', status: 'Active', todayReady: false },
    { id: 'sub-4', name: 'Pooja Agarwal', plan: 'Fit & Light Diet (Monthly)', slot: 'Lunch', address: '14th Main, Koramangala 4th Block', status: 'Skipped Today', todayReady: false },
    { id: 'sub-5', name: 'Vikram Joshi', plan: 'Ghar Ki Thali (Monthly)', slot: 'Lunch', address: 'Villa 12, Sobha Silicon Oasis', status: 'Active', todayReady: true },
  ]);

  // FSSAI Hygiene Checklist State
  const [hygieneItems, setHygieneItems] = useState<HygieneCheckItem[]>([
    { id: 'chk-1', label: 'Raw Vegetables & Grain Wash', desc: 'Triple-wash with potassium permanganate solution for leafy greens', completed: true },
    { id: 'chk-2', label: 'Oil Quality & TPC Test', desc: 'Cooking oil total polar compounds checked < 18% (no reuse over 2 cycles)', completed: true },
    { id: 'chk-3', label: 'Staff PPE & Hygiene Compliance', desc: 'Hairnets, non-latex gloves, sanitized aprons worn by all 4 cooks', completed: true },
    { id: 'chk-4', label: 'Steam Sterilization of Stainless Tiffins', desc: 'Tiffins sanitized at 82°C before meal packaging', completed: true },
    { id: 'chk-5', label: 'RO Water Purity Verification', desc: 'TDS checked at 112 ppm, alkaline pH 7.4', completed: true },
    { id: 'chk-6', label: 'Segregated Bio-Waste Disposal', desc: 'Wet kitchen waste composted, non-plastic packaging compliance', completed: false },
  ]);

  // Weekly Payout Records
  const [payoutsList, setPayoutsList] = useState<PayoutRecord[]>([
    { id: 'pay-104', weekRange: 'Sep 22 - Sep 28, 2026', grossAmount: 51200, platformFee: 4096, netPayout: 47104, utrNumber: 'HDFC9842109281', settledDate: 'Sep 29, 2026', status: 'Settled' },
    { id: 'pay-103', weekRange: 'Sep 15 - Sep 21, 2026', grossAmount: 48600, platformFee: 3888, netPayout: 44712, utrNumber: 'HDFC9812904812', settledDate: 'Sep 22, 2026', status: 'Settled' },
    { id: 'pay-102', weekRange: 'Sep 08 - Sep 14, 2026', grossAmount: 45300, platformFee: 3624, netPayout: 41676, utrNumber: 'HDFC9762190823', settledDate: 'Sep 15, 2026', status: 'Settled' },
  ]);

  const [instantPayoutRequested, setInstantPayoutRequested] = useState(false);

  // Fallback if no provider loaded
  if (!provider) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-stone-200 text-center space-y-3">
        <h3 className="font-extrabold text-stone-900 text-base">No Kitchen Session Active</h3>
        <p className="text-xs text-stone-500">Please sign in as a kitchen partner to manage menus and orders.</p>
      </div>
    );
  }

  // Menu edit state
  const currentDayMenu = provider.weeklyMenu.find((m) => m.day === selectedDay) || provider.weeklyMenu[0];
  const activeSlot = selectedMealType === 'lunch' ? currentDayMenu.lunch : currentDayMenu.dinner;

  const [editCurry, setEditCurry] = useState(activeSlot.curry);
  const [editDal, setEditDal] = useState(activeSlot.dal);
  const [editBread, setEditBread] = useState(activeSlot.bread);
  const [editRice, setEditRice] = useState(activeSlot.rice);
  const [editSides, setEditSides] = useState(activeSlot.sides || '');

  // Sync edit state when day or meal type changes
  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    const dayMenu = provider.weeklyMenu.find((m) => m.day === day) || provider.weeklyMenu[0];
    const slot = selectedMealType === 'lunch' ? dayMenu.lunch : dayMenu.dinner;
    setEditCurry(slot.curry);
    setEditDal(slot.dal);
    setEditBread(slot.bread);
    setEditRice(slot.rice);
    setEditSides(slot.sides || '');
  };

  const handleMealTypeChange = (type: 'lunch' | 'dinner') => {
    setSelectedMealType(type);
    const slot = type === 'lunch' ? currentDayMenu.lunch : currentDayMenu.dinner;
    setEditCurry(slot.curry);
    setEditDal(slot.dal);
    setEditBread(slot.bread);
    setEditRice(slot.rice);
    setEditSides(slot.sides || '');
  };

  const handleSaveMenu = (e: React.FormEvent) => {
    e.preventDefault();
    updateProviderMenu(provider.id, selectedDay, selectedMealType, {
      curry: editCurry,
      dal: editDal,
      bread: editBread,
      rice: editRice,
      sides: editSides,
    });
    showToast(`Weekly Menu updated successfully for ${selectedDay} (${selectedMealType})!`);
  };

  const togglePacked = (subId: string) => {
    setMockSubscribers((prev) => 
      prev.map((s) => s.id === subId ? { ...s, todayReady: !s.todayReady } : s)
    );
  };

  const toggleHygieneItem = (id: string) => {
    setHygieneItems((prev) => 
      prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
    );
    showToast('Hygiene audit log updated.');
  };

  const handleRequestInstantPayout = () => {
    setInstantPayoutRequested(true);
    showToast('Instant payout of ₹28,400 initiated via Razorpay Route! Crediting HDFC A/C **8912 in 15 minutes.');
  };

  // Compute live hygiene score out of 100
  const completedChecks = hygieneItems.filter(i => i.completed).length;
  const hygieneScore = Math.round((completedChecks / hygieneItems.length) * 100);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top-4 border border-stone-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-14 h-14 rounded-2xl object-cover border border-stone-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-900">{provider.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>FSSAI Certified Kitchen</span>
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Head Chef: <span className="font-semibold text-stone-700">{provider.ownerName}</span> • FSSAI Lic: <span className="font-mono font-bold text-stone-800">{provider.fssaiNumber}</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Daily Prep
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'menu' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Weekly Menu Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('subscribers')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'subscribers' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Subscribers ({mockSubscribers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('earnings')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'earnings' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Weekly Earnings & Payouts</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('hygiene')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'hygiene' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>FSSAI Hygiene Standards</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DAILY PREP & LIVE METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                <span>Today&apos;s Lunch Prep</span>
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-stone-900">48</span>
                <span className="text-xs font-bold text-emerald-600">38 Prepared</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-orange-600 h-full w-[79%]"></div>
              </div>
              <p className="text-[11px] text-stone-400">Dispatch window: 11:45 AM - 12:30 PM</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                <span>Today&apos;s Dinner Prep</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-stone-900">32</span>
                <span className="text-xs font-bold text-stone-500">Orders Confirmed</span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[20%]"></div>
              </div>
              <p className="text-[11px] text-stone-400">Prep starts at 5:00 PM</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                <span>Active Subscribers</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-stone-900">{provider.subscriberCount}</span>
                <span className="text-xs font-bold text-emerald-600">+6 this week</span>
              </div>
              <p className="text-[11px] text-stone-400">Avg subscription: 24.2 days</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
                <span>Weekly Net Balance</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-stone-900">₹48,208</span>
                <span className="text-xs font-bold text-emerald-600">Settles Mon</span>
              </div>
              <p className="text-[11px] text-stone-400">HDFC Bank A/C **8912</p>
            </div>

          </div>

          {/* Live Kitchen Orders Dispatch Status */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-stone-900">Today&apos;s Dispatch List</h3>
                <p className="text-xs text-stone-500">Live checklist for lunch deliveries across Bellandur & HSR Layout</p>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-xl">
                Ready: {mockSubscribers.filter(s => s.todayReady).length} / {mockSubscribers.length}
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {mockSubscribers.map((sub) => (
                <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{sub.name}</h4>
                    <p className="text-stone-500">{sub.plan} • Slot: {sub.slot}</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{sub.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      sub.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status}
                    </span>
                    <button 
                      type="button"
                      onClick={() => togglePacked(sub.id)}
                      className={`px-3 py-1.5 border rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        sub.todayReady 
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800' 
                          : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {sub.todayReady ? 'Packed ✓' : 'Mark Ready'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MENU EDITOR */}
      {activeTab === 'menu' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-stone-900">Weekly Menu Configuration</h3>
              <p className="text-xs text-stone-500">Subscribers see this rotating menu in advance to decide meal choices</p>
            </div>
            
            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleMealTypeChange('lunch')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedMealType === 'lunch' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600'
                }`}
              >
                Lunch
              </button>
              <button
                type="button"
                onClick={() => handleMealTypeChange('dinner')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  selectedMealType === 'dinner' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600'
                }`}
              >
                Dinner
              </button>
            </div>
          </div>

          {/* Days Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayChange(day)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedDay === day 
                    ? 'bg-orange-600 text-white shadow-xs' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSaveMenu} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Sabzi / Gravy Curry</label>
                <input
                  type="text"
                  required
                  value={editCurry}
                  onChange={(e) => setEditCurry(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Dal / Legume Preparation</label>
                <input
                  type="text"
                  required
                  value={editDal}
                  onChange={(e) => setEditDal(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Roti / Bread Selection</label>
                <input
                  type="text"
                  required
                  value={editBread}
                  onChange={(e) => setEditBread(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Rice / Pulao Item</label>
                <input
                  type="text"
                  required
                  value={editRice}
                  onChange={(e) => setEditRice(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-stone-700 block mb-1">Accompaniments & Sides</label>
                <input
                  type="text"
                  value={editSides}
                  onChange={(e) => setEditSides(e.target.value)}
                  placeholder="e.g. Roasted Papad, Boondi Raita, Gulab Jamun"
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Publish Menu</span>
            </button>
          </form>

        </div>
      )}

      {/* TAB 3: SUBSCRIBERS */}
      {activeTab === 'subscribers' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-stone-900">Customer Roster</h3>
              <p className="text-xs text-stone-500">All recurring subscribers delivering to Bellandur & Koramangala</p>
            </div>
            <button 
              type="button"
              onClick={() => showToast('Dispatch list exported as CSV successfully!')}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs cursor-pointer transition-colors"
            >
              Export Dispatch CSV
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {mockSubscribers.map((sub) => (
              <div key={sub.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{sub.name}</h4>
                  <p className="text-stone-500">{sub.plan} • Slot: {sub.slot}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{sub.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    sub.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {sub.status}
                  </span>
                  <button 
                    type="button"
                    onClick={() => togglePacked(sub.id)}
                    className={`px-3 py-1.5 border rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      sub.todayReady 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800' 
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {sub.todayReady ? 'Packed ✓' : 'Mark Ready'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WEEKLY EARNINGS & PAYOUTS */}
      {activeTab === 'earnings' && (
        <div className="space-y-6">
          
          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-stone-500 block">Current Week Gross Sales</span>
              <span className="text-2xl font-black text-stone-900">₹52,400</span>
              <span className="text-[11px] text-emerald-600 font-bold block">48 Active Subscribers</span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-stone-500 block">Platform Commission (8%)</span>
              <span className="text-2xl font-black text-red-600">-₹4,192</span>
              <span className="text-[11px] text-stone-400 block">Zero hidden deductions</span>
            </div>

            <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-emerald-800 block">Net Payout to Bank</span>
              <span className="text-2xl font-black text-emerald-900">₹48,208</span>
              <span className="text-[11px] text-emerald-700 font-bold block">Settlement: Monday 9:00 AM</span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-stone-500 block">Immediate Payout</span>
                <span className="text-[11px] text-stone-400">Withdraw to UPI / NEFT</span>
              </div>
              <button
                type="button"
                disabled={instantPayoutRequested}
                onClick={handleRequestInstantPayout}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{instantPayoutRequested ? 'Payout Initiated ✓' : 'Instant Early Payout'}</span>
              </button>
            </div>
          </div>

          {/* Bank & Settlement Details Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <h3 className="text-base font-extrabold text-stone-900">Settlement Account Details</h3>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Verified Bank Mandate
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl">
                <span className="text-stone-400 block mb-0.5">Primary Bank</span>
                <span className="font-bold text-stone-900 block text-sm">HDFC Bank Ltd</span>
                <span className="text-stone-500 font-mono">A/C: ************8912</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl">
                <span className="text-stone-400 block mb-0.5">IFSC Code</span>
                <span className="font-bold text-stone-900 block text-sm font-mono">HDFC0001758</span>
                <span className="text-stone-500">Bellandur Branch, Bengaluru</span>
              </div>
              <div className="p-4 bg-stone-50 rounded-2xl">
                <span className="text-stone-400 block mb-0.5">Linked UPI ID</span>
                <span className="font-bold text-stone-900 block text-sm font-mono">annapoorna@okhdfcbank</span>
                <span className="text-emerald-600 font-semibold">Razorpay Route Connected</span>
              </div>
            </div>
          </div>

          {/* Historical Payout Ledger */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-stone-900">Weekly Payout Ledger</h3>
                <p className="text-xs text-stone-500">Every Monday automated transfer history via Razorpay Route</p>
              </div>
              <button 
                type="button"
                onClick={() => showToast('Financial Statement downloaded for FY 2026-27.')}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Statement</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100">
              {payoutsList.map((payout) => (
                <div key={payout.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{payout.weekRange}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {payout.status}
                      </span>
                    </div>
                    <p className="text-stone-500 mt-0.5">
                      Gross: ₹{payout.grossAmount.toLocaleString()} • Platform Fee (8%): -₹{payout.platformFee.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                      Bank UTR: {payout.utrNumber} • Settled on {payout.settledDate}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-emerald-700 block">
                      +₹{payout.netPayout.toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => showToast(`Invoice ${payout.id} downloaded.`)}
                      className="text-orange-600 hover:underline text-[11px] font-semibold cursor-pointer"
                    >
                      Download Invoice PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: FSSAI HYGIENE STANDARDS */}
      {activeTab === 'hygiene' && (
        <div className="space-y-6">
          
          {/* FSSAI Verified Badge & Certificate Card */}
          <div className="bg-gradient-to-r from-emerald-900 via-stone-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Government Food Safety & Standards Authority of India</span>
              </div>
              <h2 className="text-2xl font-black">FSSAI Certified Cloud Partner</h2>
              <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                Registered under Central Licensing Regulation (FSS Act 2006). All food is prepared under strict Good Manufacturing Practices (GMP) and Good Hygiene Practices (GHP).
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs">
                <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">License Number</span>
                  <span className="font-mono font-bold text-white">{provider.fssaiNumber}</span>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Validity Period</span>
                  <span className="font-bold text-emerald-400">Valid until 18 Nov 2028</span>
                </div>
                <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="text-stone-400 block text-[10px]">Audit Rating</span>
                  <span className="font-bold text-white">Grade A+ (Clean Kitchen Verified)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center bg-white/10 p-5 rounded-2xl border border-white/10 text-center shrink-0">
              <span className="text-3xl font-black text-emerald-400">{hygieneScore}/100</span>
              <span className="text-[11px] font-bold text-stone-300 uppercase tracking-wider mt-1">
                Live Hygiene Score
              </span>
              <button
                type="button"
                onClick={() => showToast('Official FSSAI Certificate downloaded.')}
                className="mt-3 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>
            </div>
          </div>

          {/* Temperature & Storage Chamber Logs */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-600" />
                <h3 className="text-base font-extrabold text-stone-900">Live Kitchen Cold Chain & Hot Holding Logs</h3>
              </div>
              <span className="text-xs font-semibold text-stone-400">Probes synced 5m ago</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="text-blue-800 font-semibold block">Deep Freezer (Paneer / Peas)</span>
                  <span className="text-stone-500 text-[11px]">Safe target: &lt; -15°C</span>
                </div>
                <span className="text-xl font-black text-blue-900">-18.4°C</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-emerald-800 font-semibold block">Chilled Prep Cooler (Curd / Milk)</span>
                  <span className="text-stone-500 text-[11px]">Safe target: 0°C to 4°C</span>
                </div>
                <span className="text-xl font-black text-emerald-900">3.2°C</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-amber-800 font-semibold block">Hot Dispatch Well (Dal & Curries)</span>
                  <span className="text-stone-500 text-[11px]">Safe target: &gt; 65°C</span>
                </div>
                <span className="text-xl font-black text-amber-900">68.5°C</span>
              </div>
            </div>
          </div>

          {/* Daily Interactive Hygiene Checklist */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-stone-900">Daily Food Safety & Sanitation Checklist</h3>
                <p className="text-xs text-stone-500">Every morning compliance before start of kitchen gas stoves</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {completedChecks} of {hygieneItems.length} Verified
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {hygieneItems.map((item) => (
                <div key={item.id} className="py-3.5 flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{item.label}</span>
                      {item.completed && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Passed ✓
                        </span>
                      )}
                    </div>
                    <p className="text-stone-500">{item.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleHygieneItem(item.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-colors shrink-0 ${
                      item.completed 
                        ? 'bg-emerald-600 text-white shadow-2xs' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {item.completed ? 'Completed' : 'Verify Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
