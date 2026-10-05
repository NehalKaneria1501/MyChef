'use client';

import React, { useState, useEffect, Suspense, useId } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CITIES_AND_HUBS } from '@/lib/cities';
import {
  PartyPopper,
  Building2,
  Briefcase,
  Users,
  UtensilsCrossed,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  ChevronRight,
  Calculator,
  Calendar,
  MapPin,
  Flame,
  Star,
  Send,
  Copy,
  Check,
  Zap,
  Info,
  Sliders,
  Award
} from 'lucide-react';

export type EventTypeKey = 'birthday' | 'work-anniversary' | 'office' | 'corporate' | 'meeting';

interface EventPackage {
  key: EventTypeKey;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  pricePerPlate: number;
  minGuests: number;
  idealFor: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  borderActive: string;
  bgGradient: string;
  menu: {
    welcomeDrink: string[];
    starters: string[];
    mainCurries: string[];
    dalAndBreads: string[];
    riceAndBiryani: string[];
    dessert: string[];
    accompaniments: string[];
  };
  perks: string[];
}

const EVENT_PACKAGES: Record<EventTypeKey, EventPackage> = {
  birthday: {
    key: 'birthday',
    title: 'Birthday Celebration Feast',
    badge: 'FAMILY & FRIENDS FAVORITE',
    tagline: 'Joyous birthdays, kids milestones & festive home gatherings',
    description:
      'A warm, celebratory spread featuring authentic homestyle rich gravies, live-steamed phulkas, crispy starters, and artisanal desi ghee sweets that guests of all ages adore.',
    pricePerPlate: 279,
    minGuests: 15,
    idealFor: 'Birthdays, Anniversaries, Housewarmings & Festive Pujas',
    icon: PartyPopper,
    accentColor: 'text-pink-600',
    borderActive: 'border-pink-500 bg-pink-50/70 ring-2 ring-pink-500/20',
    bgGradient: 'from-pink-600 via-rose-600 to-amber-600',
    menu: {
      welcomeDrink: ['Royal Kesar Pista Chhas', 'Fresh Virgin Mojito'],
      starters: ['Crispy Paneer Tikka Cubes', 'Hara Bhara Kabab with Mint Dip'],
      mainCurries: ['Shahi Paneer Lababdar', 'Kathiyawadi Sev Tameta or Veg Kolhapuri'],
      dalAndBreads: ['Desi Ghee Phulkas / Puri', 'Dal Makhani Slow-Simmered'],
      riceAndBiryani: ['Fragrant Jeera Basmati Rice', 'Veg Dum Biryani with Burani Raita'],
      dessert: ['Kesari Malai Shrikhand or Gulab Jamun', 'Moong Dal Halwa'],
      accompaniments: ['Roasted Masala Papad', 'Green Salad & Sirka Onion', 'Sweet Mango Chutney'],
    },
    perks: [
      'Delivered hot in food-grade thermal containers',
      'Free customized birthday greeting topper card',
      'Bio-degradable sugarcane bagasse plates & cutlery included',
      'Dedicated delivery supervisor for on-time arrival',
    ],
  },
  'work-anniversary': {
    key: 'work-anniversary',
    title: 'Work Anniversary Luncheon',
    badge: 'EXECUTIVE CELEBRATION',
    tagline: 'Milestone celebrations, team promotions & founder anniversary feasts',
    description:
      'Honor team milestones and work anniversaries with a gourmet luncheon. Elegantly packaged individual bento meal boxes or executive banquet style setup delivered straight to your meeting halls.',
    pricePerPlate: 249,
    minGuests: 15,
    idealFor: 'Company Work Anniversaries, Appraisals & Milestone Townhalls',
    icon: Award,
    accentColor: 'text-amber-600',
    borderActive: 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-500/20',
    bgGradient: 'from-amber-600 via-orange-600 to-yellow-600',
    menu: {
      welcomeDrink: ['Kokum Cooler / Sweet Lassi', 'Cold-Pressed Valencia Orange Juice'],
      starters: ['Tandoori Stuffed Mushroom', 'Corn Cheese Triangles'],
      mainCurries: ['Paneer Tikka Masala', 'Methi Malai Matar (Mild & Aromatic)'],
      dalAndBreads: ['Butter Naan & Desi Phulkas', 'Panchmel Dal or Yellow Dal Tadka'],
      riceAndBiryani: ['Kashmiri Pulao with Fried Cashews'],
      dessert: ['Warm Walnut Brownie with Chocolate Fudge', 'Angoori Rasmalai'],
      accompaniments: ['Crispy Fryums & Papad', 'Sprouted Moong Salad', 'Mixed Pickle'],
    },
    perks: [
      'Personalized congratulations sleeve on each lunch box',
      'Zero-spill 5-compartment spill-proof boxes',
      'Input GST tax invoice provided automatically',
      'Priority delivery 30 mins before meeting start',
    ],
  },
  office: {
    key: 'office',
    title: 'Office & Team Lunch Boxes',
    badge: 'MOST POPULAR DAILY/WEEKLY',
    tagline: 'Sprint demo lunches, daily tech team meals & cafeteria alternatives',
    description:
      'Wholesome, low-oil, easily digestible homestyle lunch boxes cooked by verified home chefs and cloud kitchens. Perfect for daily teams tired of oily commercial restaurant food.',
    pricePerPlate: 149,
    minGuests: 10,
    idealFor: 'Daily Team Lunch, Hackathons, Friday Tech Lunches & Training Batches',
    icon: Briefcase,
    accentColor: 'text-blue-600',
    borderActive: 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500/20',
    bgGradient: 'from-blue-600 via-indigo-600 to-violet-600',
    menu: {
      welcomeDrink: ['Masala Taak (Spiced Buttermilk)'],
      starters: ['Steamed Gujarati Dhokla with Mustard Tempering'],
      mainCurries: ['Paneer Bhurji / Palak Paneer', 'Aloo Gobi Adraki or Bhindi Masala'],
      dalAndBreads: ['4 Soft Desi Ghee Wheat Rotis', 'Gujarati/North Indian Dal Fry'],
      riceAndBiryani: ['Steamed Long Grain Basmati Rice'],
      dessert: ['Roasted Besan Ladoo / Sukhdi Slice'],
      accompaniments: ['Roasted Papad', 'Cucumber Carrot Salad', 'Lemon Wedge & Chili Pickle'],
    },
    perks: [
      'Super affordable at just ₹149/box with zero hidden charges',
      'Daily rotational menus across 7 days a week',
      'Delivered punctually at 12:15 PM or custom delivery slot',
      'Individual name labeling for employees with specific diets',
    ],
  },
  corporate: {
    key: 'corporate',
    title: 'Corporate Gathering Buffets',
    badge: 'LARGE SCALE SUMMIT',
    tagline: 'Annual general meetings, summits, conferences & tech park banquets',
    description:
      'Complete end-to-end banquet catering for large enterprise gatherings. Includes hot chafing dish stations, live counter options, professional servers, and multi-cuisine spreads with FSSAI lab certification.',
    pricePerPlate: 389,
    minGuests: 30,
    idealFor: 'Conferences, Client Visits, Tech Summits & Annual Day Banquets',
    icon: Building2,
    accentColor: 'text-emerald-600',
    borderActive: 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20',
    bgGradient: 'from-emerald-600 via-teal-600 to-blue-700',
    menu: {
      welcomeDrink: ['Blue Curacao Punch', 'Badam Pista Milk (Hot/Cold)'],
      starters: ['Veg Galouti Kebab on Mini Crisps', 'Paneer Malai Tikka', 'Crispy Corn Salt & Pepper'],
      mainCurries: ['Kadhai Paneer Special', 'Kaju Curry (Rich Cashew Gravy)', 'Dum Aloo Kashmiri'],
      dalAndBreads: ['Dal Bukhara (18hr slow cooked)', 'Assorted Breads (Butter Naan, Paratha, Kulcha)'],
      riceAndBiryani: ['Hyderabadi Veg Dum Biryani with Mirchi Ka Salan'],
      dessert: ['Rabdi with Mini Jalebi (Live Counter)', 'Ice Cream Sundae Bar'],
      accompaniments: ['Live Chaat Station (Pani Puri & Dahi Puri)', 'Five Variety Salad Bar', 'Roasted Papadum Platter'],
    },
    perks: [
      'Chafing dishes, brass warmers & serving equipment included',
      'Uniformed hospitality staff & buffet managers available',
      'Complete waste segregation and eco disposal after event',
      'Consolidated monthly corporate billing with GST credit',
    ],
  },
  meeting: {
    key: 'meeting',
    title: 'Custom Event Catering & VIP Meetings',
    badge: 'BESPOKE & SATTVIC',
    tagline: 'VIP boardroom lunches, religious pujas, weddings & custom diet menus',
    description:
      'Have a unique requirement? From 100% strict Jain catering without potato/onion/garlic to traditional South Indian banana leaf spreads or high-protein corporate fitness menus, we tailor every single bite.',
    pricePerPlate: 319,
    minGuests: 15,
    idealFor: 'Board Meetings, Jain Tithis, Family Pujas & Intimate Celebrations',
    icon: UtensilsCrossed,
    accentColor: 'text-purple-600',
    borderActive: 'border-purple-500 bg-purple-50/70 ring-2 ring-purple-500/20',
    bgGradient: 'from-purple-600 via-violet-600 to-indigo-600',
    menu: {
      welcomeDrink: ['Traditional Jaljeera Cooler', 'Aam Panna / Tender Coconut Water'],
      starters: ['Methi Na Gota with Kadhi', 'Paneer Hariyali Tikka'],
      mainCurries: ['Jain Gatta Curry (No Root Veg)', 'Paneer Makhani (No Onion/Garlic option)', 'Gujarati Undhiyu / Seasonal Special'],
      dalAndBreads: ['Gujarati Khatti Meethi Dal', 'Desi Ghee Phulkas & Bajri Roti with White Butter'],
      riceAndBiryani: ['Rajbhog Khichdi & Steamed Rice'],
      dessert: ['Authentic Mohanthal', 'Gulab Jamun with Rabdi'],
      accompaniments: ['Athana Mirchi', 'Fried Papad', 'Kachumber Salad (Jain style without carrots/radish)'],
    },
    perks: [
      '100% segregated cooking vessels for Pure Jain / Sattvic meals',
      'Tailor any item in the menu with zero rigid restrictions',
      'Complimentary pre-event menu tasting session for 40+ guests',
      'Direct line to MyChef Head of Culinary Operations',
    ],
  },
};

