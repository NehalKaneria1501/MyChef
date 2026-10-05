import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, ShieldCheck, Heart, ChefHat, Layers, GraduationCap, PartyPopper, Zap, Sparkles } from 'lucide-react';

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

          {/* Kitchen Partner Hub (Kitchen Operations) */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <ChefHat className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-black uppercase tracking-wider">Kitchen Partner Hub</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/provider/dashboard" className="hover:text-amber-400 transition-colors font-medium">
                  Partner Dashboard & Dispatch
                </Link>
              </li>
              <li>
                <Link href="/provider/dashboard" className="hover:text-amber-400 transition-colors font-medium">
                  Weekly Menu Planner
                </Link>
              </li>
              <li>
                <Link href="/provider/dashboard" className="hover:text-amber-400 transition-colors font-medium">
                  FSSAI Hygiene Standards & Logs
                </Link>
              </li>
              <li>
                <Link href="/provider/dashboard" className="hover:text-amber-400 transition-colors font-medium">
                  Weekly Earnings & Instant Payouts
                </Link>
              </li>
              <li>
                <Link href="/provider/dashboard" className="hover:text-amber-400 transition-colors font-medium">
                  Daily Packaging & QR Labels
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 font-semibold text-amber-500/90 transition-colors">
                  Join as Home Chef Partner →
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & System Hubs (Admin & Platform) */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <Layers className="w-4 h-4 text-blue-500" />
              <h4 className="text-xs font-black uppercase tracking-wider">Portals & Hubs</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/contact" className="text-orange-400 font-bold hover:text-orange-300 transition-colors flex items-center gap-1">
                  <span>Contact Us & Inquiry Desk</span>
                  <span>→</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors font-medium">
                  Platform Admin Console
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors font-medium">
                  Razorpay Auto-Debit Flow
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors font-medium">
                  Pincode Routing Engine
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors font-medium">
                  Support & Ticket Desk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors font-medium">
                  Corporate Partnership RFP
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Mess & Campus PG Hub */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <GraduationCap className="w-4 h-4 text-orange-500" />
              <h4 className="text-xs font-black uppercase tracking-wider">Student & PG Mess Hub</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/passes" className="hover:text-orange-400 transition-colors font-medium">
                  Campus Meal Pass (₹84/meal)
                </Link>
              </li>
              <li>
                <Link href="/passes" className="hover:text-orange-400 transition-colors font-medium">
                  Hostel & PG Doorstep Delivery
                </Link>
              </li>
              <li>
                <Link href="/passes" className="hover:text-orange-400 transition-colors font-medium">
                  Kota, Delhi & Pune Centers
                </Link>
              </li>
              <li>
                <Link href="/consumer/subscriptions" className="hover:text-orange-400 transition-colors font-medium">
                  Skip / Pause Rollover Policy
                </Link>
              </li>
              <li>
                <Link href="/passes" className="hover:text-orange-400 transition-colors font-medium">
                  Exam Season Late Night Tiffins
                </Link>
              </li>
            </ul>
          </div>

          {/* Events & Party Catering */}
          <div>
            <div className="flex items-center gap-1.5 mb-3 text-white">
              <PartyPopper className="w-4 h-4 text-emerald-500" />
              <h4 className="text-xs font-black uppercase tracking-wider">Events & Catering</h4>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/events?type=birthday" className="hover:text-emerald-400 transition-colors font-medium">
                  Birthday Celebration Feast
                </Link>
              </li>
              <li>
                <Link href="/events?type=work-anniversary" className="hover:text-emerald-400 transition-colors font-medium">
                  Work Anniversary Luncheon
                </Link>
              </li>
              <li>
                <Link href="/events?type=office" className="hover:text-emerald-400 transition-colors font-medium">
                  Office & Team Lunch Boxes
                </Link>
              </li>
              <li>
                <Link href="/events?type=corporate" className="hover:text-emerald-400 transition-colors font-medium">
                  Corporate Gathering Buffets
                </Link>
              </li>
              <li>
                <Link href="/events?type=meeting" className="hover:text-emerald-400 font-semibold text-emerald-400/90 transition-colors">
                  Custom Event Catering →
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
