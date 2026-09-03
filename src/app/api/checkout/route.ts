export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { paymentProvider } from '@/lib/billing';

export async function POST(req: Request) {
  try {
    // 1. 방어적 코딩: 환경변수 및 DB 체크
    if (!process.env.LEMON_SQUEEZY_API_KEY || !process.env.DATABASE_URL) {
      console.warn("Missing environment variables. Falling back to dummy mode.");
      return NextResponse.json({ 
        error: "Payment keys missing", 
        dummyUrl: "/dashboard/billing?checkout=dummy" 
      }, { status: 200 });
    }

    let session;
    try {
      session = await getServerSession(authOptions);
    } catch (e) {
      console.warn("DB Connection failed during session check. Falling back.");
      return NextResponse.json({ 
        error: "Payment keys missing", 
        dummyUrl: "/dashboard/billing?checkout=dummy" 
      }, { status: 200 });
    }

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tier } = await req.json();

    if (!tier || !['pro', 'enterprise'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier requested' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const checkoutResponse = await paymentProvider.createCheckoutSession({
      userId: session.user.id,
      userEmail: session.user.email!,
      tier: tier,
      successUrl: `${appUrl}/dashboard/billing?checkout=success`,
      cancelUrl: `${appUrl}/pricing`,
    });

    return NextResponse.json({ checkoutUrl: checkoutResponse.checkoutUrl });
  } catch (error: any) {
    console.error('Checkout API failed:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
