'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Truck, 
  PackageCheck, 
  Timer, 
  SunMedium, 
  Moon, 
  Coffee, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

export interface DeliverySlotInfo {
  id: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  title: string;
  timeWindow: string;
  cutoffTime: string;
  status: 'active' | 'filling_fast' | 'scheduled';
  statusLabel: string;
  tagline: string;
  iconType: 'coffee' | 'sun' | 'moon';
  transitMode: string;
}

export const DELIVERY_SLOTS: DeliverySlotInfo[] = [
  {
    id: 'slot-b1',
    category: 'breakfast',
    title: 'Breakfast & Campus Morning Pass',
    timeWindow: '08:00 AM - 09:30 AM',
    cutoffTime: 'Cutoff: 10:00 PM (Previous Night)',
    status: 'scheduled',
    statusLabel: 'Next Day Morning',
    tagline: 'Poha, Idli-Sambar, Thepla & Masala Chai',
    iconType: 'coffee',
    transitMode: 'Direct Campus / Hostel Gate',
  },
  {
    id: 'slot-l1',
    category: 'lunch',
    title: 'Early Lunch Loop',
    timeWindow: '11:30 AM - 12:30 PM',
    cutoffTime: 'Cutoff: 09:00 AM (Same Day)',
    status: 'active',
    statusLabel: 'Accepting Orders',
    tagline: 'Ideal for School Staff, Hospital shifts & Early Meetings',
    iconType: 'sun',
    transitMode: 'Insulated Thermal Box (EV Rider)',
  },
  {
    id: 'slot-l2',
    category: 'lunch',
    title: 'Executive Peak Lunch Loop',
    timeWindow: '12:30 PM - 01:45 PM',
    cutoffTime: 'Cutoff: 10:30 AM (Same Day)',
    status: 'filling_fast',
    statusLabel: 'Popular • 94% Booked',
    tagline: 'Steaming Rotis, Dal Makhani & Regional Thalis',
    iconType: 'sun',
    transitMode: 'Desk Delivery / Smart Locker Takeaway',
  },
  {
    id: 'slot-l3',
    category: 'lunch',
    title: 'Late Afternoon Lunch Loop',
    timeWindow: '02:00 PM - 03:00 PM',
    cutoffTime: 'Cutoff: 12:00 PM (Same Day)',
    status: 'active',
    statusLabel: 'Open for Booking',
    tagline: 'Flexible work-from-home & post-meeting meals',
    iconType: 'sun',
    transitMode: 'Express EV Transit',
  },
  {
    id: 'slot-d1',
    category: 'dinner',
    title: 'Prime Evening Dinner Loop',
    timeWindow: '07:00 PM - 08:15 PM',
    cutoffTime: 'Cutoff: 04:30 PM (Same Day)',
    status: 'active',
    statusLabel: 'Kitchen Cooking Soon',
    tagline: 'Fresh Khichdi-Kadhi, Paneer Bhurji & Chapatis',
    iconType: 'moon',
    transitMode: 'Home Doorstep Delivery',
  },
  {
    id: 'slot-d2',
    category: 'dinner',
    title: 'Night Owl Dinner Loop',
    timeWindow: '08:30 PM - 09:45 PM',
    cutoffTime: 'Cutoff: 06:00 PM (Same Day)',
    status: 'active',
    statusLabel: 'Open for Dinner Booking',
    tagline: 'Hot student mess thalis & late shift tech delivery',
    iconType: 'moon',
    transitMode: 'Contactless Smart Drop',
  },
];

interface DeliverySlotsWidgetProps {
  selectedSlotId?: string;
  onSelectSlot?: (slot: DeliverySlotInfo) => void;
  compact?: boolean;
}