function EventsCateringContent() {
  const searchParams = useSearchParams();
  const rawType = searchParams.get('type') as EventTypeKey | null;

  const validKey: EventTypeKey =
    rawType && EVENT_PACKAGES[rawType] ? rawType : 'birthday';

  const [activeTab, setActiveTab] = useState<EventTypeKey>(validKey);
  const [dietaryType, setDietaryType] = useState<'pure_veg' | 'jain' | 'mixed'>('pure_veg');
  const [guestCount, setGuestCount] = useState<number>(35);

  const { city: userCity, addInquiry, user } = useApp();

  // Booking Form State
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(userCity || 'Ahmedabad');
  const [eventDate, setEventDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const formRefId = useId();

  // Sync tab with URL if user clicked link or changed URL
  useEffect(() => {
    if (rawType && EVENT_PACKAGES[rawType]) {
      setActiveTab(rawType);
      // Ensure guestCount is at least the min for this package
      if (guestCount < EVENT_PACKAGES[rawType].minGuests) {
        setGuestCount(EVENT_PACKAGES[rawType].minGuests);
      }
    }
  }, [rawType]);

  const currentPkg = EVENT_PACKAGES[activeTab];
  const totalPrice = guestCount * currentPkg.pricePerPlate;

  const handleTabChange = (key: EventTypeKey) => {
    setActiveTab(key);
    if (guestCount < EVENT_PACKAGES[key].minGuests) {
      setGuestCount(EVENT_PACKAGES[key].minGuests);
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!fullName.trim()) errors.fullName = 'Please enter your name';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a 10-digit mobile number';
    }
    if (!eventDate) errors.eventDate = 'Please select your event date';
    if (!city.trim()) errors.city = 'Please select your city';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await addInquiry({
        category: 'event_catering',
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        pincode: undefined,
        organizationName: `${currentPkg.title} (${guestCount} guests)`,
        estimatedMealsCount: `${guestCount} guests • ₹${currentPkg.pricePerPlate}/plate`,
        dietaryPreference: dietaryType === 'jain' ? 'jain' : dietaryType === 'pure_veg' ? 'pure_veg' : 'all',
        startDate: eventDate,
        subject: `Event Catering Quote: ${currentPkg.title} for ${guestCount} guests in ${city}`,
        message: `Package: ${currentPkg.title}
Estimated Guests: ${guestCount}
Price Estimate: ₹${totalPrice.toLocaleString('en-IN')}
Diet Preference: ${dietaryType.toUpperCase()}
Event Date: ${eventDate}
Venue / Address: ${deliveryAddress || 'To be shared'}
Special Instructions: ${notes || 'None provided'}`,
      });

      if (result.success) {
        setSubmittedInquiryId(result.inquiryId);
        const el = document.getElementById(formRefId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error('Failed to submit catering inquiry:', err);
      alert('Unable to send quote request right now. Please message us on WhatsApp or call our helpline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const resetForm = () => {
    setSubmittedInquiryId(null);
    setNotes('');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello MyChef Catering Team! I would like to book / inquire about *${currentPkg.title}*.\n\n` +
      `*Reference*: ${submittedInquiryId || 'NEW-EVENT'}\n` +
      `*Name*: ${fullName || 'Guest'}\n` +
      `*City*: ${city}\n` +
      `*Guests*: ${guestCount}\n` +
      `*Estimated Total*: ₹${totalPrice.toLocaleString('en-IN')}\n` +
      `*Event Date*: ${eventDate || 'Upcoming'}\n` +
      `*Diet*: ${dietaryType.toUpperCase()}\n\n` +
      `Please share available kitchen slots and menu tasting confirmation.`
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-24">
      
      {/* 1. HERO BANNER */}
      <section className="relative overflow-hidden bg-linear-to-b from-stone-950 via-stone-900 to-stone-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black tracking-wide uppercase shadow-inner">
              <PartyPopper className="w-3.5 h-3.5 text-emerald-400" />
              <span>Authentic Homestyle Bulk & Event Catering</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Feasts Cooked With Love,{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-amber-300 to-yellow-300">
                Delivered Piping Hot
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
              From birthday celebration thalis and team anniversary lunches to 500+ guest corporate buffets — choose pure ghee homestyle food prepared in FSSAI-audited kitchens.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-stone-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% FSSAI Inspected</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Insulated Thermal Packaging (Stays 65°C+ for 4 hrs)</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>4.9★ Average Rating (1,400+ Events Catered)</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EVENT TYPE SELECTOR TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                Select Your Event Category
              </span>
              <h2 className="text-lg sm:text-xl font-black text-stone-900 mt-1">
                Choose a Tailored Catering Package
              </h2>
            </div>
            <span className="text-xs text-stone-500 hidden sm:inline">
              Prices scale automatically with guest count
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {(Object.keys(EVENT_PACKAGES) as EventTypeKey[]).map((k) => {
              const pkg = EVENT_PACKAGES[k];
              const Icon = pkg.icon;
              const isSelected = activeTab === k;

              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleTabChange(k)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? `${pkg.borderActive} shadow-md`
                      : 'border-stone-200 bg-stone-50/50 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 shadow-2xs'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black text-stone-900 font-mono">
                        ₹{pkg.pricePerPlate}/pl
                      </span>
                    </div>

                    <span className="text-[9px] font-black uppercase tracking-wider text-stone-400 block truncate">
                      {pkg.badge}
                    </span>
                    <h3 className={`text-xs font-black mt-0.5 leading-snug ${isSelected ? 'text-stone-900' : 'text-stone-700'}`}>
                      {pkg.title}
                    </h3>
                  </div>

                  <span className={`text-[10px] mt-3 font-bold ${isSelected ? pkg.accentColor : 'text-stone-400'}`}>
                    {isSelected ? '✓ Viewing Menu' : 'View Package →'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ACTIVE PACKAGE DETAIL & INTERACTIVE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: Package Showcase, Menu Breakdown, Perks */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {currentPkg.idealFor}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
                    {currentPkg.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 font-medium">
                    {currentPkg.tagline}
                  </p>
                </div>

                <div className="text-right bg-stone-50 p-3 rounded-2xl border border-stone-200 shrink-0">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Starting At</span>
                  <span className="text-2xl font-black text-stone-900 font-mono">
                    ₹{currentPkg.pricePerPlate}
                  </span>
                  <span className="text-[11px] text-stone-500 block">/ guest (min {currentPkg.minGuests})</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                {currentPkg.description}
              </p>

              {/* Dietary Switcher */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-stone-100">
                <span className="text-xs font-black text-stone-700 mr-1">Kitchen Style:</span>
                <button
                  type="button"
                  onClick={() => setDietaryType('pure_veg')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dietaryType === 'pure_veg'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  🟢 100% Pure Veg (Gujarati / Punjabi)
                </button>
                <button
                  type="button"
                  onClick={() => setDietaryType('jain')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dietaryType === 'jain'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  🟡 Strict Jain (No Onion, Garlic or Root Veg)
                </button>
                <button
                  type="button"
                  onClick={() => setDietaryType('mixed')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    dietaryType === 'mixed'
                      ? 'bg-stone-900 text-white shadow-2xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  ⚪ Mixed / Flexible Spread
                </button>
              </div>
            </div>

            {/* Menu Courses Breakdown Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-black text-stone-900">
                    Sample Curated Feast Menu
                  </h3>
                </div>
                <span className="text-xs font-bold text-stone-500">
                  Customizable to your preference
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Welcome Drinks & Starters */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-stone-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Welcome Drinks & Starters</span>
                  </div>
                  <ul className="space-y-1 text-stone-600 list-disc list-inside">
                    {currentPkg.menu.welcomeDrink.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                    {currentPkg.menu.starters.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Main Course Curries */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-stone-900">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    <span>Main Gourmet Gravies</span>
                  </div>
                  <ul className="space-y-1 text-stone-600 list-disc list-inside">
                    {currentPkg.menu.mainCurries.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Breads & Dal */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-stone-900">
                    <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Fresh Breads & Simmered Dal</span>
                  </div>
                  <ul className="space-y-1 text-stone-600 list-disc list-inside">
                    {currentPkg.menu.dalAndBreads.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                {/* Rice, Desserts & Accompaniments */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-stone-900">
                    <Award className="w-3.5 h-3.5 text-purple-500" />
                    <span>Rice, Desserts & Sides</span>
                  </div>
                  <ul className="space-y-1 text-stone-600 list-disc list-inside">
                    {currentPkg.menu.riceAndBiryani.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                    {currentPkg.menu.dessert.map((ds, i) => (
                      <li key={i} className="font-semibold text-emerald-800">
                        ✨ {ds}
                      </li>
                    ))}
                    {currentPkg.menu.accompaniments.map((ac, i) => (
                      <li key={i} className="text-stone-500">
                        {ac}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* What's Included Perks */}
              <div className="pt-4 border-t border-stone-100">
                <span className="text-xs font-black text-stone-900 uppercase tracking-wider block mb-2">
                  Every Order Includes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
                  {currentPkg.perks.map((p, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality & Hygiene Guarantee Card */}
            <div className="p-6 rounded-3xl bg-linear-to-r from-stone-900 to-stone-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>32-Point Food Hygiene Inspection</span>
                </div>
                <h4 className="text-base font-black text-white">
                  Zero Palm Oil. 100% Pure Ghee & Cold-Pressed Mustard/Groundnut Oils.
                </h4>
                <p className="text-xs text-stone-400">
                  We invite corporate admins and party hosts to request an unannounced morning inspection of partner kitchens.
                </p>
              </div>
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs whitespace-nowrap transition-colors shrink-0 shadow-md flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>

          </div>

          {/* RIGHT 5 COLS: Interactive Pricing Calculator & Direct Booking Form */}
          <div id={formRefId} className="lg:col-span-5 space-y-6">
            
            {/* Live Pricing Calculator Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-orange-600" />
                  <h3 className="text-base font-black text-stone-900">
                    Live Guest & Cost Calculator
                  </h3>
                </div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                  Transparent Quote
                </span>
              </div>

              {/* Slider for Guest Count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>Number of Guests / Meals:</span>
                  <span className="text-base font-black text-orange-600 font-mono">
                    {guestCount} Guests
                  </span>
                </div>
                <input
                  type="range"
                  min={currentPkg.minGuests}
                  max={250}
                  step={5}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-orange-600 cursor-pointer h-2 bg-stone-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Min {currentPkg.minGuests}</span>
                  <span>100</span>
                  <span>250+ guests</span>
                </div>
              </div>

              {/* Cost Calculation Summary */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Base Rate per Plate</span>
                  <span className="font-mono font-bold text-stone-900">₹{currentPkg.pricePerPlate}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Insulated Thermal Packaging</span>
                  <span className="font-bold text-emerald-600">Included Free</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Bio-degradable Cutlery & Plates</span>
                  <span className="font-bold text-emerald-600">Included Free</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                  <div>
                    <span className="font-black text-stone-900 text-sm block">Estimated Total</span>
                    <span className="text-[10px] text-stone-400">Inclusive of all kitchen preparation</span>
                  </div>
                  <span className="text-2xl font-black text-orange-600 font-mono">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Bonus Perk Callout */}
              {guestCount >= 50 && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>50+ Guests Bonus: Complimentary Welcome Mocktail counter upgrade!</span>
                </div>
              )}
            </div>

            {/* Direct Booking / Inquiry Form Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-md">
              {submittedInquiryId ? (
                /* Success Message Screen */
                <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Catering Request Received
                    </span>
                    <h4 className="text-xl font-black text-stone-900">
                      We&apos;re On It, {fullName}!
                    </h4>
                    <p className="text-xs text-stone-500">
                      Our Head of Catering Operations in <strong className="text-stone-800">{city}</strong> has been notified for your <strong className="text-stone-800">{currentPkg.title}</strong>.
                    </p>
                  </div>

                  {/* Ref Box */}
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between text-left text-xs">
                    <div>
                      <span className="text-[10px] text-stone-400 font-bold block uppercase">Booking Reference</span>
                      <span className="font-mono font-black text-stone-900 text-sm">{submittedInquiryId}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyId(submittedInquiryId)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-100 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                      <span>{copiedId ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="pt-2 space-y-2">
                    <a
                      href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirm Menu on WhatsApp (Instant)</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 font-bold transition-colors cursor-pointer"
                    >
                      Configure Another Event
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Booking Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-base font-black text-stone-900">
                      Request Quote & Kitchen Slot
                    </h3>
                    <p className="text-xs text-stone-500">
                      Receive an exact breakdown, sample tasting date & brochure in 15 mins.
                    </p>
                  </div>

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                      Contact Name <span className="text-orange-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sonal Patel / Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-colors ${
                        formErrors.fullName ? 'border-red-500 bg-red-50/40' : 'border-stone-300 focus:border-orange-500'
                      }`}
                    />
                    {formErrors.fullName && <p className="text-[10px] text-red-600 font-bold">{formErrors.fullName}</p>}
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                        Phone (WhatsApp) <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-colors ${
                          formErrors.phone ? 'border-red-500 bg-red-50/40' : 'border-stone-300 focus:border-orange-500'
                        }`}
                      />
                      {formErrors.phone && <p className="text-[10px] text-red-600 font-bold">{formErrors.phone}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                        Email Address <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none transition-colors ${
                          formErrors.email ? 'border-red-500 bg-red-50/40' : 'border-stone-300 focus:border-orange-500'
                        }`}
                      />
                      {formErrors.email && <p className="text-[10px] text-red-600 font-bold">{formErrors.email}</p>}
                    </div>
                  </div>

                  {/* City & Event Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                        City / Hub <span className="text-orange-600">*</span>
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        {CITIES_AND_HUBS.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} ({c.state})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                        Event Date <span className="text-orange-600">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none transition-colors ${
                          formErrors.eventDate ? 'border-red-500 bg-red-50/40' : 'border-stone-300 focus:border-orange-500'
                        }`}
                      />
                      {formErrors.eventDate && <p className="text-[10px] text-red-600 font-bold">{formErrors.eventDate}</p>}
                    </div>
                  </div>

                  {/* Delivery Venue Address */}
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center justify-between">
                      <span>Venue / Delivery Address</span>
                      <span className="text-[10px] text-stone-400 font-normal">Optional</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Infocity Tower 2, Gandhinagar / Satellite Hall, Ahmedabad"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Notes / Special Instructions */}
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center justify-between">
                      <span>Specific Preferences or Custom Items</span>
                      <span className="text-[10px] text-stone-400 font-normal">Optional</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Mention any Jain requirements, specific sweets (Mohanthal/Shrikhand), live chaat setup request, or timing..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs shadow-md shadow-orange-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Custom Quote & Slot (₹{totalPrice.toLocaleString('en-IN')})</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 text-center">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>Response within 15–30 minutes via WhatsApp/Call</span>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Catering Operations FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            How packaging, delivery timing, tasting sessions, and custom menus work.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does food stay hot and fresh during transit?',
              a: 'All items are packed in heavy-duty food-grade thermal insulated carriers that keep curries, dals, and rotis at 65°C+ for up to 4 hours without any external reheating required.',
            },
            {
              q: 'Can we schedule a pre-event tasting session?',
              a: 'Yes! For event bookings with 40+ guests or recurring corporate orders, we arrange a sample tasting box delivered to your home or office reception so you can sample the quality firsthand.',
            },
            {
              q: 'Can we request 100% strict Jain food with zero onion, garlic, or root vegetables?',
              a: 'Absolutely. Over 65% of our catering kitchens are dedicated Pure Jain and vegetarian. We use separate cooking zones and vessels, and substitute potatoes with raw bananas or paneer.',
            },
            {
              q: 'Do you provide buffet servers and chafing dish warmers?',
              a: 'For our Corporate Buffets and Celebrations with 30+ guests, we offer optional stainless steel or brass chafing dishes with burner warmers, and trained hospitality serving staff.',
            },
            {
              q: 'What is the cancellation or guest count modification policy?',
              a: 'You can adjust your final headcount up to 24 hours prior to the event date without any penalty fees.',
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-1.5"
            >
              <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">
                  Q
                </span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default function EventsCateringPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-stone-600">Loading Events & Catering Packages...</p>
        </div>
      </div>
    }>
      <EventsCateringContent />
    </Suspense>
  );
}
