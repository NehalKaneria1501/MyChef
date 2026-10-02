-- ============================================================================
-- TIFFINLOOPS SUPABASE SEED DATA
-- Run this in Supabase SQL Editor after running schema.sql
-- Project: https://supabase.com/dashboard/project/sgodbwturkplzxzrqycp/sql/new
-- ============================================================================

-- 1. Insert Initial Providers
INSERT INTO public.provider_profiles (
    id, kitchen_name, owner_name, fssai_license_number, fssai_verified, 
    is_approved_by_admin, kitchen_address, service_pincodes, cuisine_types, 
    dietary_types, rating, total_reviews, cover_image_url, lunch_delivery_slot, dinner_delivery_slot
) VALUES 
(
    '00000000-0000-0000-0000-000000000001',
    'Maa Ki Rasoi (North Indian Homestyle)',
    'Mrs. Sunita Sharma',
    '21223194000412',
    true,
    true,
    'Sector 2, HSR Layout, Bengaluru',
    ARRAY['560103', '560034', '560102', '560068'],
    ARRAY['North Indian', 'Punjabi', 'Homestyle'],
    ARRAY['pure-veg'::diet_type_enum],
    4.8,
    342,
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    '12:15 PM - 1:30 PM',
    '7:45 PM - 9:00 PM'
),
(
    '00000000-0000-0000-0000-000000000002',
    'Satvik Jain Bhojanalaya',
    'Mr. Arvind Jain',
    '21222187000109',
    true,
    true,
    '5th Block, Koramangala, Bengaluru',
    ARRAY['560103', '560034', '560095'],
    ARRAY['Jain', 'Rajasthani', 'Gujarati'],
    ARRAY['jain'::diet_type_enum, 'pure-veg'::diet_type_enum],
    4.9,
    210,
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    '11:45 AM - 1:00 PM',
    '6:45 PM - 8:15 PM'
),
(
    '00000000-0000-0000-0000-000000000003',
    'Dakshin Ruchulu (South Indian Meals)',
    'Mrs. Padmavathi R.',
    '21221145000981',
    true,
    true,
    'Green Glen Layout, Bellandur, Bengaluru',
    ARRAY['560103', '560034', '560068'],
    ARRAY['South Indian', 'Andhra', 'Tamilian'],
    ARRAY['pure-veg'::diet_type_enum, 'non-veg'::diet_type_enum],
    4.7,
    189,
    'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    '12:00 PM - 1:15 PM',
    '7:30 PM - 8:45 PM'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Meal Collections
INSERT INTO public.meal_collections (
    id, provider_id, title, tagline, description, diet_type, 
    average_calories, weekly_price_inr, monthly_price_inr, items_included, is_active
) VALUES 
(
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Ghar Ki Thali (Standard)',
    'Perfect balance of fiber, lentils & rotis',
    '4 Fresh Phulkas with ghee, Dal Tadka, Seasonal Sabzi, Jeera Rice, Curd & Salad.',
    'pure-veg',
    580,
    899,
    3199,
    ARRAY['4 Phulkas (Desi Ghee)', 'Yellow Dal Tadka', 'Aloo Gobi / Bhindi', 'Steamed Rice', 'Homestyle Dahi', 'Salad'],
    true
),
(
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Shahi Royal Thali (Deluxe)',
    'Paneer sabzi everyday + Sweet treat',
    '4 Butter Phulkas, Paneer preparation, Dal Makhani / Panchmel Dal, Pulao, Gulab Jamun & Raita.',
    'pure-veg',
    720,
    1199,
    4299,
    ARRAY['4 Butter Phulkas', 'Paneer Butter Masala', 'Dal Makhani', 'Peas Pulao', 'Boondi Raita', 'Sweet / Gulab Jamun'],
    true
),
(
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    'Satvik Jain Thali',
    'No Onion, No Garlic, Root vegetable-free',
    '4 Soft Phulkas, Jain Paneer / Gatta Curry, Gujarati Dal, Steamed Rice, Dahi & Crisp Papad.',
    'jain',
    550,
    949,
    3499,
    ARRAY['4 Fresh Phulkas', 'Jain Gatta Curry / Paneer', 'Gujarati Sweet-Sour Dal', 'Jeera Basmati Rice', 'Curd', 'Papad'],
    true
)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Weekly Rotating Menus for Maa Ki Rasoi
INSERT INTO public.provider_weekly_menus (
    provider_id, day_of_week, meal_slot, curry_name, dal_name, bread_name, rice_name, sides_accompaniments
) VALUES
('00000000-0000-0000-0000-000000000001', 'Monday', 'lunch', 'Paneer Bhurji Gravy', 'Moong Dal Fry', '4 Phulkas', 'Jeera Rice', 'Papad & Salad'),
('00000000-0000-0000-0000-000000000001', 'Monday', 'dinner', 'Aloo Methi', 'Arhar Dal Tadka', '4 Phulkas', 'Steamed Rice', 'Dahi'),
('00000000-0000-0000-0000-000000000001', 'Tuesday', 'lunch', 'Mix Veg Korma', 'Chana Dal', '4 Phulkas', 'Matar Rice', 'Boondi Raita'),
('00000000-0000-0000-0000-000000000001', 'Tuesday', 'dinner', 'Palak Kofta', 'Masoor Dal', '4 Phulkas', 'Steamed Rice', 'Pickle & Salad'),
('00000000-0000-0000-0000-000000000001', 'Wednesday', 'lunch', 'Rajma Masala (Homestyle)', 'Dal Tadka', '4 Phulkas', 'Basmati Rice', 'Sirka Onion Salad'),
('00000000-0000-0000-0000-000000000001', 'Wednesday', 'dinner', 'Dum Aloo', 'Yellow Dal', '4 Phulkas', 'Steamed Rice', 'Mint Chutney'),
('00000000-0000-0000-0000-000000000001', 'Thursday', 'lunch', 'Kadhai Paneer', 'Panchmel Dal', '4 Phulkas', 'Jeera Rice', 'Cucumber Raita'),
('00000000-0000-0000-0000-000000000001', 'Thursday', 'dinner', 'Bhindi Masala', 'Moong Dal', '4 Phulkas', 'Steamed Rice', 'Fryums'),
('00000000-0000-0000-0000-000000000001', 'Friday', 'lunch', 'Amritsari Chole', 'Dal Fry', '4 Phulkas', 'Pulao Rice', 'Carrot Halwa / Sweet'),
('00000000-0000-0000-0000-000000000001', 'Friday', 'dinner', 'Kashmiri Baingan', 'Toor Dal', '4 Phulkas', 'Steamed Rice', 'Dahi'),
('00000000-0000-0000-0000-000000000001', 'Saturday', 'lunch', 'Matar Paneer', 'Dal Makhani', '4 Phulkas', 'Jeera Rice', 'Gulab Jamun'),
('00000000-0000-0000-0000-000000000001', 'Saturday', 'dinner', 'Lauki Kofta Curry', 'Yellow Dal', '4 Phulkas', 'Steamed Rice', 'Salad'),
('00000000-0000-0000-0000-000000000001', 'Sunday', 'lunch', 'Special Shahi Paneer Feast', 'Dal Tadka', '4 Butter Phulkas', 'Veg Biryani', 'Kheer'),
('00000000-0000-0000-0000-000000000001', 'Sunday', 'dinner', 'Sev Tamatar Ki Sabzi', 'Kadhi Rice', '3 Phulkas', 'Khichdi', 'Papad')
ON CONFLICT (provider_id, day_of_week, meal_slot) DO NOTHING;
