'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  UtensilsCrossed, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  ChefHat, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '@/lib/types';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useApp();

  const [roleSelection, setRoleSelection] = useState<UserRole>('consumer');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanedName = fullName.trim();
    const cleanedPhone = phone.trim();
    const cleanedEmail = email.trim();

    if (!cleanedName) {
      setErrorMsg(roleSelection === 'provider' ? 'Please enter your kitchen or brand name' : 'Please enter your full name');
      return;
    }
    if (cleanedPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const res = await signUp(cleanedName, cleanedPhone, cleanedEmail, password, roleSelection);
      if (res.success) {
        router.push(`/auth/verify-otp?phone=${cleanedPhone}`);
      } else {
        setErrorMsg(res.error || 'Failed to create account. Please try again.');
      }
    } catch {
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <Link href="/" className="inline-flex items-center gap-2 group mb-1">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-600/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-stone-500">
            Join My Chef for daily homestyle food or kitchen partnership
          </p>
        </div>

        {/* Role Selector: Customer vs Kitchen Partner */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
            I am registering as:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRoleSelection('consumer')}
              className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                roleSelection === 'consumer'
                  ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold ring-2 ring-orange-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <User className="w-4 h-4 text-orange-600 shrink-0" />
              <div>
                <span className="text-xs block font-extrabold">Food Consumer</span>
                <span className="text-[10px] text-stone-400">Subscribe & eat</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRoleSelection('provider')}
              className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                roleSelection === 'provider'
                  ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold ring-2 ring-orange-500/20'
                  : 'border-stone-200 hover:border-stone-300 text-stone-700'
              }`}
            >
              <ChefHat className="w-4 h-4 text-orange-600 shrink-0" />
              <div>
                <span className="text-xs block font-extrabold">Kitchen Partner</span>
                <span className="text-[10px] text-stone-400">Cook & earn</span>
              </div>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              {roleSelection === 'provider' ? 'Kitchen / Brand Name' : 'Full Name'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={roleSelection === 'provider' ? 'e.g. Annapurna Rasoi' : 'e.g. Rohan Verma'}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Mobile Number (For Daily Delivery OTPs)
            </label>
            <div className="flex rounded-xl border border-stone-300 focus-within:ring-2 focus-within:ring-orange-500 overflow-hidden bg-white">
              <span className="inline-flex items-center px-3 bg-stone-50 text-xs font-bold text-stone-600 border-r border-stone-200">
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit number"
                className="w-full px-3 py-2.5 font-semibold focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-semibold"
              />
            </div>
          </div>

          <div className="text-[11px] text-stone-500 leading-relaxed pt-1">
            By registering, you agree to My Chef&apos;s <span className="underline">Terms of Service</span> and <span className="underline">Food Hygiene Standards</span>.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-600/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{loading ? 'Creating Account...' : 'Continue to Phone Verification'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="text-center text-xs text-stone-600 pt-2 border-t border-stone-100">
          <span>Already have an account? </span>
          <Link href="/auth/signin" className="font-extrabold text-orange-600 hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
}
