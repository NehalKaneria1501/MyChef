import React from 'react';
import Link from 'next/link';
import {
  UtensilsCrossed,
  ShieldCheck,
  Heart,
  Zap,
  CalendarCheck,
  MessageSquare,
  Compass
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
          {/* Brand & Pure Quality Promise */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/30">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                My<span className="text-orange-500">Chef</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Empowering local neighborhood home chefs and delivering authentic, wholesome daily tiffins to students & professionals.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% FSSAI Certified</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
                <Zap className="w-4 h-4 shrink-0" />
                <span>Cold-Pressed Oils & Pure Ghee</span>
              </div>
            </div>
          </div>

          {/* Browsing Routes */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <Compass className="w-4 h-4 text-orange-500" />
              <h4 className="text-xs font-black uppercase tracking-wider">Browsing Routes</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/explore" className="text-orange-400 font-bold hover:text-orange-300 transition-colors flex items-center gap-1">
                  <span>Explore All Kitchens</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/explore?fulfillment=delivery" className="hover:text-orange-400 transition-colors font-medium">
                  Doorstep Delivery Route
                </Link>
              </li>
              <li>
                <Link href="/explore?fulfillment=parcel_locker" className="hover:text-orange-400 transition-colors font-medium">
                  Smart Parcel Locker Pickup
                </Link>
              </li>
              <li>
                <Link href="/explore?fulfillment=dine_in" className="hover:text-orange-400 transition-colors font-medium">
                  Campus Mess Dine-In Route
                </Link>
              </li>
              <li>
                <Link href="/passes" className="hover:text-orange-400 transition-colors font-medium">
                  Campus Meal Passes (₹84/meal)
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-orange-400 transition-colors font-medium">
                  Live EV Delivery Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscriptions */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <CalendarCheck className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-black uppercase tracking-wider">Subscriptions</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/consumer/subscriptions" className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>My Subscriptions</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/consumer/subscriptions" className="hover:text-amber-400 transition-colors font-medium">
                  Active Meal Calendar
                </Link>
              </li>
              <li>
                <Link href="/consumer/subscriptions" className="hover:text-amber-400 transition-colors font-medium">
                  Skip / Pause Rollover
                </Link>
              </li>
              <li>
                <Link href="/consumer/subscriptions" className="hover:text-amber-400 transition-colors font-medium">
                  Delivery Time Preferences
                </Link>
              </li>
              <li>
                <Link href="/consumer/subscriptions" className="hover:text-amber-400 transition-colors font-medium">
                  Change Delivery Address / Locker
                </Link>
              </li>
              <li>
                <Link href="/consumer/subscriptions" className="hover:text-amber-400 transition-colors font-medium">
                  Auto-Renewal & Invoices
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Inquiries */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-black uppercase tracking-wider">Contact & Inquiries</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/contact" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>Contact Us & Inquiry Desk</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/contact?category=corporate" className="hover:text-emerald-400 transition-colors font-medium">
                  Corporate & Office Meals RFP
                </Link>
              </li>
              <li>
                <Link href="/contact?category=student_mess" className="hover:text-emerald-400 transition-colors font-medium">
                  Hostel & PG Mess Tie-Up
                </Link>
              </li>
              <li>
                <Link href="/contact?category=chef_partner" className="hover:text-emerald-400 transition-colors font-medium">
                  Join as Home Chef Partner
                </Link>
              </li>
              <li>
                <Link href="/contact?category=event_catering" className="hover:text-emerald-400 transition-colors font-medium">
                  Party & Event Catering Quote
                </Link>
              </li>
              <li>
                <Link href="/contact?category=customer_care" className="hover:text-emerald-400 transition-colors font-medium">
                  Customer Care (15-min SLA)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Admin */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <h4 className="text-xs font-black uppercase tracking-wider">Platform Admin</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/admin" className="text-blue-400 font-bold hover:text-blue-300 transition-colors flex items-center gap-1">
                  <span>Platform Admin Console</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors font-medium">
                  Inquiries & Lead Manager
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors font-medium">
                  Pincode Routing Engine
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors font-medium">
                  Razorpay Auto-Debit Flow
                </Link>
              </li>
              <li>
                <Link href="/provider/dashboard" className="hover:text-blue-400 transition-colors font-medium">
                  Kitchen Operations & Dispatch
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors font-medium">
                  System Health & Ticket SLAs
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} MyChef Gourmet Loop. Modern Homestyle Food Subscription & Delivery Platform.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Prepared with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>& authentic homestyle love</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
