'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  ChefHat, 
  DollarSign, 
  Check, 
  X, 
  Search, 
  Package, 
  Building, 
  CheckCircle2,
  RefreshCw,
  MapPin,
  LifeBuoy,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  Plus,
  Send,
  Zap,
  TrendingUp,
  Clock,
  Sliders,
  Sparkles
} from 'lucide-react';

interface PendingApplication {
  id: string;
  name: string;
  ownerName: string;
  fssaiNumber: string;
  cuisine: string;
  pincode: string;
  appliedDate: string;
  kitchenType: string;
  status: string;
}

interface AutoDebitMandate {
  id: string;
  customerName: string;
  planName: string;
  gatewayMandateId: string;
  authMode: 'UPI Autopay (PhonePe)' | 'UPI Autopay (GPay)' | 'e-NACH Netbanking (HDFC)' | 'Card Token (ICICI)';
  amount: number;
  nextDebitDate: string;
  status: 'Active' | 'Failed' | 'Retrying';
  failureReason?: string;
}

interface ServicePincode {
  pincode: string;
  locality: string;
  city: string;
  activeKitchens: number;
  riderFleet: number;
  slaMinutes: number;
  isLive: boolean;
}

interface SupportTicket {
  id: string;
  customerName: string;
  phone: string;
  subscriptionPlan: string;
  issueType: 'Spilled Dal / Damaged Box' | 'Delivery Delay (>25m)' | 'Dietary Mismatch' | 'Skip Credit Missing';
  priority: 'Urgent' | 'High' | 'Normal';
  description: string;
  timestamp: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  resolutionNote?: string;
}

