'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  ArrowRight, 
  RotateCw, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get('phone') || '9876543210';
  const { verifyOtp, sendOtp } = useApp();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanValue ? cleanValue.slice(-1) : '';
    setOtp(newOtp);

    // Auto advance to next box
    if (cleanValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const targetIdx = Math.min(pasted.length, 5);
    inputRefs.current[targetIdx]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP');
      return;
    }
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await verifyOtp(phone, fullOtp);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 1200);
      } else {
        setErrorMsg(res.error || 'Invalid OTP. Please verify and try again.');
      }
    } catch {
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    setResending(true);
    setErrorMsg(null);
    setResendSuccess(false);

    try {
      await sendOtp(phone);
      setCountdown(30);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 4000);
    } catch {
      setErrorMsg('Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#faf8f5]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-xl text-center">
        
        <Link href="/auth/signin" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-orange-600 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Login</span>
        </Link>

        {/* Title & Phone */}
        <div className="space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            Verify Phone Number
          </h1>
          <p className="text-xs text-stone-500">
            We sent a 6-digit verification code to <br />
            <span className="font-extrabold text-stone-900 font-mono text-sm">+91 {phone}</span>
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200 flex items-center gap-2 text-left animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {resendSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-2xl border border-emerald-200 flex items-center gap-2 text-left animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>A fresh 6-digit OTP has been sent via SMS.</span>
          </div>
        )}

        {success ? (
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1 animate-in fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-emerald-900 text-xs">Phone Verified!</h4>
            <p className="text-[11px] text-emerald-700">Redirecting to your fresh homestyle kitchen...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 6 Digit Input Boxes */}
            <div className="flex justify-center gap-2 sm:gap-2.5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onPaste={handlePaste}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-13 text-center text-xl font-black rounded-2xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-stone-50 focus:bg-white transition-all shadow-2xs"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-600/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Verifying OTP...' : 'Verify & Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Resend Countdown */}
        <div className="text-xs text-stone-500 pt-2 border-t border-stone-100">
          {countdown > 0 ? (
            <span>Resend OTP in <span className="font-bold font-mono text-orange-600">{countdown}s</span></span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1 mx-auto cursor-pointer transition-colors disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
              <span>{resending ? 'Sending...' : 'Resend Code via SMS'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-stone-500">Loading verification...</div>}>
      <OtpVerificationForm />
    </Suspense>
  );
}
