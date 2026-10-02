import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai';
import { firebaseConfig, FIREBASE_PROJECT_ID, FIREBASE_AI_CONSOLE_URL } from './config';

// Global singleton Firebase App
let appInstance: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!appInstance) {
    if (getApps().length === 0) {
      appInstance = initializeApp(firebaseConfig);
    } else {
      appInstance = getApp();
    }
  }
  return appInstance;
}

const MYCHEF_SYSTEM_INSTRUCTION = `
You are Chef Genie, the warm, polite, and hyper-helpful AI Food Concierge and Meal Planner for MyChef (Project: ${FIREBASE_PROJECT_ID}).
MyChef is India's leading authentic homestyle food network connecting verified home chefs with students, PG residents, and working professionals.

Key Knowledge Base:
1. Student PG Mess Pass:
   - Budget meal passes starting at only ₹84 per meal.
   - Monthly Pass: ₹2,199 (26 days of lunch/dinner).
   - Inclusions: 4 Desi Ghee Phulkas, daily changing sabzi, dal tadka, jeera rice & fresh salad.
   - Student Hubs: Kota, Vallabh Vidyanagar, Roorkee, Pune, Kothrud, Bengaluru, Noida, Indore, Hyderabad, etc.
   - Includes up to 8 meal skips/month with 100% validity rollover.

2. Pure Veg & Jain Specialty:
   - 100% Pure Veg and Jain friendly kitchens (Annapurna Kitchen, Maa Ki Rasoi, etc.).
   - Prepared with zero onion, zero garlic, cold-pressed groundnut oil, zero palm oil, zero artificial food coloring.
   - FSSAI Grade A+ hygiene certified home kitchens.

3. 100% Skip & Pause Rollover Policy:
   - Lunch skip cutoff: 8:00 AM on the day of delivery.
   - Dinner skip cutoff: 4:00 PM on the day of delivery.
   - Never lose money: skipped meals automatically push forward your subscription expiry date.
   - Vacation pause: pause anytime up to 30 days.

4. Daily Dispatch & Live Tracking:
   - Lunch Window: 12:15 PM - 1:30 PM.
   - Dinner Window: 7:30 PM - 9:00 PM.
   - Live GPS tracking with temperature-controlled hot boxes available on /track.

5. Key App Links:
   - Explore All Kitchens: /explore
   - Student & Monthly Meal Passes: /passes
   - Live Order Tracking: /track
   - Subscriptions & Skips: /consumer/subscriptions
   - Kitchen Partner Portal: /provider/dashboard
   - Admin Command Center: /admin

Tone & Style:
- Warm, polite Indian hospitality (use Namaste 🙏 when welcoming).
- Clear, bulleted, appetizing food descriptions.
- Bold key phrases for easy mobile reading.
- Suggest 2-3 relevant quick follow-up questions or actions.
`;

export interface ChatReply {
  reply: string;
  source: 'firebase-ai-logic' | 'domain-engine';
  suggestions: string[];
  actions: { label: string; url: string }[];
  projectId: string;
}

/**
 * Generate AI advice using Firebase AI Logic (Gemini API)
 * with graceful fallback to MyChef Domain Engine
 */
export async function generateFirebaseChatResponse(
  message: string,
  history: Array<{ role: string; content: string }> = []
): Promise<ChatReply> {
  // Check if Firebase API Key is configured
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig.apiKey;
  const isKeyConfigured = Boolean(apiKey && !apiKey.includes('Dummy') && apiKey.length > 10);

  if (isKeyConfigured) {
    try {
      const app = getFirebaseApp();
      const ai = getAI(app, { backend: new GoogleAIBackend() });

      // Use modern Gemini 2.5 Flash supported by Firebase AI Logic
      const model = getGenerativeModel(ai, {
        model: 'gemini-2.5-flash',
        systemInstruction: MYCHEF_SYSTEM_INSTRUCTION,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
        },
      });

      // Prepare conversation history if provided
      const promptText = message.trim();
      const result = await model.generateContent(promptText);
      const text = result.response.text();

      if (text && text.trim().length > 0) {
        return {
          reply: text,
          source: 'firebase-ai-logic',
          suggestions: extractSuggestions(message),
          actions: extractActions(message),
          projectId: FIREBASE_PROJECT_ID,
        };
      }
    } catch (err: unknown) {
      console.warn('Firebase AI Logic call encountered an issue, using fallback engine:', err);
    }
  }

  // Graceful domain-expert fallback
  return getDomainFallbackResponse(message);
}

