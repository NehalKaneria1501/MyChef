import { supabase } from './supabase/client';
import { Provider, Subscription, Address } from './types';
import { INITIAL_PROVIDERS, INITIAL_SUBSCRIPTIONS } from './mockData';

export async function fetchProvidersFromSupabase(): Promise<Provider[]> {
  try {
    const { data: providersData, error: provError } = await supabase
      .from('provider_profiles')
      .select(`
        *,
        meal_collections (*),
        provider_weekly_menus (*)
      `)
      .eq('is_approved_by_admin', true);

    if (provError || !providersData || providersData.length === 0) {
      console.warn('Falling back to local providers data:', provError?.message);
      return INITIAL_PROVIDERS;
    }

    // Map Supabase rows to Provider objects
    return providersData.map((row: any) => ({
      id: row.id,
      name: row.kitchen_name,
      tagline: `${row.cuisine_types?.join(', ')} Homestyle Kitchen`,
      ownerName: row.owner_name,
      rating: Number(row.rating) || 4.8,
      starTier: row.star_tier || '5_star',
      kitchenCategory: row.kitchen_category || 'home_chef',
      city: row.city || 'Ahmedabad / Gandhinagar',
      takeawayAvailable: row.takeaway_available ?? true,
      hasDineIn: row.has_dine_in ?? false,
      hasParcelPoint: row.has_parcel_point ?? true,
      reviewCount: row.total_reviews || 100,
      fssaiNumber: row.fssai_license_number,
      verified: row.fssai_verified,
      status: 'active',
      cuisine: row.cuisine_types || ['Homestyle'],
      dietary: row.dietary_types || ['pure-veg'],
      servicePincodes: row.service_pincodes || ['560103', '380015', '382009'],
      kitchenAddress: row.kitchen_address,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      coverImage: row.cover_image_url || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      subscriberCount: 88,
      startingPriceMonthly: row.meal_collections?.[0]?.monthly_price_inr || 2999,
      deliverySlots: {
        lunch: row.lunch_delivery_slot || '12:15 PM - 1:30 PM',
        dinner: row.dinner_delivery_slot || '7:45 PM - 9:00 PM',
      },
      mealCollections: row.meal_collections?.map((c: any) => ({
        id: c.id,
        name: c.title,
        tagline: c.tagline || '',
        description: c.description || '',
        dietType: c.diet_type,
        caloriesAvg: c.average_calories,
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
        weeklyPrice: c.weekly_price_inr,
        monthlyPrice: c.monthly_price_inr,
        itemsIncluded: c.items_included || [],
      })) || [],
      weeklyMenu: INITIAL_PROVIDERS[0].weeklyMenu, // defaults to rich weekly rotation
    }));
  } catch (err) {
    console.warn('Supabase fetch failed, returning initial providers:', err);
    return INITIAL_PROVIDERS;
  }
}

export async function insertSubscriptionToSupabase(sub: Partial<Subscription>) {
  try {
    const { data, error } = await supabase.from('subscriptions').insert([
      {
        plan_duration: sub.planDuration,
        meal_type: sub.mealType,
        start_date: sub.startDate,
        end_date: sub.endDate,
        total_meals: sub.totalMeals,
        remaining_meals: sub.remainingMeals,
        status: sub.status,
        amount_paid_inr: sub.amountPaid,
        razorpay_payment_id: sub.paymentId,
      }
    ]).select();

    if (error) {
      console.warn('Supabase subscription insert error:', error.message);
    }
    return data;
  } catch (err) {
    console.warn('Failed to insert subscription to Supabase:', err);
  }
}
