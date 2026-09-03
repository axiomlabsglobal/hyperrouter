export interface ICheckoutRequest {
  userId: string;
  userEmail: string;
  tier: 'pro' | 'enterprise';
  successUrl: string;
  cancelUrl: string;
}

export interface ICheckoutResponse {
  checkoutUrl: string;
}

export interface IPaymentProvider {
  /**
   * Generates a unique checkout URL for the user to complete their subscription.
   */
  createCheckoutSession(req: ICheckoutRequest): Promise<ICheckoutResponse>;
  
  /**
   * Verifies the incoming webhook signature from the payment provider.
   */
  verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean;

  /**
   * Generates a customer portal URL for managing subscription, invoices, and payment methods.
   */
  getCustomerPortalUrl(customerId: string): Promise<string>;
}
