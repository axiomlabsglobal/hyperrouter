import { db } from './db';

interface GPUAlertContext {
  model: string;
  provider: string;
  price: number;
  region: string;
  vram: string;
}

export async function sendInventoryAlert(userId: string, gpu: GPUAlertContext) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { slack_access_token: true, slack_channel_id: true }
  });

  if (!user || !user.slack_access_token || !user.slack_channel_id) {
    throw new Error('User has not connected a Slack workspace.');
  }

  // Construct Block Kit message for a rich layout
  const payload = {
    channel: user.slack_channel_id,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `🚨 GPU Availability Alert: ${gpu.model}`,
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Provider:*\n${gpu.provider}`
          },
          {
            type: "mrkdwn",
            text: `*Region:*\n${gpu.region}`
          },
          {
            type: "mrkdwn",
            text: `*Price:*\n$${gpu.price}/hr`
          },
          {
            type: "mrkdwn",
            text: `*VRAM:*\n${gpu.vram}`
          }
        ]
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Rent Now 🚀",
              emoji: true
            },
            style: "primary",
            url: `${process.env.NEXT_PUBLIC_APP_URL}/rent?provider=${encodeURIComponent(gpu.provider)}&model=${encodeURIComponent(gpu.model)}`
          }
        ]
      }
    ]
  };

  const res = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.slack_access_token}`
    },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  
  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error}`);
  }

  return data;
}
