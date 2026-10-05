'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CITIES_AND_HUBS } from '@/lib/cities';
import {
  UtensilsCrossed,
  MapPin,
  CalendarCheck,
  ChefHat,
  ShieldCheck,
  ChevronDown,
  Search,
  Zap,
  LogOut,
  Bike,
  GraduationCap,
  Building2,
  MessageSquare,
  PartyPopper,
  Award,
  Briefcase,
  Crown,
  ShoppingBag,
  Sparkles,
  Clock,
  Compass
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    setRole,
    city,
    setCity,
    pincode,
    setPincode,
    user,
    signOut
  } = useApp();

  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [cityFilterTab, setCityFilterTab] = useState<'all' | 'student' | 'corporate'>('all');
  const [citySearch, setCitySearch] = useState('');

  const filteredHubs = CITIES_AND_HUBS.filter((hub) => {
    const matchesSearch = citySearch.trim() === '' ||
      hub.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      hub.state.toLowerCase().includes(citySearch.toLowerCase()) ||
      hub.popularAreas.some(a => a.toLowerCase().includes(citySearch.toLowerCase()));

    if (cityFilterTab === 'student') return matchesSearch && hub.type === 'student_hub';
    if (cityFilterTab === 'corporate') return matchesSearch && hub.type === 'corporate_hub';
    return matchesSearch;
  });

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-2xs">
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-18 gap-2 sm:gap-4">

          {/* Logo & Delivery Location (Shifted slightly left with compact spacing) */}
          <div className="flex items-center gap-2 sm:gap-3.5 lg:gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-tr from-orange-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform shrink-0">
                <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 flex items-center leading-tight">
                  My<span className="text-orange-600">Chef</span>
                </span>
                <span className="text-[8.5px] sm:text-[9px] text-orange-700 font-extrabold tracking-wider uppercase flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 fill-orange-600 text-orange-600" />
                  <span>DAILY FRESH LOOP</span>
                </span>
              </div>
            </Link>

            {/* City / Hub Location Pill */}
            <button
              onClick={() => setShowPincodeModal(true)}
              className="hidden md:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-orange-50 hover:bg-orange-100/90 border border-orange-200/80 text-xs font-bold text-stone-800 transition-colors text-left shrink-0 cursor-pointer"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-600 flex items-center justify-center text-white shrink-0">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] text-orange-700 font-extrabold uppercase tracking-wider">
                  DELIVERING IN
                </span>
                <span className="truncate max-w-[110px] sm:max-w-[140px] font-black text-xs text-stone-900">
                  {city || 'Rajkot / Ahmedabad'} ({pincode})
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-stone-500 ml-0.5" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink min-w-0">
            {/* Local Kitchens Dropdown Button */}
            <div className="relative group">
              <Link
                href="/explore"
                className={`flex items-center gap-1.5 px-3 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                  pathname === '/explore'
                    ? 'text-orange-600 bg-orange-50 border border-orange-200 shadow-2xs'
                    : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
                }`}
              >
                <ChefHat className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>Local Kitchens</span>
                <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-orange-600 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Hover Dropdown Menu */}
              <div className="absolute top-full left-0 pt-1.5 w-76 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 bg-white rounded-2xl shadow-xl border border-stone-200/90 backdrop-blur-md">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[10px] font-black uppercase text-stone-400 tracking-wider flex items-center justify-between">
                    <span>Neighborhood Kitchens</span>
                    <Link href="/explore" className="text-orange-600 hover:underline">Explore All →</Link>
                  </div>
                  <div className="space-y-0.5 pt-1.5">
                    <Link
                      href="/explore"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-orange-50 text-stone-700 hover:text-orange-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Compass className="w-3.5 h-3.5 text-orange-500" />
                        <span>Browse All 60+ Kitchens</span>
                      </span>
                      <span className="text-[10px] font-black text-orange-600 bg-orange-100/80 px-1.5 py-0.5 rounded-md">Live</span>
                    </Link>
                    <Link
                      href="/explore?category=home_chef"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-orange-50 text-stone-700 hover:text-orange-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <ChefHat className="w-3.5 h-3.5 text-orange-500" />
                        <span>Homestyle Home Chefs</span>
                      </span>
                      <span className="text-[10px] text-stone-400 font-semibold">Homecooked</span>
                    </Link>
                    <Link
                      href="/explore?star=7_star"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-700 hover:text-amber-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        <span>7★ Royal Heritage Dining</span>
                      </span>
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md">VIP</span>
                    </Link>
                    <Link
                      href="/explore?fulfillment=delivery"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Bike className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Doorstep Hot Delivery</span>
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold">Hot Box</span>
                    </Link>
                    <Link
                      href="/explore?fulfillment=parcel_locker"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-blue-50 text-stone-700 hover:text-blue-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingBag className="w-3.5 h-3.5 text-blue-500" />
                        <span>Smart Parcel Lockers</span>
                      </span>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-100/80 px-1.5 py-0.5 rounded-md">Free</span>
                    </Link>
                    <Link
                      href="/explore?diet=pure-veg"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Pure Veg & Jain Thalis</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-black">100% Satvik</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* PG Mess Dropdown Button */}
            <div className="relative group">
              <Link
                href="/passes"
                className={`flex items-center gap-1.5 px-3 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                  pathname.startsWith('/passes')
                    ? 'text-amber-800 bg-amber-50 border border-amber-200 shadow-2xs'
                    : 'text-stone-700 hover:text-amber-700 hover:bg-amber-50/60'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>PG Mess</span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[9px] border border-amber-300">
                  ₹84/meal
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-amber-600 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Hover Dropdown Menu */}
              <div className="absolute top-full left-0 pt-1.5 w-76 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 bg-white rounded-2xl shadow-xl border border-stone-200/90 backdrop-blur-md">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[10px] font-black uppercase text-stone-400 tracking-wider flex items-center justify-between">
                    <span>Student & PG Meal Plans</span>
                    <Link href="/passes" className="text-amber-600 hover:underline">View Passes →</Link>
                  </div>
                  <div className="space-y-0.5 pt-1.5">
                    <Link
                      href="/passes"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-700 hover:text-amber-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Student Meal Passes</span>
                      </span>
                      <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md">From ₹84</span>
                    </Link>
                    <Link
                      href="/explore?category=student_mess"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-700 hover:text-amber-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-amber-500" />
                        <span>Campus Mess Directory</span>
                      </span>
                      <span className="text-[10px] text-stone-400 font-semibold">Near PGs</span>
                    </Link>
                    <Link
                      href="/explore?fulfillment=dine_in"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-purple-50 text-stone-700 hover:text-purple-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-purple-500" />
                        <span>Mess Dine-In Canteens</span>
                      </span>
                      <span className="text-[10px] text-purple-600 font-bold">Unlimited Rotis</span>
                    </Link>
                    <Link
                      href="/passes"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-700 hover:text-amber-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>Exam Season Late Night Tiffins</span>
                      </span>
                      <span className="text-[10px] font-bold text-amber-700">Till 11 PM</span>
                    </Link>
                    <Link
                      href="/contact?category=student_mess"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-orange-50 text-stone-700 hover:text-orange-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
                        <span>Hostel / PG Mess Tie-Up</span>
                      </span>
                      <span className="text-[10px] text-orange-600 font-black">Inquire →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/events"
                className={`flex items-center gap-1.5 px-3 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-black transition-all whitespace-nowrap ${
                  pathname.startsWith('/events')
                    ? 'text-emerald-800 bg-emerald-50 border border-emerald-200 shadow-2xs'
                    : 'text-stone-700 hover:text-emerald-700 hover:bg-emerald-50/60'
                }`}
              >
                <PartyPopper className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Events & Catering</span>
                <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-emerald-600 transition-transform group-hover:rotate-180" />
              </Link>

              {/* Hover Dropdown with the 5 Event Packages */}
              <div className="absolute top-full left-0 pt-1.5 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2 bg-white rounded-2xl shadow-xl border border-stone-200/90 backdrop-blur-md">
                  <div className="px-3 py-1.5 border-b border-stone-100 text-[10px] font-black uppercase text-stone-400 tracking-wider flex items-center justify-between">
                    <span>Celebrations & Buffets</span>
                    <Link href="/events" className="text-emerald-600 hover:underline">View All →</Link>
                  </div>
                  <div className="space-y-0.5 pt-1.5">
                    <Link
                      href="/events?type=birthday"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-pink-50 text-stone-700 hover:text-pink-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <PartyPopper className="w-3.5 h-3.5 text-pink-500" />
                        <span>Birthday Celebration Feast</span>
                      </span>
                      <span className="text-[10px] font-black text-pink-600 bg-pink-100/80 px-1.5 py-0.5 rounded-md">₹279</span>
                    </Link>
                    <Link
                      href="/events?type=work-anniversary"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-amber-50 text-stone-700 hover:text-amber-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Work Anniversary Luncheon</span>
                      </span>
                      <span className="text-[10px] font-black text-amber-600 bg-amber-100/80 px-1.5 py-0.5 rounded-md">₹249</span>
                    </Link>
                    <Link
                      href="/events?type=office"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-blue-50 text-stone-700 hover:text-blue-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                        <span>Office & Team Lunch Boxes</span>
                      </span>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-100/80 px-1.5 py-0.5 rounded-md">₹149</span>
                    </Link>
                    <Link
                      href="/events?type=corporate"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Corporate Gathering Buffets</span>
                      </span>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-100/80 px-1.5 py-0.5 rounded-md">₹389</span>
                    </Link>
                    <Link
                      href="/events?type=meeting"
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-purple-50 text-stone-700 hover:text-purple-700 text-xs font-bold transition-colors group/item"
                    >
                      <span className="flex items-center gap-2">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-purple-500" />
                        <span>Custom Event Catering</span>
                      </span>
                      <span className="text-[10px] font-black text-purple-600 bg-purple-100/80 px-1.5 py-0.5 rounded-md">₹319</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/track"
              className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-extrabold transition-colors whitespace-nowrap ${
                pathname.startsWith('/track')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Live Tracking</span>
            </Link>

            <Link
              href="/consumer/subscriptions"
              className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-extrabold transition-colors whitespace-nowrap ${
                pathname.startsWith('/consumer/subscriptions')
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Subscriptions</span>
            </Link>

            <Link
              href="/contact"
              className={`flex items-center gap-1 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-extrabold transition-colors whitespace-nowrap ${
                pathname === '/contact'
                  ? 'text-orange-600 bg-orange-50 border border-orange-200 shadow-2xs'
                  : 'text-stone-700 hover:text-orange-600 hover:bg-stone-50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>Contact & Inquiries</span>
            </Link>
          </nav>

          {/* Action Group: Dedicated Admin Button + User Profile / Sign In */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto lg:ml-0">
            {/* Dedicated Animated Admin Button */}
            <Link
              href="/admin"
              onClick={() => setRole('admin')}
              className={`flex items-center gap-1.5 h-9 px-3.5 rounded-xl btn-animated-admin text-xs font-black text-white transition-all shadow-xs shrink-0 cursor-pointer ${
                pathname.startsWith('/admin') ? 'ring-2 ring-blue-300 ring-offset-1' : ''
              }`}
              title="Platform Admin Console"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-100 shrink-0" />
              <span>Admin</span>
            </Link>

            {/* User Profile / Sign In */}
            {user ? (
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative group">
                  <button className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 transition-colors shrink-0 cursor-pointer">
                    <div className="w-7 h-7 rounded-xl bg-orange-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {user.fullName.charAt(0)}
                    </div>
                    <span className="hidden md:inline text-xs font-bold max-w-[80px] lg:max-w-[100px] truncate">
                      {user.fullName.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-stone-400 shrink-0" />
                  </button>

                  {/* Dropdown Menu on hover */}
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 hidden group-hover:block animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900 truncate">{user.fullName}</p>
                      <p className="text-[10px] text-stone-400 font-mono truncate">{user.phone || user.email}</p>
                      <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-orange-50 text-orange-700 mt-1">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1 text-xs font-semibold">
                      <Link
                        href="/explore"
                        className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:bg-stone-50"
                      >
                        <ChefHat className="w-3.5 h-3.5 text-orange-600" />
                        <span>Local Kitchens</span>
                      </Link>
                      <Link
                        href="/passes"
                        className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:bg-stone-50"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                        <span>PG Mess & Passes</span>
                      </Link>
                      <Link
                        href="/track"
                        className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:bg-stone-50"
                      >
                        <Bike className="w-3.5 h-3.5 text-orange-600" />
                        <span>Live Order Tracking</span>
                      </Link>
                      <Link
                        href="/consumer/subscriptions"
                        className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:bg-stone-50"
                      >
                        <CalendarCheck className="w-3.5 h-3.5 text-stone-400" />
                        <span>My Subscriptions</span>
                      </Link>
                      <Link
                        href="/provider/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:bg-stone-50"
                      >
                        <ChefHat className="w-3.5 h-3.5 text-stone-400" />
                        <span>Kitchen Dashboard</span>
                      </Link>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-blue-700 font-bold hover:bg-blue-50"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Admin Console</span>
                      </Link>
                      <Link
                        href="/events"
                        className="flex items-center gap-2 px-4 py-2 text-emerald-700 font-bold hover:bg-emerald-50"
                      >
                        <PartyPopper className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Events & Catering</span>
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center gap-2 px-4 py-2 text-orange-600 font-bold hover:bg-orange-50"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                        <span>Contact & Inquiries</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-stone-100">
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 text-left transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="px-4 py-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-black shadow-xs transition-colors shrink-0 whitespace-nowrap cursor-pointer flex items-center justify-center"
              >
                Sign In
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Quick Action Strip (Local Kitchens, PG Mess, Events, Admin, Tracking, Contact) */}
      <div className="flex lg:hidden items-center justify-between gap-1.5 px-3 py-1.5 bg-stone-50/95 border-t border-stone-100 overflow-x-auto scrollbar-none text-xs">
        <Link
          href="/explore"
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-stone-800 font-extrabold text-[11px] shrink-0 active:scale-95 transition-all shadow-2xs"
        >
          <ChefHat className="w-3.5 h-3.5 text-orange-600" />
          <span>Kitchens</span>
        </Link>
        <Link
          href="/passes"
          className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-extrabold text-[11px] shrink-0 active:scale-95 transition-all shadow-2xs"
        >
          <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
          <span>PG Mess</span>
          <span className="px-1 py-0.2 rounded bg-amber-200 text-amber-950 font-black text-[9px]">₹84</span>
        </Link>
        <Link
          href="/events"
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold text-[11px] shrink-0 active:scale-95 transition-all shadow-2xs"
        >
          <PartyPopper className="w-3.5 h-3.5 text-emerald-600" />
          <span>Catering</span>
        </Link>
        <Link
          href="/track"
          className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white border border-stone-200 text-stone-800 font-extrabold text-[11px] shrink-0 active:scale-95 transition-all shadow-2xs"
        >
          <Bike className="w-3.5 h-3.5 text-orange-600" />
          <span>Track</span>
        </Link>
        <Link
          href="/contact"
          className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white border border-orange-200 text-orange-700 font-extrabold text-[11px] shrink-0 active:scale-95 transition-all shadow-2xs"
        >
          <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
          <span>Inquiry</span>
        </Link>
        <Link
          href="/admin"
          onClick={() => setRole('admin')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl btn-animated-admin text-white font-black text-[11px] shrink-0 active:scale-95 transition-all shadow-2xs"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-blue-100" />
          <span>Admin</span>
        </Link>
      </div>
      </header>

    {/* Comprehensive 60+ Cities, Student Area & Tech Park Hub Modal */ }
  {
    showPincodeModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col p-6 shadow-2xl border border-stone-100">

          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-orange-100 rounded-2xl text-orange-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-base">Select Your City & Area</h3>
                <p className="text-xs text-stone-500">60+ Indian Cities • Student Hubs • Tech Parks • Parcel Lockers</p>
              </div>
            </div>
            <button
              onClick={() => setShowPincodeModal(false)}
              className="text-stone-400 hover:text-stone-600 text-2xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* Search Input & Filter Tabs */}
          <div className="pt-3 pb-2 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Search city, student campus (e.g. Kota, Vidyanagar, Roorkee) or IT park..."
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-2 text-xs font-bold">
              <button
                onClick={() => setCityFilterTab('all')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${ cityFilterTab === 'all' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                All 60+ Cities
              </button>
              <button
                onClick={() => setCityFilterTab('student')}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors ${ cityFilterTab === 'student' ? 'bg-blue-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student & Coaching Areas</span>
              </button>
              <button
                onClick={() => setCityFilterTab('corporate')}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1 transition-colors ${ cityFilterTab === 'corporate' ? 'bg-orange-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Office IT & Tech Parks</span>
              </button>
            </div>
          </div>

          {/* Scrollable Hub List */}
          <div className="overflow-y-auto flex-1 pr-1 space-y-2 py-2">
            {filteredHubs.map((hub, idx) => {
              const isSelected = city === hub.name;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setCity(hub.name);
                    setPincode(hub.defaultPincode);
                    setShowPincodeModal(false);
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${ isSelected
                      ? 'border-orange-600 bg-orange-50/70 ring-2 ring-orange-500/20'
                      : 'border-stone-100 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-stone-900">{hub.name}</span>
                      <span className="text-[10px] text-stone-400 font-bold">{hub.state}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${ hub.type === 'student_hub'
                          ? 'bg-blue-50 text-blue-700'
                          : hub.type === 'corporate_hub'
                            ? 'bg-orange-50 text-orange-700'
                            : 'bg-stone-100 text-stone-700'
                        }`}>
                        {hub.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Popular: {hub.popularAreas.slice(0, 4).join(', ')}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded-md font-bold">
                      {hub.defaultPincode}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    )
  }
    </>
  );
}
