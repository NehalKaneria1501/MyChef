/**
 * Firebase Configuration for MyChef
 * Project Console: https://console.firebase.google.com/u/0/project/mychef-7e869/ailogic
 * Project ID: mychef-7e869
 */

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'mychef-7e869.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'mychef-7e869',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'mychef-7e869.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
};


export const FIREBASE_PROJECT_ID = 'mychef-7e869';
export const FIREBASE_AI_CONSOLE_URL = 'https://console.firebase.google.com/u/0/project/mychef-7e869/ailogic';
