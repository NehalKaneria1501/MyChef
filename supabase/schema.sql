-- ============================================================================
-- MY CHEF MVP DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- Core Tables: Users, Roles, Customer Profiles, Provider Profiles,
-- Addresses, Meal Collections, Subscription Plans, Subscriptions,
-- Daily Orders, Payments, Support Tickets, Notifications.
-- Includes Row Level Security (RLS) & Performance Indexes.
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER ROLES ENUM
CREATE TYPE user_role_enum AS ENUM ('customer', 'provider', 'admin');
CREATE TYPE subscription_status_enum AS ENUM ('active', 'paused', 'cancelled', 'completed');
CREATE TYPE meal_type_enum AS ENUM ('lunch', 'dinner', 'both');
CREATE TYPE diet_type_enum AS ENUM ('pure-veg', 'non-veg', 'jain', 'eggetarian');
CREATE TYPE order_status_enum AS ENUM ('placed', 'prep_started', 'packed', 'dispatched', 'delivered', 'skipped');

-- 3. USERS TABLE (Linked to auth.users if Supabase Auth is enabled)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE,
    phone VARCHAR(15) UNIQUE NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'customer',
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    label VARCHAR(50) DEFAULT 'Home', -- Home, Work, Other
    street_address TEXT NOT NULL,
    apartment_floor TEXT,
    landmark TEXT,
    city VARCHAR(100) DEFAULT 'Bengaluru',
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PROVIDER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.provider_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    kitchen_name TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    fssai_license_number VARCHAR(30) UNIQUE NOT NULL,
    fssai_verified BOOLEAN DEFAULT FALSE,
    is_approved_by_admin BOOLEAN DEFAULT FALSE,
    kitchen_address TEXT NOT NULL,
    service_pincodes TEXT[] NOT NULL DEFAULT '{}',
    cuisine_types TEXT[] NOT NULL DEFAULT '{}',
    dietary_types diet_type_enum[] NOT NULL DEFAULT '{}',
    rating NUMERIC(3, 2) DEFAULT 5.00,
    total_reviews INT DEFAULT 0,
    cover_image_url TEXT,
    lunch_delivery_slot VARCHAR(50) DEFAULT '12:15 PM - 1:30 PM',
    dinner_delivery_slot VARCHAR(50) DEFAULT '7:45 PM - 9:00 PM',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. MEAL COLLECTIONS (Thalis, Bowls, Diet Combos)
CREATE TABLE IF NOT EXISTS public.meal_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    diet_type diet_type_enum NOT NULL DEFAULT 'pure-veg',
    average_calories INT DEFAULT 550,
    weekly_price_inr INT NOT NULL, -- e.g. 899 (6 days)
    monthly_price_inr INT NOT NULL, -- e.g. 3199 (26 days)
    items_included TEXT[] NOT NULL DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ROTATING WEEKLY MENUS (7 Days Schedule)
CREATE TABLE IF NOT EXISTS public.provider_weekly_menus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE CASCADE,
    day_of_week VARCHAR(15) NOT NULL, -- Monday, Tuesday, etc.
    meal_slot VARCHAR(15) NOT NULL, -- lunch, dinner
    curry_name TEXT NOT NULL,
    dal_name TEXT NOT NULL,
    bread_name TEXT NOT NULL,
    rice_name TEXT NOT NULL,
    sides_accompaniments TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (provider_id, day_of_week, meal_slot)
);

-- 8. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.provider_profiles(id) ON DELETE RESTRICT,
    collection_id UUID REFERENCES public.meal_collections(id) ON DELETE RESTRICT,
    address_id UUID REFERENCES public.addresses(id) ON DELETE RESTRICT,
    plan_duration VARCHAR(20) NOT NULL, -- 'weekly' or 'monthly'
    meal_type meal_type_enum NOT NULL DEFAULT 'lunch',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_meals INT NOT NULL,
    delivered_meals INT DEFAULT 0,
    skipped_meals INT DEFAULT 0,
    remaining_meals INT NOT NULL,
    status subscription_status_enum NOT NULL DEFAULT 'active',
    amount_paid_inr INT NOT NULL,
    razorpay_payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. DAILY ORDERS (Generated automatically for each subscription day)
CREATE TABLE IF NOT EXISTS public.daily_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES public.provider_profiles(id),
    customer_id UUID REFERENCES public.users(id),
    order_date DATE NOT NULL,
    meal_slot VARCHAR(15) NOT NULL,
    status order_status_enum NOT NULL DEFAULT 'placed',
    delivery_address TEXT NOT NULL,
    delivery_pincode VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. PAYMENTS AUDIT LOG
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.users(id),
    provider_id UUID REFERENCES public.provider_profiles(id),
    amount_inr INT NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'razorpay',
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT UNIQUE,
    status VARCHAR(30) DEFAULT 'captured',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    subscription_id UUID REFERENCES public.subscriptions(id),
    category VARCHAR(50) NOT NULL, -- e.g. 'delivery_delay', 'food_quality', 'billing', 'cancellation'
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open', -- 'open', 'resolved', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- INDEXES FOR HIGH-PERFORMANCE PINCODE & SUBSCRIPTION FILTERING
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_provider_service_pincodes ON public.provider_profiles USING GIN(service_pincodes);
CREATE INDEX IF NOT EXISTS idx_addresses_pincode ON public.addresses(pincode);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON public.subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_daily_orders_date ON public.daily_orders(order_date, meal_slot, status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Public read access for active providers & meal collections
CREATE POLICY "Public read active providers" ON public.provider_profiles FOR SELECT USING (is_approved_by_admin = true);
CREATE POLICY "Public read meal collections" ON public.meal_collections FOR SELECT USING (is_active = true);
