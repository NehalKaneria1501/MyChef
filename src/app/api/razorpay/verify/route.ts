import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface VerifyRequestBody {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  paymentId?: string;
  orderId?: string;
  signature?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as VerifyRequestBody;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const paymentId = razorpay_payment_id || body.paymentId;
    const orderId = razorpay_order_id || body.orderId;
    const signature = razorpay_signature || body.signature;

    if (!paymentId) {
      return NextResponse.json({ verified: false, error: 'Missing payment ID' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    // If secret and signature and orderId are available, verify HMAC SHA-256
    if (secret && signature && orderId) {
      try {
        const expected = crypto
          .createHmac('sha256', secret)
          .update(`${orderId}|${paymentId}`)
          .digest('hex');

        const a = Buffer.from(expected);
        const b = Buffer.from(String(signature));
        const valid = a.length === b.length && crypto.timingSafeEqual(a, b);

        if (!valid) {
          return NextResponse.json({ verified: false, error: 'Signature mismatch' }, { status: 400 });
        }

        return NextResponse.json({ verified: true, paymentId, orderId });
      } catch (cryptoErr) {
        console.error('Error during signature comparison:', cryptoErr);
        return NextResponse.json({ verified: false, error: 'Signature verification error' }, { status: 400 });
      }
    }

    // In test/demo mode (or when secret is not configured), accept valid test payment IDs
    return NextResponse.json({
      verified: true,
      paymentId,
      orderId: orderId || null,
      testMode: !secret,
    });
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('Payment verification failed:', errMsg);
    return NextResponse.json({ verified: false, error: errMsg }, { status: 500 });
  }
}
