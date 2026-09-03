import crypto from 'crypto';
import { IPaymentProvider, ICheckoutRequest, ICheckoutResponse } from '../types';

export class LemonSqueezyProvider implements IPaymentProvider {
  async createCheckoutSession(req: ICheckoutRequest): Promise<ICheckoutResponse> {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    
    const variantId = req.tier === 'enterprise' 
      ? process.env.LEMON_SQUEEZY_ENTERPRISE_VARIANT_ID 
      : req.tier === 'starter'
      ? process.env.LEMON_SQUEEZY_STARTER_VARIANT_ID
      : process.env.LEMON_SQUEEZY_PRO_VARIANT_ID;

    if (!apiKey || !storeId || !variantId) {
      throw new Error('Lemon Squeezy API configuration is missing.');
    }

    const payload = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email: req.userEmail,
            custom: {
              user_id: req.userId,
              email: req.userEmail,
            }
          },
          product_options: {
            redirect_url: req.successUrl,
            receipt_button_text: 'Go to Dashboard',
            receipt_link_url: req.successUrl,
          }
        },
        relationships: {
          store: { data: { type: 'stores', id: storeId } },
          variant: { data: { type: 'variants', id: variantId } }
        }
      }
    };

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Lemon Squeezy API error:', data);
      throw new Error('Failed to create checkout session with Lemon Squeezy');
    }

    return { checkoutUrl: data.data.attributes.url };
  }

  verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    return digest.length === signatureBuffer.length && crypto.timingSafeEqual(digest, signatureBuffer);
  }

  async getCustomerPortalUrl(customerId: string): Promise<string> {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    if (!apiKey) {
      throw new Error('Lemon Squeezy API key is missing.');
    }

    try {
      const response = await fetch(`https://api.lemonsqueezy.com/v1/customers/${customerId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch Lemon Squeezy customer portal url', await response.text());
        return 'https://app.lemonsqueezy.com/my-orders';
      }

      const data = await response.json();
      return data?.data?.attributes?.urls?.customer_portal || 'https://app.lemonsqueezy.com/my-orders';
    } catch (e) {
      console.warn('Fallback to default Lemon Squeezy customer orders portal', e);
      return 'https://app.lemonsqueezy.com/my-orders';
    }
  }
}