function extractSuggestions(message: string): string[] {
  const lower = message.toLowerCase();
  if (lower.includes('student') || lower.includes('pg') || lower.includes('mess')) {
    return ['Can I pause during exams?', 'What dishes are included?', 'Show Kota hostel delivery'];
  }
  if (lower.includes('veg') || lower.includes('jain') || lower.includes('thali')) {
    return ['Show Jain menu items', 'What cooking oil is used?', 'View weekly rotation'];
  }
  if (lower.includes('skip') || lower.includes('pause')) {
    return ['How do I track skipped credits?', 'What is the cutoff for dinner?', 'Pause for 10 days'];
  }
  return ['Explore student passes (₹84)', 'Recommend Jain thali', 'How does meal skipping work?', 'Track my tiffin'];
}

function extractActions(message: string): { label: string; url: string }[] {
  const lower = message.toLowerCase();
  if (lower.includes('student') || lower.includes('pg') || lower.includes('mess') || lower.includes('84')) {
    return [
      { label: 'View ₹84 Student Meal Cards', url: '/passes' },
      { label: 'Explore Verified Messes', url: '/explore' },
    ];
  }
  if (lower.includes('skip') || lower.includes('pause')) {
    return [
      { label: 'Manage Meal Skips', url: '/consumer/subscriptions' },
      { label: 'Live Order Tracking', url: '/track' },
    ];
  }
  if (lower.includes('track') || lower.includes('delivery')) {
    return [
      { label: 'Live GPS Delivery Tracker', url: '/track' },
      { label: 'Active Subscriptions', url: '/consumer/subscriptions' },
    ];
  }
  return [
    { label: 'Browse Verified Kitchens', url: '/explore' },
    { label: 'Student Meal Passes (₹84)', url: '/passes' },
  ];
}

/**
 * Fallback engine providing instant responses with deep MyChef domain knowledge
 */
