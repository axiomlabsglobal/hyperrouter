export const dynamic = 'force-dynamic';
﻿import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user = null;
    try {
      user = await db.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          email: true,
          subscription_tier: true,
          subscription_status: true,
          billing_customer_id: true,
          billing_subscription_id: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (dbErr) {
      console.warn('DB connection error in /api/billing/subscription:', dbErr);
    }

    // Defensive default mock if DB not connected or new user
    const defaultData = {
      tier: user?.subscription_tier || 'free',
      status: user?.subscription_status || 'active',
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: user?.billing_customer_id ? 'Credit Card (via Lemon Squeezy)' : 'None (Free Plan)',
      hasCustomerPortal: Boolean(user?.billing_customer_id),
      email: user?.email || session.user.email,
    };

    return NextResponse.json(defaultData);
  } catch (error: any) {
    console.error('Subscription API error:', error);
    return NextResponse.json({
      tier: 'free',
      status: 'active',
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'None (Free Plan)',
      hasCustomerPortal: false,
    });
  }
}
