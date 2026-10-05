'use client';

import React, { useState, useId, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CITIES_AND_HUBS } from '@/lib/cities';
import { InquiryCategory } from '@/lib/types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  GraduationCap,
  ChefHat,
  PartyPopper,
  LifeBuoy,
  Send,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ArrowRight,
  UtensilsCrossed,
  Copy,
  Check,
  Zap,
  Info,
  ExternalLink,
  Compass,
  Bike,
  ShoppingBag
} from 'lucide-react';

interface InquiryFormState {
  category: InquiryCategory;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  pincode: string;
  organizationName: string;
  estimatedMealsCount: string;
  dietaryPreference: 'all' | 'pure_veg' | 'jain' | 'custom';
  startDate: string;
  kitchenType?: string;
  hasFssai?: string;
  subject: string;
  message: string;
}

const CATEGORIES: {
  id: InquiryCategory;
  title: string;
  shortTitle: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  activeBorder: string;
  bgColor: string;
}[] = [
  {
    id: 'corporate',
    title: 'Corporate & Tech Park Meals',
    shortTitle: 'Corporate Meals',
    description: 'Bulk office lunch boxes, team meal subscriptions, and executive dining with GST invoices.',
    badge: 'FOR OFFICES & TEAMS',
    icon: Building2,
    color: 'text-blue-600',
    activeBorder: 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20',
    bgColor: 'bg-blue-600',
  },
  {
    id: 'student_mess',
    title: 'PG & Hostel Mess Partnership',
    shortTitle: 'Hostel & PG Mess',
    description: 'Replace unreliable mess food with verified ₹84/meal student passes & doorstep delivery.',
    badge: 'STUDENT HUBS',
    icon: GraduationCap,
    color: 'text-amber-600',
    activeBorder: 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20',
    bgColor: 'bg-amber-600',
  },
  {
    id: 'chef_partner',
    title: 'Home Chef & Kitchen Onboarding',
    shortTitle: 'Chef Partner',
    description: 'Cook authentic homestyle food from your kitchen. We handle packaging, orders & delivery.',
    badge: 'EARN ₹45K-₹90K/MO',
    icon: ChefHat,
    color: 'text-orange-600',
    activeBorder: 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20',
    bgColor: 'bg-orange-600',
  },
  {
    id: 'event_catering',
    title: 'Event, Festival & Party Catering',
    shortTitle: 'Bulk Catering',
    description: 'Fresh festive feasts, birthday lunches, family gatherings, and community buffets.',
    badge: '15 TO 250+ GUESTS',
    icon: PartyPopper,
    color: 'text-emerald-600',
    activeBorder: 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20',
    bgColor: 'bg-emerald-600',
  },
  {
    id: 'customer_care',
    title: 'Customer Care & General Help',
    shortTitle: 'Support & Billing',
    description: 'Questions about meal deliveries, skip policy, refunds, app assistance or general queries.',
    badge: '15-MIN SLA',
    icon: LifeBuoy,
    color: 'text-purple-600',
    activeBorder: 'border-purple-500 bg-purple-50/60 ring-2 ring-purple-500/20',
    bgColor: 'bg-purple-600',
  },
];

