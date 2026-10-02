'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Provider,
  Address,
  Subscription,
  MealCollection,
  MenuItem,
  UserRole,
  AuthUser,
  OrderFulfillmentMode,
  LiveOrderTracking
} from '@/lib/types';
import { INITIAL_PROVIDERS, INITIAL_ADDRESSES, INITIAL_SUBSCRIPTIONS, MOCK_LIVE_ORDER } from '@/lib/mockData';
import { supabase } from '@/lib/supabase/client';

export interface CheckoutPlanSelection {
  provider: Provider;
  collection: MealCollection;
  planDuration: 'weekly' | 'monthly';
  mealType: 'lunch' | 'dinner' | 'both';
  fulfillmentMode: OrderFulfillmentMode;
  totalPrice: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: AuthUser | null;
  city: string;
  setCity: (city: string) => void;
  pincode: string;
  setPincode: (pincode: string) => void;
  fulfillmentMode: OrderFulfillmentMode;
  setFulfillmentMode: (mode: OrderFulfillmentMode) => void;
  addresses: Address[];
  addAddress: (addr: Omit<Address, 'id'>) => void;
  activeAddress: Address;
  setActiveAddressId: (id: string) => void;
  providers: Provider[];
  updateProviderMenu: (providerId: string, day: string, type: 'lunch' | 'dinner', menuData: Partial<MenuItem['lunch']>) => void;
  approveProvider: (providerId: string) => void;
  rejectProvider: (providerId: string) => void;
  subscriptions: Subscription[];
  activeSubscription: Subscription | null;
  checkoutPlan: CheckoutPlanSelection | null;
  setCheckoutPlan: (plan: CheckoutPlanSelection | null) => void;
  createSubscription: (paymentId: string) => string;
  skipNextMeal: (subId: string) => void;
  togglePauseSubscription: (subId: string) => void;
  cancelSubscription: (subId: string) => void;
  liveOrder: LiveOrderTracking;
  setLiveOrder: React.Dispatch<React.SetStateAction<LiveOrderTracking>>;
  // Auth methods
  signIn: (emailOrPhone: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, phone: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  sendOtp: (phone: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (emailOrPhone: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('consumer');
  const [user, setUser] = useState<AuthUser | null>({
    id: 'user-demo-1',
    fullName: 'Rohan Verma',
    phone: '9876543210',
    email: 'rohan.verma@example.com',
    role: 'consumer',
  });
  const [city, setCity] = useState<string>('Ahmedabad / Gandhinagar');
  const [pincode, setPincode] = useState<string>('382009'); // Infocity Gandhinagar
  const [fulfillmentMode, setFulfillmentMode] = useState<OrderFulfillmentMode>('delivery');
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [activeAddressId, setActiveAddressId] = useState<string>('addr-1');
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [checkoutPlan, setCheckoutPlan] = useState<CheckoutPlanSelection | null>(null);
  const [liveOrder, setLiveOrder] = useState<LiveOrderTracking>(MOCK_LIVE_ORDER);

  // Sync role with logged-in user
  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  // Try checking Auth session on mount via API and Supabase
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setUser(data.user);
            return;
          }
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            phone: session.user.phone || session.user.user_metadata?.phone,
            fullName: session.user.user_metadata?.full_name || 'My Chef User',
            role: (session.user.user_metadata?.role as UserRole) || 'consumer',
          });
        }
      } catch (err) {
        console.warn('Auth session check fallback:', err);
      }
    }
    checkSession();
  }, []);

  // Active address
  const activeAddress = addresses.find((a) => a.id === activeAddressId) || addresses[0];

  // Most recent active subscription
  const activeSubscription = subscriptions.find((s) => s.status === 'active' || s.status === 'paused') || null;

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => [newAddr, ...prev]);
    setActiveAddressId(newAddr.id);
  };

  const createSubscription = (paymentId: string): string => {
    if (!checkoutPlan) return '';
    const newSubId = `sub-${ Math.floor(1000 + Math.random() * 9000) }`;
    const totalDays = checkoutPlan.planDuration === 'weekly' ? 6 : 26;
    const mealsFactor = checkoutPlan.mealType === 'both' ? 2 : 1;

    const newSub: Subscription = {
      id: newSubId,
      providerId: checkoutPlan.provider.id,
      providerName: checkoutPlan.provider.name,
      collectionId: checkoutPlan.collection.id,
      collectionName: checkoutPlan.collection.name,
      planDuration: checkoutPlan.planDuration,
      mealType: checkoutPlan.mealType,
      fulfillmentMode: checkoutPlan.fulfillmentMode || fulfillmentMode,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + (checkoutPlan.planDuration === 'weekly' ? 7 : 30) * 86400000).toISOString().split('T')[0],
      totalMeals: totalDays * mealsFactor,
      deliveredMeals: 0,
      skippedMeals: 0,
      remainingMeals: totalDays * mealsFactor,
      status: 'active',
      deliveryAddress: activeAddress,
      amountPaid: checkoutPlan.totalPrice,
      paymentId: paymentId || `pay_RPZ_${ Date.now() }`,
      deliverySlot: checkoutPlan.mealType === 'dinner' ? checkoutPlan.provider.deliverySlots.dinner : checkoutPlan.provider.deliverySlots.lunch,
      dietType: checkoutPlan.collection.dietType,
    };

    setSubscriptions((prev) => [newSub, ...prev]);

    // Update live tracking order to match new subscription
    setLiveOrder({
      id: `ord-${Date.now().toString().slice(-4)}`,
      orderNumber: `MYCHEF-ORD-${Date.now().toString().slice(-4)}`,
      kitchenName: checkoutPlan.provider.name,
      kitchenAddress: checkoutPlan.provider.kitchenAddress,
      dishName: `${checkoutPlan.collection.name} • Fresh Meal Loop`,
      fulfillmentMode: checkoutPlan.fulfillmentMode || fulfillmentMode,
      currentStep: 2, // Prep started
      estimatedMinutes: 24,
      deliverySlot: checkoutPlan.mealType === 'dinner' ? checkoutPlan.provider.deliverySlots.dinner : checkoutPlan.provider.deliverySlots.lunch,
      deliveryOtp: `${Math.floor(1000 + Math.random() * 9000)}`,
      riderName: 'Vikram Solanki',
      riderPhone: '+91 98250 14892',
      riderVehicle: 'EV Green Fleet • GJ-01-MC-7890',
      destinationAddress: `${activeAddress.street}, ${activeAddress.city} (${activeAddress.pincode})`,
      parcelLockerCode: 'PARCEL-HUB-BOX-B4',
    });

    setCheckoutPlan(null);
    return newSubId;
  };

  const skipNextMeal = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id === subId && s.remainingMeals > 0) {
          return {
            ...s,
            skippedMeals: s.skippedMeals + 1,
            remainingMeals: s.remainingMeals - 1,
          };
        }
        return s;
      })
    );
  };

  const togglePauseSubscription = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id === subId) {
          return {
            ...s,
            status: s.status === 'active' ? 'paused' : 'active',
          };
        }
        return s;
      })
    );
  };

  const cancelSubscription = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id === subId) {
          return {
            ...s,
            status: 'cancelled',
          };
        }
        return s;
      })
    );
  };

  const updateProviderMenu = (
    providerId: string,
    day: string,
    type: 'lunch' | 'dinner',
    menuData: Partial<MenuItem['lunch']>
  ) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === providerId) {
          const updatedWeeklyMenu = p.weeklyMenu.map((m) => {
            if (m.day.toLowerCase() === day.toLowerCase()) {
              return {
                ...m,
                [type]: { ...m[type], ...menuData },
              };
            }
            return m;
          });
          return { ...p, weeklyMenu: updatedWeeklyMenu };
        }
        return p;
      })
    );
  };

  const approveProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, verified: true, status: 'active' } : p))
    );
  };

  const rejectProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, verified: false, status: 'suspended' } : p))
    );
  };

  // Auth methods
  const signIn = async (emailOrPhone: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password, role }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      return { success: false, error: message };
    }
  };

  const signUp = async (
    name: string,
    phone: string,
    email: string,
    password: string,
    userRole: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name,
            phone: phone,
            role: userRole,
          },
        },
      });

      if (error) {
        console.warn('Supabase signUp error fallback to local:', error.message);
      }

      const newUser: AuthUser = {
        id: data?.user?.id || `user-${ Date.now() }`,
        fullName: name,
        email: email,
        phone: phone,
        role: userRole,
      };
      setUser(newUser);
      setRole(userRole);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Sign up failed' };
    }
  };

  const sendOtp = async (phone: string): Promise<{ success: boolean; error?: string }> => {
    console.log(`Sending 6-digit OTP to +91 ${ phone }...`);
    return { success: true };
  };

  const verifyOtp = async (phone: string, otp: string): Promise<{ success: boolean; error?: string }> => {
    if (otp.length !== 6) {
      return { success: false, error: 'Please enter a valid 6-digit OTP' };
    }
    const newUser: AuthUser = {
      id: `user-otp-${ Date.now() }`,
      fullName: 'Verified Chef Foodie',
      phone: phone,
      email: `user.${ phone.slice(-4) }@mychef.in`,
      role: role || 'consumer',
    };
    setUser(newUser);
    return { success: true };
  };

  const resetPassword = async (emailOrPhone: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (emailOrPhone.includes('@')) {
        await supabase.auth.resetPasswordForEmail(emailOrPhone, {
          redirectTo: `${ window.location.origin }/auth/reset-password`,
        });
      }
      return { success: true };
    } catch (err) {
      return { success: true };
    }
  };

  const signOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    setUser(null);
    setRole('consumer');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        user,
        city,
        setCity,
        pincode,
        setPincode,
        fulfillmentMode,
        setFulfillmentMode,
        addresses,
        addAddress,
        activeAddress,
        setActiveAddressId,
        providers,
        updateProviderMenu,
        approveProvider,
        rejectProvider,
        subscriptions,
        activeSubscription,
        checkoutPlan,
        setCheckoutPlan,
        createSubscription,
        skipNextMeal,
        togglePauseSubscription,
        cancelSubscription,
        liveOrder,
        setLiveOrder,
        signIn,
        signUp,
        sendOtp,
        verifyOtp,
        resetPassword,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