export default function DeliverySlotsWidget({
  selectedSlotId,
  onSelectSlot,
  compact = false,
}: DeliverySlotsWidgetProps) {
  const [activeSlotId, setActiveSlotId] = useState<string>(selectedSlotId || 'slot-l2');
  const [filterCategory, setFilterCategory] = useState<'all' | 'lunch' | 'dinner' | 'breakfast'>('all');

  const filteredSlots = DELIVERY_SLOTS.filter(
    (slot) => filterCategory === 'all' || slot.category === filterCategory
  );

  const handleSlotClick = (slot: DeliverySlotInfo) => {
    setActiveSlotId(slot.id);
    if (onSelectSlot) {
      onSelectSlot(slot);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-stone-200 shadow-sm p-4 sm:p-6 space-y-4">
      {/* Header & Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-0.5">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>Guaranteed Dispatch Windows</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-stone-900">
            Daily Meal Delivery Slots
          </h3>
          <p className="text-xs text-stone-500">
            Meals cooked in small batches and dispatched in insulated hot-carriers with live EV tracking.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
              filterCategory === 'all' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Slots ({DELIVERY_SLOTS.length})
          </button>
          <button
            onClick={() => setFilterCategory('lunch')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              filterCategory === 'lunch' ? 'bg-orange-600 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <SunMedium className="w-3 h-3" />
            <span>Lunch</span>
          </button>
          <button
            onClick={() => setFilterCategory('dinner')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              filterCategory === 'dinner' ? 'bg-blue-600 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Moon className="w-3 h-3" />
            <span>Dinner</span>
          </button>
          <button
            onClick={() => setFilterCategory('breakfast')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              filterCategory === 'breakfast' ? 'bg-amber-600 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Coffee className="w-3 h-3" />
            <span>Breakfast</span>
          </button>
        </div>
      </div>

      {/* Grid of Slots */}
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-3`}>
        {filteredSlots.map((slot) => {
          const isSelected = activeSlotId === slot.id;

          const isFillingFast = slot.status === 'filling_fast';
          const isLunch = slot.category === 'lunch';
          const isDinner = slot.category === 'dinner';

          return (
            <div
              key={slot.id}
              onClick={() => handleSlotClick(slot)}
              className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'border-orange-500 bg-orange-50/50 shadow-md ring-2 ring-orange-400/40'
                  : 'border-stone-200 hover:border-orange-300 hover:bg-stone-50/80 bg-white'
              }`}
            >
              {/* Top Slot Metadata */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isFillingFast
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : isLunch
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : isDinner
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {slot.iconType === 'coffee' && <Coffee className="w-2.5 h-2.5" />}
                    {slot.iconType === 'sun' && <SunMedium className="w-2.5 h-2.5" />}
                    {slot.iconType === 'moon' && <Moon className="w-2.5 h-2.5" />}
                    <span>{slot.statusLabel}</span>
                  </span>

                  {isSelected && (
                    <span className="flex items-center gap-1 text-xs font-extrabold text-orange-600 bg-white px-1.5 py-0.5 rounded-md border border-orange-200 shadow-2xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                      <span>Selected</span>
                    </span>
                  )}
                </div>

                <div className="pt-0.5">
                  <div className="text-base font-black text-stone-900 tracking-tight">
                    {slot.timeWindow}
                  </div>
                  <div className="text-xs font-bold text-stone-700">
                    {slot.title}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-snug line-clamp-1 pt-0.5">
                    {slot.tagline}
                  </p>
                </div>
              </div>

              {/* Bottom Cutoff Info */}
              <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] flex items-center justify-between text-stone-400">
                <span className="font-semibold text-stone-600">{slot.cutoffTime}</span>
                <span className="font-medium text-orange-600 flex items-center gap-0.5">
                  <Truck className="w-2.5 h-2.5" />
                  <span>EV Express</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Dispatch Assurance Bar */}
      <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>On-Time Guarantee:</strong> If rider is late by &gt;15 mins, your meal is 100% free with credit refund.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-bold text-stone-500">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>Zero Spill Seal</span>
          </span>
          <span className="flex items-center gap-1">
            <PackageCheck className="w-3 h-3 text-blue-500" />
            <span>Pre-insulated Dabbas</span>
          </span>
        </div>
      </div>
    </div>
  );
}