const FAQS = [
  {
    q: 'How fast do you respond to corporate and partner inquiries?',
    a: 'Our Regional Operations Desk operates from 8:00 AM to 10:00 PM IST daily. For corporate and mess partnerships, our team responds via call or WhatsApp within 15 to 30 minutes with customized menu brochures and sample tasting options.',
  },
  {
    q: 'Can we schedule a free sample tasting box before finalizing a corporate or PG tie-up?',
    a: 'Yes! For corporate accounts with 15+ daily meals or hostel messes with 30+ students, we provide complimentary sample tasting boxes delivered directly to your office reception or warden office.',
  },
  {
    q: 'What are the eligibility criteria for home chefs to partner with MyChef?',
    a: 'We require a clean kitchen environment adhering to basic food hygiene standards. We assist partners in obtaining mandatory FSSAI registration if not already available. Our team conducts a physical kitchen inspection and sample taste-test before onboarding.',
  },
  {
    q: 'Do you offer custom dietary menus like 100% Jain or Diabetic-friendly meals?',
    a: 'Absolutely. Over 65% of our kitchens provide dedicated Pure Jain options (prepared without root vegetables like onion, garlic, or potatoes). We also offer low-oil, diabetic-friendly, high-protein sprouted thalis, and gluten-sensitive rotis upon request.',
  },
  {
    q: 'How does corporate billing and employee payroll deduction work?',
    a: 'We provide unified monthly invoicing with GST credit for companies. Employees can either be sponsored 100% by the employer, subsidized partially, or opt-in independently via dedicated corporate discount coupons.',
  },
];