export default function AdminDashboardPage() {
  const { providers, approveProvider, rejectProvider, subscriptions } = useApp();
  
  const [adminTab, setAdminTab] = useState<
    'approvals' | 'providers' | 'subscriptions' | 'autodebit' | 'pincodes' | 'support'
  >('approvals');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [adminToast, setAdminToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => setAdminToast(null), 3500);
  };

  // Sample pending providers waiting for approval
  const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>([
    {
      id: 'pending-1',
      name: 'Radhe Krishna Kathiyawadi Bhojanalay',
      ownerName: 'Bhavin Patel',
      fssaiNumber: '21223190000842',
      cuisine: 'Gujarati / Kathiyawadi',
      pincode: '560102 (HSR Layout)',
      appliedDate: '2026-09-28',
      kitchenType: 'Home Kitchen',
      status: 'pending',
    },
    {
      id: 'pending-2',
      name: 'Kerala Spice Box Homely Meals',
      ownerName: 'Varghese Mathew',
      fssaiNumber: '21223140001092',
      cuisine: 'Kerala / Malabar',
      pincode: '560068 (BTM Layout)',
      appliedDate: '2026-09-29',
      kitchenType: 'Cloud Kitchen Partner',
      status: 'pending',
    }
  ]);

  // Razorpay Auto-Debit Flow Mandates
  const [mandates, setMandates] = useState<AutoDebitMandate[]>([
    {
      id: 'm-1',
      customerName: 'Aarav Mehta',
      planName: 'Ghar Ki Thali Monthly',
      gatewayMandateId: 'mandate_rzp_984102',
      authMode: 'UPI Autopay (PhonePe)',
      amount: 2288,
      nextDebitDate: '2026-10-05',
      status: 'Active'
    },
    {
      id: 'm-2',
      customerName: 'Priya Iyer',
      planName: 'South Indian Sattvic Meal',
      gatewayMandateId: 'mandate_rzp_841039',
      authMode: 'UPI Autopay (GPay)',
      amount: 2399,
      nextDebitDate: '2026-10-06',
      status: 'Active'
    },
    {
      id: 'm-3',
      customerName: 'Vikram Sengupta',
      planName: 'High Protein Fitness Meal',
      gatewayMandateId: 'mandate_rzp_712903',
      authMode: 'e-NACH Netbanking (HDFC)',
      amount: 3499,
      nextDebitDate: '2026-10-03',
      status: 'Failed',
      failureReason: 'Insufficient balance / mandate bank timeout'
    },
    {
      id: 'm-4',
      customerName: 'Neha Deshpande',
      planName: 'Maa Ki Rasoi Daily Thali',
      gatewayMandateId: 'mandate_rzp_620194',
      authMode: 'Card Token (ICICI)',
      amount: 2288,
      nextDebitDate: '2026-10-04',
      status: 'Active'
    }
  ]);

  // Pincode Routing Engine Matrix
  const [pincodes, setPincodes] = useState<ServicePincode[]>([
    { pincode: '560102', locality: 'HSR Layout Sectors 1-7', city: 'Bengaluru', activeKitchens: 5, riderFleet: 18, slaMinutes: 30, isLive: true },
    { pincode: '560103', locality: 'Bellandur & Outer Ring Road Tech Parks', city: 'Bengaluru', activeKitchens: 6, riderFleet: 24, slaMinutes: 28, isLive: true },
    { pincode: '560068', locality: 'BTM Layout 1st & 2nd Stage', city: 'Bengaluru', activeKitchens: 3, riderFleet: 14, slaMinutes: 35, isLive: true },
    { pincode: '560095', locality: 'Koramangala 1st to 8th Block', city: 'Bengaluru', activeKitchens: 5, riderFleet: 20, slaMinutes: 30, isLive: true },
    { pincode: '382009', locality: 'Gandhinagar Infocity & Sector 1-11', city: 'Gandhinagar', activeKitchens: 4, riderFleet: 16, slaMinutes: 25, isLive: true },
    { pincode: '380015', locality: 'SG Highway & Prahlad Nagar', city: 'Ahmedabad', activeKitchens: 3, riderFleet: 12, slaMinutes: 32, isLive: false }
  ]);

  const [newPinCode, setNewPinCode] = useState('');
  const [newLocality, setNewLocality] = useState('');
  const [newCity, setNewCity] = useState('Bengaluru');

  // Support & Ticket Desk Items
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TICK-901',
      customerName: 'Rahul Sharma',
      phone: '+91 98201 44812',
      subscriptionPlan: 'Ghar Ki Thali (Monthly)',
      issueType: 'Spilled Dal / Damaged Box',
      priority: 'Urgent',
      description: 'The tiffin lid was loose on arrival. The yellow dal spilled over the phulkas. Need replacement or meal credit.',
      timestamp: '12:18 PM Today',
      status: 'Open'
    },
    {
      id: 'TICK-902',
      customerName: 'Sneha Kapoor',
      phone: '+91 97110 58219',
      subscriptionPlan: 'Shahi Royal Thali (Weekly)',
      issueType: 'Delivery Delay (>25m)',
      priority: 'High',
      description: 'Lunch delivery was promised by 12:45 PM for an office meeting. Arrived at 1:18 PM. Rider cited traffic on ORR.',
      timestamp: '1:24 PM Today',
      status: 'Open'
    },
    {
      id: 'TICK-903',
      customerName: 'Amit Shah',
      phone: '+91 99042 11983',
      subscriptionPlan: 'Gujarati Kathiyawadi Pass',
      issueType: 'Dietary Mismatch',
      priority: 'Urgent',
      description: 'Requested strict No Onion / No Garlic Jain thali, but received regular onion tadka sabzi today.',
      timestamp: '1:35 PM Today',
      status: 'In Progress'
    },
    {
      id: 'TICK-904',
      customerName: 'Priya Nair',
      phone: '+91 94471 22810',
      subscriptionPlan: 'Ghar Ki Thali (Monthly)',
      issueType: 'Skip Credit Missing',
      priority: 'Normal',
      description: 'Skipped meal on Monday before 8 AM cutoff, but counter still showed meal as delivered.',
      timestamp: 'Yesterday',
      status: 'Open'
    }
  ]);

  const [ticketPriorityFilter, setTicketPriorityFilter] = useState<'All' | 'Urgent' | 'High' | 'Normal'>('All');

  // Provider Handlers
  const handleApprove = (id: string) => {
    approveProvider(id);
    setPendingApplications((prev) => prev.filter(p => p.id !== id));
    showToast('Kitchen partner has been verified & approved! Added to active routing matrix.');
  };

  const handleReject = (id: string) => {
    rejectProvider(id);
    setPendingApplications((prev) => prev.filter(p => p.id !== id));
    showToast('Application rejected due to documentation compliance requirements.');
  };

  // Auto-Debit Handlers
  const handleRetryMandate = (id: string) => {
    setMandates((prev) => prev.map((m) => {
      if (m.id === id) {
        return { ...m, status: 'Active', failureReason: undefined };
      }
      return m;
    }));
    showToast('Razorpay Auto-Debit charge triggered! Payment succeeded via fallback mandate retry.');
  };

  const handleTriggerWebhook = () => {
    showToast('Simulated Razorpay Webhook: subscription.charged received! 384 auto-renewals synchronized.');
  };

  // Pincode Handlers
  const handleTogglePincode = (pin: string) => {
    setPincodes((prev) => prev.map((item) => {
      if (item.pincode === pin) {
        return { ...item, isLive: !item.isLive };
      }
      return item;
    }));
    showToast(`Pincode ${pin} routing status updated!`);
  };

  const handleAddPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinCode || !newLocality) return;
    const item: ServicePincode = {
      pincode: newPinCode.trim(),
      locality: newLocality.trim(),
      city: newCity,
      activeKitchens: 2,
      riderFleet: 8,
      slaMinutes: 30,
      isLive: true
    };
    setPincodes((prev) => [item, ...prev]);
    setNewPinCode('');
    setNewLocality('');
    showToast(`Pincode ${item.pincode} (${item.locality}) activated in routing engine!`);
  };

  // Support Ticket Actions
  const handleResolveTicket = (ticketId: string, resolution: string) => {
    setTickets((prev) => prev.map((t) => {
      if (t.id === ticketId) {
        return { ...t, status: 'Resolved', resolutionNote: resolution };
      }
      return t;
    }));
    showToast(`Ticket ${ticketId} resolved: ${resolution}`);
  };

  const q = searchQuery.toLowerCase().trim();

  const filteredPending = pendingApplications.filter(app => 
    !q || 
    app.name.toLowerCase().includes(q) || 
    app.ownerName.toLowerCase().includes(q) || 
    app.cuisine.toLowerCase().includes(q) ||
    app.pincode.toLowerCase().includes(q) ||
    app.fssaiNumber.includes(q)
  );

  const filteredProviders = providers.filter(p => 
    !q || 
    p.name.toLowerCase().includes(q) || 
    p.ownerName.toLowerCase().includes(q) || 
    p.fssaiNumber.includes(q) ||
    p.servicePincodes.some(pin => pin.includes(q))
  );

  const filteredSubscriptions = subscriptions.filter(s => 
    !q || 
    s.collectionName.toLowerCase().includes(q) || 
    s.providerName.toLowerCase().includes(q) || 
    s.paymentId.toLowerCase().includes(q)
  );

  const filteredTickets = tickets.filter(t => {
    const matchesPriority = ticketPriorityFilter === 'All' || t.priority === ticketPriorityFilter;
    const matchesSearch = !q || 
      t.customerName.toLowerCase().includes(q) || 
      t.id.toLowerCase().includes(q) || 
      t.issueType.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q);
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast Feedback */}
      {adminToast && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{adminToast}</span>
        </div>
      )}

      {/* ADMIN HEADER */}
      <div className="bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Administration & Operations</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">My Chef Command Center</h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Auto-Debit mandates, pincode dispatch routing, partner hygiene & customer dispute resolution
          </p>
        </div>

        {/* 6 Tabs */}
        <div className="flex bg-stone-800 p-1.5 rounded-2xl border border-stone-700 overflow-x-auto text-xs font-bold gap-1">
          <button
            onClick={() => setAdminTab('approvals')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'approvals' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Pending Approvals ({pendingApplications.length})
          </button>
          <button
            onClick={() => setAdminTab('providers')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'providers' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Active Kitchens ({providers.length})
          </button>
          <button
            onClick={() => setAdminTab('subscriptions')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'subscriptions' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            Subscriptions ({subscriptions.length})
          </button>
          <button
            onClick={() => setAdminTab('autodebit')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              adminTab === 'autodebit' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Razorpay Auto-Debit</span>
          </button>
          <button
            onClick={() => setAdminTab('pincodes')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              adminTab === 'pincodes' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Pincode Routing</span>
          </button>
          <button
            onClick={() => setAdminTab('support')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              adminTab === 'support' ? 'bg-blue-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
            }`}
          >
            <LifeBuoy className="w-3.5 h-3.5 text-amber-400" />
            <span>Support Desk ({tickets.filter(t => t.status !== 'Resolved').length})</span>
          </button>
        </div>
      </div>

      {/* METRICS STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Monthly Recurring GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-stone-900">₹14,92,400</span>
          <span className="text-[11px] text-emerald-600 font-bold block">+18.4% auto-renewing</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Auto-Debit Mandates</span>
            <CreditCard className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-2xl font-black text-stone-900">342 Active</span>
          <span className="text-[11px] text-emerald-600 font-bold block">98.4% success rate</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Active Pincode Hubs</span>
            <MapPin className="w-4 h-4 text-orange-600" />
          </div>
          <span className="text-2xl font-black text-stone-900">{pincodes.filter(p => p.isLive).length} / {pincodes.length}</span>
          <span className="text-[11px] text-stone-500 font-bold block">Bengaluru & Gandhinagar</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
            <span>Support Ticket Desk</span>
            <LifeBuoy className="w-4 h-4 text-purple-600" />
          </div>
          <span className="text-2xl font-black text-stone-900">{tickets.filter(t => t.status !== 'Resolved').length} Open</span>
          <span className="text-[11px] text-emerald-600 font-bold block">Avg resolution: 12 mins</span>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${
            adminTab === 'approvals' 
              ? 'pending applications by name, FSSAI, or cuisine' 
              : adminTab === 'providers' 
              ? 'active kitchens by name, owner, or pincode' 
              : adminTab === 'autodebit' 
              ? 'mandates by subscriber name or mandate ID' 
              : adminTab === 'pincodes' 
              ? 'pincode, locality or city' 
              : adminTab === 'support' 
              ? 'tickets by customer name, ticket ID, or issue' 
              : 'subscriptions...'
          }...`}
          className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-stone-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium placeholder:text-stone-400 shadow-2xs"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold px-1.5 py-0.5 rounded cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* TAB 1: PENDING KITCHEN APPROVALS */}
      {adminTab === 'approvals' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-stone-900">Pending Kitchen Onboarding Requests</h3>
              <p className="text-xs text-stone-500">Verify FSSAI license numbers and physical hygiene checklist before enabling kitchens</p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/60">
              {filteredPending.length} in queue
            </span>
          </div>

          {filteredPending.length === 0 ? (
            <div className="p-12 text-center bg-stone-50 rounded-2xl text-xs text-stone-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-bold text-stone-700">
                {searchQuery ? 'No matching pending applications found' : 'All kitchen partner applications reviewed!'}
              </p>
              <p className="text-[11px] text-stone-400">Zero pending verification queues at this moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filteredPending.map((app) => (
                <div key={app.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-stone-900 text-sm">{app.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        Pending Verification
                      </span>
                    </div>
                    <p className="text-stone-500">
                      Owner: <span className="font-semibold text-stone-800">{app.ownerName}</span> • Cuisine: {app.cuisine}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      FSSAI: <span className="font-mono font-semibold text-stone-700">{app.fssaiNumber}</span> • Coverage: {app.pincode}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={() => handleReject(app.id)}
                      className="px-3.5 py-2 border border-red-200 text-red-600 hover:bg-red-50 font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(app.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ACTIVE PROVIDERS */}
      {adminTab === 'providers' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-stone-900">Active Kitchen Partners</h3>
            <span className="text-xs font-bold text-stone-500">
              Showing {filteredProviders.length} of {providers.length}
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredProviders.map((p) => (
              <div key={p.id} className="py-4 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-stone-900 text-sm">{p.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      FSSAI Active
                    </span>
                  </div>
                  <p className="text-stone-500">{p.ownerName} • Lic: {p.fssaiNumber}</p>
                  <p className="text-[11px] text-stone-400">Assigned Pincodes: {p.servicePincodes.join(', ')}</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-stone-900 block">{p.subscriberCount} Active Subs</span>
                  <span className="text-[11px] text-stone-400">Rating: ⭐ {p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SUBSCRIPTIONS */}
      {adminTab === 'subscriptions' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-stone-900">Platform Subscriptions Log</h3>
            <span className="text-xs font-bold text-stone-500">
              Showing {filteredSubscriptions.length} of {subscriptions.length}
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {filteredSubscriptions.map((s) => (
              <div key={s.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900">{s.collectionName}</h4>
                  <p className="text-stone-500">{s.providerName} • {s.planDuration.toUpperCase()}</p>
                  <p className="text-[11px] text-stone-400">Remaining: {s.remainingMeals} / {s.totalMeals} meals</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-stone-900 block">₹{s.amountPaid}</span>
                  <span className="text-[11px] font-mono text-stone-400">{s.paymentId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RAZORPAY AUTO-DEBIT FLOW */}
      {adminTab === 'autodebit' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                  <CreditCard className="w-4 h-4" />
                  <span>Razorpay Recurring Mandate Engine</span>
                </div>
                <h3 className="text-base font-extrabold text-stone-900">UPI Autopay & e-NACH Mandate Monitor</h3>
                <p className="text-xs text-stone-500">
                  Automated monthly deductions, recurring tokenized payments, and webhook reconciliation
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerWebhook}
                  className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Test Webhook</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Gateway mandate synchronization complete. All 342 mandates verified.')}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Razorpay</span>
                </button>
              </div>
            </div>

            {/* Mandates Table */}
            <div className="divide-y divide-stone-100">
              {mandates.map((m) => (
                <div key={m.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-stone-900 text-sm">{m.customerName}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {m.status}
                      </span>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {m.gatewayMandateId}
                      </span>
                    </div>
                    <p className="text-stone-500">
                      {m.planName} • <span className="font-semibold text-stone-700">{m.authMode}</span>
                    </p>
                    {m.failureReason ? (
                      <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Failed: {m.failureReason}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-stone-400">
                        Next Auto-Deduction: <strong className="text-stone-700">{m.nextDebitDate}</strong> (₹{m.amount}/mo)
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="font-black text-stone-900 text-sm block">₹{m.amount}</span>
                      <span className="text-[10px] text-stone-400">Recurring Cap: ₹5,000</span>
                    </div>
                    {m.status === 'Failed' && (
                      <button
                        type="button"
                        onClick={() => handleRetryMandate(m.id)}
                        className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry Auto-Debit</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PINCODE ROUTING ENGINE */}
      {adminTab === 'pincodes' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Geo-Cluster Routing Matrix</span>
                </div>
                <h3 className="text-base font-extrabold text-stone-900">Pincode Serviceability & Fleet SLA</h3>
                <p className="text-xs text-stone-500">
                  Control live fulfillment hubs, assign delivery fleet clusters, and dynamically adjust meal SLAs
                </p>
              </div>
            </div>

            {/* Add Pincode Bar */}
            <form onSubmit={handleAddPincode} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center gap-3 text-xs">
              <input
                type="text"
                required
                maxLength={6}
                value={newPinCode}
                onChange={(e) => setNewPinCode(e.target.value)}
                placeholder="6-digit Pincode (e.g. 560034)"
                className="w-full sm:w-44 px-3 py-2 bg-white rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                required
                value={newLocality}
                onChange={(e) => setNewLocality(e.target.value)}
                placeholder="Locality Name (e.g. Indiranagar 100ft Road)"
                className="flex-1 w-full px-3 py-2 bg-white rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                className="px-3 py-2 bg-white rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold text-stone-700"
              >
                <option value="Bengaluru">Bengaluru</option>
                <option value="Gandhinagar">Gandhinagar</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Activate Pincode</span>
              </button>
            </form>

            {/* Pincode Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pincodes.map((pin) => (
                <div key={pin.pincode} className={`p-5 rounded-3xl border transition-all space-y-3 ${
                  pin.isLive ? 'bg-white border-stone-200 shadow-xs' : 'bg-stone-50 border-stone-200 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-stone-900">{pin.pincode}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      pin.isLive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                    }`}>
                      {pin.isLive ? 'Live Hub' : 'Paused'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">{pin.locality}</h4>
                    <p className="text-[11px] text-stone-400">{pin.city}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 border-y border-stone-100">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Kitchens</span>
                      <span className="font-bold text-stone-800">{pin.activeKitchens}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Riders</span>
                      <span className="font-bold text-blue-600">{pin.riderFleet}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">SLA</span>
                      <span className="font-bold text-emerald-600">{pin.slaMinutes}m</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTogglePincode(pin.pincode)}
                    className={`w-full py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                      pin.isLive 
                        ? 'border border-stone-200 text-stone-600 hover:bg-stone-50' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {pin.isLive ? 'Pause Service in Hub' : 'Resume Service Hub'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SUPPORT & TICKET DESK */}
      {adminTab === 'support' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                  <LifeBuoy className="w-4 h-4" />
                  <span>Rapid Dispute Resolution</span>
                </div>
                <h3 className="text-base font-extrabold text-stone-900">Customer & Partner Ticket Desk</h3>
                <p className="text-xs text-stone-500">
                  Instant compensation buttons, spilled dal replacement, and missed meal adjustments
                </p>
              </div>

              {/* Priority Filter */}
              <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold self-start sm:self-auto">
                {(['All', 'Urgent', 'High', 'Normal'] as const).map((pri) => (
                  <button
                    key={pri}
                    type="button"
                    onClick={() => setTicketPriorityFilter(pri)}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      ticketPriorityFilter === pri ? 'bg-white text-purple-700 shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    {pri}
                  </button>
                ))}
              </div>
            </div>

            {/* Tickets Roster */}
            <div className="divide-y divide-stone-100">
              {filteredTickets.map((t) => (
                <div key={t.id} className="py-4 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-900">{t.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.priority === 'Urgent' 
                          ? 'bg-red-100 text-red-800' 
                          : t.priority === 'High' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-stone-100 text-stone-700'
                      }`}>
                        {t.priority} Priority
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Resolved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : t.status === 'In Progress' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">{t.timestamp}</span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-stone-900 text-sm">{t.issueType}</h4>
                    <p className="text-stone-600 mt-1 leading-relaxed">{t.description}</p>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Reported by: <strong className="text-stone-700">{t.customerName}</strong> ({t.phone}) • Plan: {t.subscriptionPlan}
                    </p>
                    {t.resolutionNote && (
                      <p className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-xl border border-emerald-200 mt-2">
                        Resolution: {t.resolutionNote}
                      </p>
                    )}
                  </div>

                  {t.status !== 'Resolved' && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleResolveTicket(t.id, 'Refunded ₹88 meal credit to customer wallet')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
                      >
                        Refund ₹88 Meal Credit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResolveTicket(t.id, 'Added +1 extra validity day to customer plan')}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
                      >
                        Add +1 Free Meal Day
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResolveTicket(t.id, 'Dispatched fresh emergency tiffin box via express rider')}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Dispatch Replacement Box
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResolveTicket(t.id, 'Ticket reviewed & closed')}
                        className="px-3 py-1.5 border border-stone-200 text-stone-500 hover:bg-stone-50 font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Close Ticket
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
