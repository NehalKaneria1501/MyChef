/**
 * Google Analytics 4 (GA4), GTM & Firebase Analytics Integration for MyChef
 * Supports full GA4 E-commerce schemas, custom parameters, and GTM dataLayer
 */

import { getFirebaseApp } from './firebase/ai';
import { Analytics, getAnalytics, isSupported, logEvent, setUserId, setUserProperties } from 'firebase/analytics';

// Extend window object for GTM dataLayer and gtag
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let analyticsInstance: Analytics | null = null;
let isInitAttempted = false;

/**
 * Initializes Firebase Analytics safely on the client side
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (analyticsInstance) return analyticsInstance;
  if (isInitAttempted) return analyticsInstance;

  isInitAttempted = true;

  try {
    const supported = await isSupported();
    if (supported) {
      const app = getFirebaseApp();
      analyticsInstance = getAnalytics(app);
      return analyticsInstance;
    }
  } catch (err) {
    console.debug('Firebase Analytics is not supported or measurement ID not set:', err);
  }

  return null;
}

export interface EcommerceItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  item_brand?: string;
  price: number;
  quantity?: number;
  item_color?: string; // custom item-scoped parameter
  dietary?: string;
  cuisine?: string;
}

/**
 * Base dispatcher pushing to both Firebase Analytics and GTM dataLayer
 */
export async function logAnalyticsEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // 1. Dispatch to Google Tag Manager (GTM) dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });

  // 2. Dispatch to Firebase Analytics
  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch (err) {
    console.debug(`Analytics logEvent error for ${eventName}:`, err);
  }
}

/**
 * Set GA4 User ID
 */
export async function setAnalyticsUserId(userId: string) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ user_id: userId });

  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      setUserId(analytics, userId);
    }
  } catch (err) {
    console.debug('Error setting user ID:', err);
  }
}

/**
 * Set GA4 User Properties
 */
export async function setAnalyticsUserProperties(properties: Record<string, any>) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ user_properties: properties });

  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      setUserProperties(analytics, properties);
    }
  } catch (err) {
    console.debug('Error setting user properties:', err);
  }
}

/* =========================================================================
   GA4 E-COMMERCE SPECIFICATION IMPLEMENTATIONS
   ========================================================================= */

/**
 * 1. view_item_list
 */
export function trackViewItemList(items: EcommerceItem[], listId = 'L001', listName = 'Meal Plans & Tiffins') {
  return logAnalyticsEvent('view_item_list', {
    item_list_id: listId,
    item_list_name: listName,
    items,
  });
}

/**
 * 2. select_item
 */
export function trackSelectItem(item: EcommerceItem, listId = 'L001', listName = 'Meal Plans & Tiffins') {
  return logAnalyticsEvent('select_item', {
    item_list_id: listId,
    item_list_name: listName,
    items: [item],
  });
}

/**
 * 3. view_item
 */
export function trackViewItem(item: EcommerceItem, currency = 'INR') {
  return logAnalyticsEvent('view_item', {
    currency,
    value: item.price,
    items: [item],
  });
}

/**
 * 4. add_to_cart
 */
export function trackAddToCart(item: EcommerceItem, quantity = 1, currency = 'INR') {
  const itemWithQty = { ...item, quantity };
  return logAnalyticsEvent('add_to_cart', {
    currency,
    value: item.price * quantity,
    items: [itemWithQty],
  });
}

/**
 * 5. add_to_wishlist
 */
export function trackAddToWishlist(item: EcommerceItem, currency = 'INR') {
  return logAnalyticsEvent('add_to_wishlist', {
    currency,
    value: item.price,
    items: [item],
  });
}

/**
 * 6. view_cart
 */
export function trackViewCart(items: EcommerceItem[], value: number, currency = 'INR') {
  return logAnalyticsEvent('view_cart', {
    currency,
    value,
    items,
  });
}

/**
 * 7. remove_from_cart
 */
export function trackRemoveFromCart(item: EcommerceItem, currency = 'INR') {
  return logAnalyticsEvent('remove_from_cart', {
    currency,
    value: item.price * (item.quantity || 1),
    items: [item],
  });
}

/**
 * 8. begin_checkout
 */
export function trackBeginCheckout(items: EcommerceItem[], value: number, coupon?: string, currency = 'INR') {
  return logAnalyticsEvent('begin_checkout', {
    currency,
    value,
    coupon: coupon || '',
    items,
  });
}

/**
 * 9. add_shipping_info
 */
export function trackAddShippingInfo(items: EcommerceItem[], value: number, shippingTier = 'Direct Hot Delivery', coupon?: string, currency = 'INR') {
  return logAnalyticsEvent('add_shipping_info', {
    currency,
    value,
    coupon: coupon || '',
    shipping_tier: shippingTier,
    items,
  });
}

/**
 * 10. add_payment_info
 */
export function trackAddPaymentInfo(items: EcommerceItem[], value: number, paymentType = 'Razorpay', coupon?: string, currency = 'INR') {
  return logAnalyticsEvent('add_payment_info', {
    currency,
    value,
    coupon: coupon || '',
    payment_type: paymentType,
    items,
  });
}

/**
 * 11. purchase
 */
export function trackPurchase(params: {
  transaction_id: string;
  affiliation?: string;
  currency?: string;
  value: number;
  tax?: number;
  shipping?: number;
  coupon?: string;
  items: EcommerceItem[];
}) {
  return logAnalyticsEvent('purchase', {
    affiliation: params.affiliation || 'MyChef Kitchen Platform',
    currency: params.currency || 'INR',
    tax: params.tax || 0,
    shipping: params.shipping || 0,
    coupon: params.coupon || '',
    ...params,
  });
}

/**
 * 12. refund
 */
export function trackRefund(params: {
  transaction_id: string;
  affiliation?: string;
  currency?: string;
  value?: number;
  items?: { item_id: string; quantity: number }[];
}) {
  return logAnalyticsEvent('refund', {
    currency: params.currency || 'INR',
    affiliation: params.affiliation || 'MyChef Kitchen Platform',
    items: params.items || [],
    ...params,
  });
}

/**
 * 13. view_promotion & select_promotion
 */
export function trackPromotion(
  type: 'view_promotion' | 'select_promotion',
  params: {
    promotion_id: string;
    promotion_name: string;
    creative_name?: string;
    creative_slot?: string;
    location_id?: string;
    items?: EcommerceItem[];
  }
) {
  return logAnalyticsEvent(type, {
    creative_name: params.creative_name || 'hero_banner.webp',
    creative_slot: params.creative_slot || 'featured_home_banner',
    location_id: params.location_id || 'HOMEPAGE_HERO',
    ...params,
  });
}