function ContactContent() {
  const { city: userCity, addInquiry, user } = useApp();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<InquiryFormState>({
    category: 'corporate',
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: userCity || 'Ahmedabad',
    pincode: '',
    organizationName: '',
    estimatedMealsCount: '25-50 meals/day',
    dietaryPreference: 'pure_veg',
    startDate: '',
    kitchenType: 'Home Kitchen',
    hasFssai: 'yes',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const formSectionId = useId();

  // Handle URL query parameters to preselect category and prefill values
  useEffect(() => {
    const categoryParam = searchParams.get('category') as InquiryCategory | null;
    const subjectParam = searchParams.get('subject');
    const mealsParam = searchParams.get('meals');
    const cityParam = searchParams.get('city');
    const routeParam = searchParams.get('route');

    setFormData((prev) => {
      const nextCategory = categoryParam && CATEGORIES.some(c => c.id === categoryParam)
        ? categoryParam
        : prev.category;

      let nextSubject = prev.subject;
      if (subjectParam) {
        nextSubject = subjectParam;
      } else if (routeParam) {
        nextSubject = `Delivery Route Inquiry for ${routeParam}`;
      } else if (!nextSubject) {
        nextSubject = nextCategory === 'corporate'
          ? 'Corporate Daily Meal Subscription Inquiry'
          : nextCategory === 'student_mess'
          ? 'Hostel / PG Student Mess Tie-up Inquiry'
          : nextCategory === 'chef_partner'
          ? 'Home Chef Partnership & Onboarding Inquiry'
          : nextCategory === 'event_catering'
          ? 'Special Event Feast / Party Catering Inquiry'
          : 'Customer Support / General Assistance';
      }

      return {
        ...prev,
        category: nextCategory,
        subject: nextSubject,
        estimatedMealsCount: mealsParam || prev.estimatedMealsCount,
        city: cityParam || prev.city,
        message: routeParam ? `Inquiring about meal delivery schedule and coverage for the ${routeParam} route.` : prev.message,
      };
    });
  }, [searchParams]);

  const handleCategorySelect = (category: InquiryCategory) => {
    setFormData((prev) => ({
      ...prev,
      category,
      subject:
        category === 'corporate'
          ? 'Corporate Daily Meal Subscription Inquiry'
          : category === 'student_mess'
          ? 'Hostel / PG Student Mess Tie-up Inquiry'
          : category === 'chef_partner'
          ? 'Home Chef Partnership & Onboarding Inquiry'
          : category === 'event_catering'
          ? 'Special Event Feast / Party Catering Inquiry'
          : 'Customer Support / General Assistance',
    }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your contact phone number';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.city.trim()) errors.city = 'Please select or enter your city';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide brief details (at least 10 characters)';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // 1. Submit to AppContext / Internal API endpoint
      const result = await addInquiry({
        category: formData.category,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim() || undefined,
        organizationName: formData.organizationName.trim() || undefined,
        estimatedMealsCount: formData.estimatedMealsCount || undefined,
        dietaryPreference: formData.dietaryPreference,
        startDate: formData.startDate || undefined,
        subject:
          formData.subject.trim() ||
          `${formData.category.toUpperCase()} Inquiry from ${formData.fullName}`,
        message: formData.message.trim(),
      });

      // 2. Submit to Netlify Forms (so submissions are logged in Netlify Forms Dashboard on mytiffin.netlify.app)
      try {
        const netlifyFormData = new URLSearchParams();
        netlifyFormData.append('form-name', 'contact-inquiry');
        netlifyFormData.append('category', formData.category);
        netlifyFormData.append('fullName', formData.fullName.trim());
        netlifyFormData.append('email', formData.email.trim());
        netlifyFormData.append('phone', formData.phone.trim());
        netlifyFormData.append('city', formData.city.trim());
        netlifyFormData.append('pincode', formData.pincode.trim());
        netlifyFormData.append('organizationName', formData.organizationName.trim());
        netlifyFormData.append('estimatedMealsCount', formData.estimatedMealsCount);
        netlifyFormData.append('dietaryPreference', formData.dietaryPreference);
        netlifyFormData.append('startDate', formData.startDate);
        netlifyFormData.append('kitchenType', formData.kitchenType || '');
        netlifyFormData.append('hasFssai', formData.hasFssai || '');
        netlifyFormData.append('subject', formData.subject.trim());
        netlifyFormData.append('message', formData.message.trim());

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: netlifyFormData.toString(),
        });
      } catch (err) {
        // Non-fatal, AppContext has already stored the lead
        console.warn('Netlify form post notice:', err);
      }

      if (result.success) {
        setSubmittedInquiryId(result.inquiryId);
        const el = document.getElementById(formSectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      alert('Unable to submit inquiry right now. Please try reaching out directly on WhatsApp or call our support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  const resetForm = () => {
    setSubmittedInquiryId(null);
    setFormData((prev) => ({
      ...prev,
      organizationName: '',
      subject: '',
      message: '',
      pincode: '',
    }));
  };

  const activeCategoryMeta =
    CATEGORIES.find((c) => c.id === formData.category) || CATEGORIES[0];

  const whatsappMessage = encodeURIComponent(
    `Hello MyChef Team! I have submitted an inquiry on your website.\n\n` +
      `*Reference ID*: ${submittedInquiryId || 'NEW-INQUIRY'}\n` +
      `*Type*: ${activeCategoryMeta.title}\n` +
      `*Name*: ${formData.fullName}\n` +
      `*City*: ${formData.city}\n` +
      (formData.organizationName ? `*Organization*: ${formData.organizationName}\n` : '') +
      `*Details*: ${formData.message.slice(0, 140)}...\n\n` +
      `Please connect with me regarding next steps.`
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-orange-950 via-stone-900 to-stone-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-black tracking-wide uppercase shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Direct Concierge & Inquiry Desk</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Let&apos;s Connect & <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 via-amber-300 to-yellow-300">Nourish Together</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto">
              Whether you need customized corporate lunch subscriptions, a student hostel mess tie-up, want to partner as a certified home chef, or have customer queries — our operations desk is here for you.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-xs font-semibold text-stone-300">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>15-Minute Response SLA</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% FSSAI Inspected</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>60+ Hubs in Gujarat, Pune & Bangalore</span>
              </span>
            </div>
          </div>

          {/* Direct Channels Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent('Hello MyChef! I would like to inquire about your homestyle meal subscriptions.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 transition-all shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                    WhatsApp Concierge
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">Instant chat, live meal menus & quick support</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>+91 98765 43210</span>
                <span>Chat Now →</span>
              </div>
            </a>

            {/* Direct Helpline */}
            <a
              href="tel:+919876543210"
              className="group p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 transition-all shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                    Toll-Free Helpline
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">Direct operations & support line (8 AM – 10 PM)</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-amber-400">
                <span>1800-MY-CHEF (Toll-Free)</span>
                <span>Call →</span>
              </div>
            </a>

            {/* Official Email */}
            <a
              href="mailto:concierge@mychef.in?subject=MyChef%20Platform%20Inquiry"
              className="group p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 transition-all shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-orange-300 transition-colors flex items-center gap-1.5">
                    Email Desk
                    <ExternalLink className="w-3 h-3 text-stone-400" />
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">Formal proposals, RFP requests & partnerships</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-orange-400">
                <span>concierge@mychef.in</span>
                <span>Write →</span>
              </div>
            </a>

            {/* Central Operations Hub */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                    Central Operations Hub
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Tower 4, Infocity / GIFT City Gateway, Gandhinagar 382009
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-blue-300">
                <span>Gujarat & Pune Hubs</span>
                <span className="text-[10px] text-stone-400">Visitor Timings: 10AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Quick Route Discovery Banner */}
          <div className="mt-8 p-4 rounded-2xl bg-linear-to-r from-orange-600/30 via-amber-600/20 to-stone-800/40 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/30 text-orange-300 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Looking to browse daily tiffins & meal delivery routes?</h4>
                <p className="text-xs text-stone-300">
                  Explore 60+ verified home kitchens, campus student messes, and smart parcel lockers on our Browsing Route.
                </p>
              </div>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs transition-colors shrink-0 shadow-md"
            >
              <span>Explore Browsing Route</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section id={formSectionId} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
          
          {/* Step 1: Category Selector */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-stone-100 bg-stone-50/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100/80 px-2.5 py-1 rounded-md">
                  Step 1 • Choose Your Inquiry Category
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                  What can we help you organize?
                </h2>
              </div>
              <span className="text-xs font-medium text-stone-500 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-stone-400" />
                Select a tab to customize form fields
              </span>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = formData.category === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`relative text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? cat.activeBorder + ' shadow-md'
                        : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isSelected ? `${cat.bgColor} text-white` : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                        )}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-stone-400 block truncate">
                        {cat.badge}
                      </span>
                      <h3
                        className={`text-xs font-black mt-0.5 leading-tight ${
                          isSelected ? 'text-stone-900' : 'text-stone-700'
                        }`}
                      >
                        {cat.shortTitle}
                      </h3>
                    </div>

                    <span
                      className={`text-[10px] mt-2 font-bold ${
                        isSelected ? cat.color : 'text-stone-400'
                      }`}
                    >
                      {isSelected ? '✓ Selected' : 'Select →'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content / Success Confirmation */}
          <div className="p-4 sm:p-6 lg:p-10">
            {submittedInquiryId ? (
              /* Success Confirmation */
              <div className="max-w-2xl mx-auto py-8 sm:py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200">
                    Inquiry Successfully Received
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
                    Thank You, {formData.fullName}!
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Your inquiry has been routed to our{' '}
                    <strong className="text-stone-900">{activeCategoryMeta.shortTitle}</strong> desk in{' '}
                    <strong className="text-stone-900">{formData.city}</strong>.
                  </p>
                </div>

                {/* Reference ID Pill */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 max-w-md mx-auto text-left flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                      Inquiry Tracking Reference
                    </span>
                    <span className="text-base font-black text-stone-900 font-mono tracking-tight">
                      {submittedInquiryId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyId(submittedInquiryId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700 transition-colors cursor-pointer"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* What Happens Next Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-orange-50/70 border border-orange-200/80 text-left max-w-md mx-auto space-y-2 text-xs text-stone-700">
                  <div className="flex items-center gap-2 font-black text-orange-950">
                    <Zap className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>What happens next?</span>
                  </div>
                  <ul className="space-y-1.5 text-stone-600 list-disc list-inside">
                    <li>Our regional operations lead will review your request within <strong>15–30 minutes</strong>.</li>
                    <li>You will receive a WhatsApp message or call on <strong>{formData.phone}</strong> with sample menus and custom pricing.</li>
                    <li>We will schedule a free sample tasting box if requested.</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Continue on WhatsApp with Ref #{submittedInquiryId}</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* Active Inquiry Form with Netlify Support */
              <form
                name="contact-inquiry"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Netlify Hidden Form Detection Fields */}
                <input type="hidden" name="form-name" value="contact-inquiry" />
                <p className="hidden">
                  <label>
                    Don’t fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>
                <input type="hidden" name="category" value={formData.category} />
                
                {/* Active Category Description Banner */}
                <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${activeCategoryMeta.bgColor} text-white flex items-center justify-center shrink-0`}>
                      {React.createElement(activeCategoryMeta.icon, { className: 'w-5 h-5' })}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-stone-900">
                        {activeCategoryMeta.title}
                      </h4>
                      <p className="text-xs text-stone-600">
                        {activeCategoryMeta.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-black text-orange-700 uppercase tracking-wider bg-white px-2.5 py-1 rounded-lg border border-orange-200/80 self-start sm:self-auto shrink-0">
                    Step 2 • Fill Details
                  </span>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center justify-between">
                      <span>Full Name <span className="text-orange-600">*</span></span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Dr. Aryan Patel / Priya Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                        formErrors.fullName
                          ? 'border-red-500 bg-red-50/30 focus:border-red-600'
                          : 'border-stone-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] font-bold text-red-600">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center justify-between">
                      <span>Work / Personal Email <span className="text-orange-600">*</span></span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com or gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                        formErrors.email
                          ? 'border-red-500 bg-red-50/30 focus:border-red-600'
                          : 'border-stone-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] font-bold text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center justify-between">
                      <span>WhatsApp / Mobile Number <span className="text-orange-600">*</span></span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        placeholder="98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          formErrors.phone
                            ? 'border-red-500 bg-red-50/30 focus:border-red-600'
                            : 'border-stone-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] font-bold text-red-600">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* City Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                      <span>Delivery Hub / City <span className="text-orange-600">*</span></span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer"
                    >
                      {CITIES_AND_HUBS.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.state})
                        </option>
                      ))}
                      <option value="Other City">Other City (Expanding soon)</option>
                    </select>
                  </div>

                  {/* Delivery Pincode */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center justify-between">
                      <span>Local Pincode</span>
                      <span className="text-[10px] text-stone-400 font-normal">Optional</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      placeholder="e.g. 382009 / 380015"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  {/* Organization / Company / Hostel Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center justify-between">
                      <span>
                        {formData.category === 'corporate'
                          ? 'Company / Tech Park Name'
                          : formData.category === 'student_mess'
                          ? 'Hostel / PG / College Name'
                          : formData.category === 'chef_partner'
                          ? 'Kitchen or Brand Name'
                          : formData.category === 'event_catering'
                          ? 'Occasion / Event Name'
                          : 'Order / Subscription ID (if any)'}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      placeholder={
                        formData.category === 'corporate'
                          ? 'e.g. Infosys, TCS, GIFT City Tech'
                          : formData.category === 'student_mess'
                          ? 'e.g. Navrangpura PG, BVM Hostel'
                          : formData.category === 'chef_partner'
                          ? 'e.g. Maa Ki Rasoi Cloud Kitchen'
                          : formData.category === 'event_catering'
                          ? 'e.g. 50th Birthday, Corporate Annual Lunch'
                          : 'e.g. SUB-48912 or none'
                      }
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  {/* Headcount or Meal Volume */}
                  {formData.category !== 'customer_care' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                        {formData.category === 'corporate'
                          ? 'Estimated Daily Lunch Boxes'
                          : formData.category === 'student_mess'
                          ? 'Number of Students / Boarders'
                          : formData.category === 'chef_partner'
                          ? 'Daily Meal Cooking Capacity'
                          : 'Estimated Guests'}
                      </label>
                      <select
                        name="estimatedMealsCount"
                        value={formData.estimatedMealsCount}
                        onChange={(e) => setFormData({ ...formData, estimatedMealsCount: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer"
                      >
                        <option value="10-25 meals">10 to 25 meals / day</option>
                        <option value="25-50 meals/day">25 to 50 meals / day</option>
                        <option value="50-100 meals/day">50 to 100 meals / day</option>
                        <option value="100-250 meals/day">100 to 250+ meals / day</option>
                        <option value="500+ meals/day">500+ Enterprise Tier</option>
                        <option value="One-time bulk event">One-time celebration batch</option>
                      </select>
                    </div>
                  )}

                  {/* Chef Specific or Start Date */}
                  {formData.category === 'chef_partner' ? (
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                        FSSAI License Status
                      </label>
                      <select
                        name="hasFssai"
                        value={formData.hasFssai}
                        onChange={(e) => setFormData({ ...formData, hasFssai: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer"
                      >
                        <option value="yes">Active FSSAI Certificate Available</option>
                        <option value="applied">Applied / Renewal in Progress</option>
                        <option value="need_guidance">Need Assistance with Registration</option>
                      </select>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                        Preferred Start / Event Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  )}

                  {/* Dietary Preference */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                      Dietary Requirement
                    </label>
                    <select
                      name="dietaryPreference"
                      value={formData.dietaryPreference}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dietaryPreference: e.target.value as InquiryFormState['dietaryPreference'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 cursor-pointer"
                    >
                      <option value="pure_veg">100% Pure Vegetarian (Gujarati/Kathiyawadi/Punjabi)</option>
                      <option value="jain">Strict Jain (No Onion, No Garlic, No Potato)</option>
                      <option value="all">Mixed (Vegetarian + Non-Veg options)</option>
                      <option value="custom">Custom / Special Health (Diabetic/Low-Oil)</option>
                    </select>
                  </div>
                </div>

                {/* Subject & Detailed Message */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center justify-between">
                      <span>Inquiry Subject / Topic</span>
                      <span className="text-[10px] text-stone-400 font-normal">Brief headline</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="e.g. Requesting sample tasting for 40 tech engineers at Gandhinagar"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black uppercase tracking-wider text-stone-700">
                        Detailed Requirements or Message <span className="text-orange-600">*</span>
                      </label>
                      <span className="text-[11px] text-stone-400 font-mono">
                        {formData.message.length} chars
                      </span>
                    </div>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Please mention delivery timing preferences, custom thali preferences, special occasion date, or any questions for our operations desk..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                        formErrors.message
                          ? 'border-red-500 bg-red-50/30 focus:border-red-600'
                          : 'border-stone-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500'
                      }`}
                    />
                    {formErrors.message && (
                      <p className="text-[11px] font-bold text-red-600">{formErrors.message}</p>
                    )}
                  </div>
                </div>

                {/* Form Footer with Submit CTA */}
                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your details are secure. Netlify encrypted submission & instant SMS/WhatsApp routing.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm shadow-lg shadow-orange-600/25 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry & Receive Call/Brochure</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Operations Matrix Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-stone-900">
              Kitchen Quality & Hygiene Audits
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every home kitchen and cloud chef on MyChef is subjected to a 32-point food safety inspection, oil testing, and temperature logging during morning dispatch.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-black">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-stone-900">
              Corporate GST Invoicing & Credits
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Consolidate team lunches into a single monthly tax invoice with eligible input tax credit. Flexible subsidy options for employees and interns.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-stone-900">
              Zero-Spill Insulated EV Fleet
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Meals are packed in food-grade compartmentalized containers and transported inside thermal insulated boxes to arrive piping hot at your desk or hostel gate.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Everything you need to know about our partnerships, corporate food solutions, and support SLAs.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-stone-900 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Concierge Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-linear-to-r from-stone-900 via-stone-800 to-stone-900 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white">Need an immediate answer?</h3>
            <p className="text-xs text-stone-400">
              Our concierge team is available right now on WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hello%20MyChef%20Team!%20I%20have%20an%20urgent%20inquiry%20regarding%20meal%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp →</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default function ContactAndInquiryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-stone-600 font-bold text-sm">
          <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
          <span>Loading Inquiry Desk...</span>
        </div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
