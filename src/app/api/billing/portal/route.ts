export const dynamic = 'force-dynamic';
﻿import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { paymentProvider } from '@/lib/billing';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user = null;
    try {
      user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { billing_customer_id: true, subscription_tier: true },
      });
    } catch (e) {
      console.warn('DB query for billing_customer_id failed, using fallback:', e);
    }

    // Defensive fallback: If no API key or DB not connected or no customer ID yet
    if (!process.env.LEMON_SQUEEZY_API_KEY || !user?.billing_customer_id) {
      return NextResponse.json({
        portalUrl: 'https://app.lemonsqueezy.com/my-orders',
        isDummy: true,
      });
    }

    const portalUrl = await paymentProvider.getCustomerPortalUrl(user.billing_customer_id);
    return NextResponse.json({ portalUrl });
  } catch (error: any) {
    console.error('Customer Portal API error:', error);
    return NextResponse.json({ 
      portalUrl: 'https://app.lemonsqueezy.com/my-orders',
      fallback: true,
      message: error.message 
    }, { status: 200 });
  }
}
