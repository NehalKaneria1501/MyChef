import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@/lib/razorpay';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface CreateOrderRequestBody {
  amount?: number | string;
  receipt?: string;
  notes?: Record<string, string>;
  planName?: string;
  planId?: string;
  fulfillment?: string;
  address?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as CreateOrderRequestBody;
    const { amount, receipt, notes, planName, planId, fulfillment, address } = body;

    // Amount can be passed either in INR (e.g. 500, 3199) or already in paise (e.g. 50000, 319900)
    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      );
    }

    // Convert to paise: if amount is less than 10000, assume it is INR and multiply by 100
    // If it is already in paise (e.g. 259900 or 50000), use as is
    const amountInPaise = parsedAmount < 10000 ? Math.round(parsedAmount * 100) : Math.round(parsedAmount);

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET || RAZORPAY_KEY_SECRET;

    const orderReceipt = receipt || `rcpt_${Date.now().toString().slice(-10)}`;
    const orderNotes: Record<string, string> = {
      ...(notes || {}),
      planName: planName || planId || 'MyChef Meal Pass',
      fulfillment: fulfillment || 'delivery',
      address: address ? String(address).slice(0, 200) : '',
      platform: 'MyChef',
    };

    // If both Razorpay Key ID and Secret are available, create a real order with Razorpay
    if (keyId && keySecret) {
      try {
        const razorpay = new Razorpay({
          key_id: keyId,
          key_secret: keySecret,
        });

        const order = await razorpay.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: orderReceipt,
          notes: orderNotes,
        });

        return NextResponse.json({
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId: keyId,
          isRealOrder: true,
        });
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.warn('Razorpay API error, falling back to direct client checkout:', errorMsg);
        // Fallback gracefully so frontend can still open standard test checkout
      }
    }

    // If keySecret is not configured or Razorpay API failed, return keyId and amount
    // Do NOT generate a fake order_id like "order_test_..." because Razorpay Checkout will reject it
    return NextResponse.json({
      orderId: null,
      amount: amountInPaise,
      currency: 'INR',
      keyId: keyId,
      isRealOrder: false,
      message: 'Operating in test/direct mode (no server order required)',
    });
  } catch (error: unknown) {
    console.error('Failed to process create-order request:', error);
    const errMsg = error instanceof Error ? error.message : 'Failed to create order';
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}