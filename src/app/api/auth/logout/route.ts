import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase/client';

export async function POST() {
  try {
    // 1. Sign out from Supabase if active
    try {
      await supabase.auth.signOut();
    } catch {
      // offline/fallback
    }

    // 2. Clear session cookie
    const cookieStore = await cookies();
    cookieStore.delete('mychef_session');

    return NextResponse.json({
      success: true,
      message: 'Signed out successfully',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Logout failed';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
