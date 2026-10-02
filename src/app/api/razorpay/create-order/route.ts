import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder, RAZORPAY_KEY_ID } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, receipt, notes, planName } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount in INR is required' },
        { status: 400 }
      );
    }

    const order = await createRazorpayOrder({
      amount,
      receipt,
      notes: {
        ...notes,
        planName: planName || 'MyChef Meal Pass',
        platform: 'MyChef',
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
    });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Failed to create order';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
