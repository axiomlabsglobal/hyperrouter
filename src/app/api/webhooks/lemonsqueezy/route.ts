export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('X-Signature') || '';
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

    // Verify HMAC signature
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (digest.length !== signatureBuffer.length || !crypto.timingSafeEqual(digest, signatureBuffer)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const obj = payload.data.attributes;

    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      const customerId = obj.customer_id.toString();
      const status = obj.status;
      // You can map variant IDs to your specific plan names (e.g. basic, pro, enterprise)
      const variantId = obj.variant_id;
      const tier = variantId === Number(process.env.LEMON_SQUEEZY_PRO_VARIANT_ID) ? 'pro' : 'enterprise';

      // Typically, email is stored in custom_data during the checkout process
      const email = payload.meta.custom_data?.email;

      if (email) {
        await db.user.update({
          where: { email },
          data: {
            billing_customer_id: customerId,
            billing_subscription_id: payload.data.id,
            subscription_status: status,
            subscription_tier: status === 'active' ? tier : 'free',
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
