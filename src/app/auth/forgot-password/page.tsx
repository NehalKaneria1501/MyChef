'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function ForgotPasswordPage() {
  const { resetPassword } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await resetPassword(identifier.trim());
      if (res?.success) {
        setSentSuccess(true);
      } else {
        setErrorMessage(res?.error || 'Failed to dispatch recovery link. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please verify your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#faf8f5]">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl text-center">
        
        <Link href="/auth/signin" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>

        <div className="space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Forgot Password
          </h1>
          <p className="text-xs text-stone-500">
            Enter your registered email address or mobile number to receive a secure recovery code.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 text-left animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {sentSuccess ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <div>
              <h3 className="text-sm font-bold text-emerald-950">Password Reset Link Dispatched!</h3>
              <p className="text-xs text-emerald-700 mt-1">
                We sent instructions to <span className="font-semibold text-emerald-950">{identifier}</span>. Check your inbox or SMS.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/auth/signin"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
              >
                Return to Sign In
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSentSuccess(false);
                  setIdentifier('');
                }}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Try another email or phone</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Registered Email or Mobile
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. rohan.verma@example.com or 9876543210"
                  className="w-full pl-10 pr-3.5 py-3 text-xs font-semibold rounded-2xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-600/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Sending Instructions...' : 'Send Recovery Link / OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
          <span>Remembered your password? </span>
          <Link href="/auth/signin" className="font-extrabold text-orange-600 hover:underline">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