function getDomainFallbackResponse(message: string): ChatReply {
  const lower = message.toLowerCase().trim();

  let reply = '';
  let suggestions: string[] = [];
  let actions: { label: string; url: string }[] = [];

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('namaste')) {
    reply = `Namaste! 🙏 I'm **Chef Genie**, your personal MyChef AI Food Concierge (Project: **${FIREBASE_PROJECT_ID}**).\n\nI can help you with:\n- 🍛 Finding delicious homestyle tiffins (Pure Veg, Jain, High-Protein)\n- 🎓 Choosing budget **Student PG Mess Passes** starting at **₹84/meal**\n- ⏸️ Understanding our **100% Skip & Pause Rollover Policy**\n- 🛵 Checking live delivery slots and GPS tracking\n\nWhat would you like to explore today?`;
    suggestions = [
      '🎓 ₹84 Student Mess Pass details',
      '🍛 Recommend pure veg thali',
      '⏸️ How does meal skipping work?',
      '⚡ What are today\'s dispatch cutoff times?',
    ];
    actions = [
      { label: 'Explore Local Kitchens', url: '/explore' },
      { label: 'Student Meal Passes (₹84)', url: '/passes' },
    ];
  } else if (lower.includes('student') || lower.includes('pg') || lower.includes('mess') || lower.includes('84') || lower.includes('hostel')) {
    reply = `🎓 **Student Campus Meal Card (PG Mess Special)**:\n\n- **Rate**: Only **₹84 per meal** (Subsidized for coaching & college students)\n- **Monthly Price**: ₹2,199 (26 days, Lunch or Dinner)\n- **Inclusions**: 4 Desi Ghee Phulkas, Daily Changing Sabzi, Dal Tadka, Jeera Rice & Salad\n- **Skip Rollover**: Up to **8 skips/month** with 100% validity extension\n- **Delivery**: Direct to hostel gates and PG doors in student hubs (Kota, Vallabh Vidyanagar, Roorkee, Pune, etc.)`;
    suggestions = [
      'How to purchase student pass?',
      'Can I pause during exam break?',
      'What are delivery timings?',
    ];
    actions = [
      { label: 'Get Student Meal Card (₹84)', url: '/passes' },
      { label: 'Explore Student Kitchens', url: '/explore' },
    ];
  } else if (lower.includes('veg') || lower.includes('jain') || lower.includes('diet') || lower.includes('thali')) {
    reply = `🍛 **Homestyle Thali & Dietary Options**:\n\n- **Maa Ki Rasoi**: Shahi Paneer, Homestyle Yellow Dal, 4 Desi Ghee Phulkas, Jeera Rice (₹123/meal)\n- **Annapurna Kitchen**: 100% Pure Jain & Gujarati Thali, prepared with zero onion/garlic, cold-pressed groundnut oil\n- **Health Guarantee**: 100% FSSAI certified, zero palm oil, zero artificial colors, cooked fresh daily in small batches`;
    suggestions = [
      'Show Jain friendly menus',
      'Weekly vs Monthly plans',
      'What oil do chefs use?',
    ];
    actions = [
      { label: 'Browse Verified Kitchens', url: '/explore' },
      { label: 'View Monthly Passes', url: '/passes' },
    ];
  } else if (lower.includes('skip') || lower.includes('pause') || lower.includes('refund') || lower.includes('cancel')) {
    reply = `⏸️ **100% Skip & Pause Rollover Policy**:\n\n- **Lunch Skip Cutoff**: Must be requested before **8:00 AM** on the day of delivery.\n- **Dinner Skip Cutoff**: Must be requested before **4:00 PM** on the day of delivery.\n- **Zero Penalty**: Skipped meals are automatically rolled over to extend your subscription validity. You never lose a meal you paid for!\n- **Vacation Pause**: Pause your subscription anytime for up to 30 days.`;
    suggestions = [
      'Where do I manage skips?',
      'Track my lunch dispatch',
    ];
    actions = [
      { label: 'Manage Subscriptions & Skips', url: '/consumer/subscriptions' },
      { label: 'Track Live Delivery', url: '/track' },
    ];
  } else if (lower.includes('timing') || lower.includes('time') || lower.includes('slot') || lower.includes('dispatch') || lower.includes('track')) {
    reply = `⚡ **Daily Dispatch & Delivery Schedule**:\n\n- 🍱 **Lunch Dispatch Window**: 12:15 PM – 1:30 PM (Order or skip cutoff: **8:00 AM**)\n- 🌙 **Dinner Dispatch Window**: 7:30 PM – 9:00 PM (Order or skip cutoff: **4:00 PM**)\n- 🛵 **Live GPS Tracking**: Every meal box has real-time dispatch tracking with rider contact and hot-box temperature logs.`;
    suggestions = [
      'Track active order',
      'Browse kitchens for lunch',
    ];
    actions = [
      { label: 'Live Order Tracking', url: '/track' },
      { label: 'View Subscriptions', url: '/consumer/subscriptions' },
    ];
  } else if (lower.includes('admin') || lower.includes('payout') || lower.includes('kitchen partner') || lower.includes('fssai')) {
    reply = `🛡️ **Partner & Operations Hub**:\n\n- **Kitchen Partners**: FSSAI Grade A+ standards, daily temperature checklists, automated weekly payouts with early settlement options.\n- **Platform Admin**: Razorpay Auto-Debit mandate flow, pincode routing engine, and centralized dispute resolution desk.`;
    suggestions = [
      'Open Admin Console',
      'Open Kitchen Dashboard',
    ];
    actions = [
      { label: 'Admin Command Center', url: '/admin' },
      { label: 'Kitchen Partner Portal', url: '/provider/dashboard' },
    ];
  } else {
    reply = `I'd love to help you with **"${message}"**! 👨‍🍳\n\nAt MyChef, we connect you with authentic local home chefs delivering hot homestyle food daily across 60+ Indian cities and student coaching hubs.\n\nWould you like me to recommend a top-rated kitchen, check student PG meal passes (₹84/meal), or show today's lunch dispatch slot?`;
    suggestions = [
      'Recommend top-rated thali',
      'Student PG Mess (₹84/meal)',
      'Check delivery pincode',
      'How to skip meals?',
    ];
    actions = [
      { label: 'Explore All Kitchens', url: '/explore' },
      { label: 'Meal Passes & Pricing', url: '/passes' },
    ];
  }

  return {
    reply,
    source: 'domain-engine',
    suggestions,
    actions,
    projectId: FIREBASE_PROJECT_ID,
  };
}
