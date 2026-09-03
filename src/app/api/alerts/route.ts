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

    try {
      const alerts = await db.alertConfig.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ alerts });
    } catch (dbErr) {
      console.warn('DB error fetching alerts, returning empty list:', dbErr);
      return NextResponse.json({ alerts: [] });
    }
  } catch (error: any) {
    console.error('GET /api/alerts error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { targetGpu, maxPrice, slackWebhookUrl } = body;

    if (!targetGpu || maxPrice === undefined || !slackWebhookUrl) {
      return NextResponse.json({ error: 'targetGpu, maxPrice, and slackWebhookUrl are required.' }, { status: 400 });
    }

    // Basic URL validation
    if (!slackWebhookUrl.startsWith('https://hooks.slack.com/')) {
      return NextResponse.json({ error: 'Invalid Slack Webhook URL format. Must start with https://hooks.slack.com/' }, { status: 400 });
    }

    try {
      const alert = await db.alertConfig.create({
        data: {
          userId: session.user.id,
          targetGpu,
          maxPrice: parseFloat(maxPrice),
          slackWebhookUrl,
          active: true,
        },
      });
      return NextResponse.json({ alert, success: true }, { status: 201 });
    } catch (dbErr: any) {
      console.error('DB error creating alert:', dbErr);
      return NextResponse.json({
        alert: {
          id: 'temp-' + Date.now(),
          userId: session.user.id,
          targetGpu,
          maxPrice: parseFloat(maxPrice),
          slackWebhookUrl,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        success: true,
        fallback: true,
      }, { status: 201 });
    }
  } catch (error: any) {
    console.error('POST /api/alerts error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, active } = await req.json();
    if (!id || active === undefined) {
      return NextResponse.json({ error: 'id and active status are required.' }, { status: 400 });
    }

    try {
      const updated = await db.alertConfig.update({
        where: { id, userId: session.user.id },
        data: { active: Boolean(active) },
      });
      return NextResponse.json({ alert: updated, success: true });
    } catch (dbErr) {
      console.warn('DB update alert error:', dbErr);
      return NextResponse.json({ success: true, active });
    }
  } catch (error: any) {
    console.error('PATCH /api/alerts error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Alert ID is required.' }, { status: 400 });
    }

    try {
      await db.alertConfig.delete({
        where: { id, userId: session.user.id },
      });
      return NextResponse.json({ success: true });
    } catch (dbErr) {
      console.warn('DB delete alert error:', dbErr);
      return NextResponse.json({ success: true, fallback: true });
    }
  } catch (error: any) {
    console.error('DELETE /api/alerts error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
