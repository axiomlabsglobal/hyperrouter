import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  
  // Custom state should contain the userId to identify who is linking the Slack account
  const state = searchParams.get('state'); 

  if (!code || !state) {
    return NextResponse.json({ error: 'Missing code or state parameter' }, { status: 400 });
  }

  try {
    const formData = new URLSearchParams({
      client_id: process.env.SLACK_CLIENT_ID!,
      client_secret: process.env.SLACK_CLIENT_SECRET!,
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/slack/callback`,
    });

    const response = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(`Slack API error: ${data.error}`);
    }

    // data contains access_token and incoming_webhook info
    const accessToken = data.access_token;
    // Fallback to auth user if incoming_webhook channel isn't provided
    const channelId = data.incoming_webhook?.channel_id || data.authed_user?.id;
    const teamId = data.team?.id;

    if (!accessToken || !channelId) {
      throw new Error('Incomplete data from Slack OAuth');
    }

    // Save tokens and IDs to the database linked to the user
    await db.user.update({
      where: { id: state }, // Using state as the userId mapping
      data: {
        slack_access_token: accessToken,
        slack_channel_id: channelId,
        slack_team_id: teamId,
      },
    });

    // Redirect user back to the dashboard with a success parameter
    return NextResponse.redirect(new URL('/?slack_integration=success', req.url));
  } catch (error) {
    console.error('Slack OAuth error:', error);
    return NextResponse.redirect(new URL('/?slack_integration=error', req.url));
  }
}
