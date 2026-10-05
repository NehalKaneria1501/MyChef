'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  UtensilsCrossed, 
  Phone, 
  Mail, 
  Lock, 
  ArrowRight, 
  ChefHat,
  User,
  Shield,
  AlertCircle
} from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, sendOtp, setRole } = useApp();

  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const cleanedPhone = phone.trim();
    if (cleanedPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setLoading(true);
    try {
      const res = await sendOtp(cleanedPhone);
      if (res.success) {
        router.push(`/auth/verify-otp?phone=${cleanedPhone}`);
      } else {
        setErrorMsg(res.error || 'Failed to send OTP. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const cleanedEmail = email.trim();
    if (!cleanedEmail || !password) {
      setErrorMsg('Please fill in both email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await signIn(cleanedEmail, password);
      if (res.success) {
        router.push('/');
      } else {
        setErrorMsg(res.error || 'Invalid email or password');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Quick 1-click demo logins for easy testing
  const handleQuickDemo = async (roleType: 'consumer' | 'provider' | 'admin') => {
    setRole(roleType);
    if (roleType === 'consumer') {
      await signIn('rohan.verma@example.com', 'password123');
      router.push('/explore');
    } else if (roleType === 'provider') {
      await signIn('sunita.rasoi@mychef.in', 'password123');
      router.push('/provider/dashboard');
    } else {
      await signIn('admin@mychef.in', 'adminpass');
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Welcome to <span className="text-orange-600">My Chef</span>
          </h1>
          <p className="text-xs text-stone-500">
            Sign in to manage your daily homestyle tiffins & subscriptions
          </p>
        </div>

        {/* Auth Method Switcher (Phone OTP vs Email) */}
        <div className="flex bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
          <button
            type="button"
            onClick={() => { setAuthMethod('otp'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMethod === 'otp' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Phone OTP</span>
          </button>
          <button
            type="button"
            onClick={() => { setAuthMethod('password'); setErrorMsg(null); }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMethod === 'password' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Password</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200 flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Phone OTP Form */}
        {authMethod === 'otp' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Mobile Number
              </label>
              <div className="flex rounded-2xl border border-stone-300 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 overflow-hidden bg-white">
                <span className="inline-flex items-center px-3.5 bg-stone-50 text-xs font-bold text-stone-600 border-r border-stone-200">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full px-3.5 py-3 text-sm font-semibold focus:outline-hidden placeholder:text-stone-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-600/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Sending OTP...' : 'Get 6-Digit OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 2. Email & Password Form */}
        {authMethod === 'password' && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
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
                  className="w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-2xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-stone-700">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] font-bold text-orange-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-2xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-600/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Sign Up Link */}
        <div className="text-center text-xs text-stone-600 pt-2 border-t border-stone-100">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/auth/signup" className="font-extrabold text-orange-600 hover:underline">
            Register Here
          </Link>
        </div>

        {/* 1-Click Fast Demo Login Pill Selector */}
        <div className="pt-2">
          <p className="text-[10px] uppercase font-black tracking-wider text-stone-400 text-center mb-2.5">
            Quick 1-Click Sandbox Logins
          </p>
          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickDemo('consumer')}
              className="p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold border border-orange-200/80 flex flex-col items-center gap-1 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-orange-600" />
              <span>Consumer</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('provider')}
              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold border border-amber-200/80 flex flex-col items-center gap-1 transition-colors cursor-pointer"
            >
              <ChefHat className="w-4 h-4 text-amber-600" />
              <span>Kitchen</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold border border-blue-200/80 flex flex-col items-center gap-1 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Admin</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
