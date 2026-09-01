import { IPaymentProvider } from './types';
import { LemonSqueezyProvider } from './providers/lemonSqueezy';

// Easily swap to StripeProvider here in the future
export const paymentProvider: IPaymentProvider = new LemonSqueezyProvider();
