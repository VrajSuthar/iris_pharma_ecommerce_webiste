// Minimal typing for the Razorpay Checkout script (checkout.razorpay.com/v1/checkout.js).
// Only the fields this app actually uses are typed.
export {};

declare global {
  interface RazorpayCheckoutResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }

  interface RazorpayCheckoutFailureResponse {
    error: {
      code: string;
      description: string;
      source: string;
      step: string;
      reason: string;
    };
  }

  interface RazorpayCheckoutOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    order_id: string;
    prefill?: { name?: string; contact?: string };
    theme?: { color?: string };
    notes?: Record<string, string>;
    handler: (response: RazorpayCheckoutResponse) => void;
    modal?: { ondismiss?: () => void };
    config?: {
      display?: {
        blocks?: Record<
          string,
          {
            name: string;
            instruments: Array<{
              method: string;
              flows?: string[];
              apps?: string[];
            }>;
          }
        >;
        sequence?: string[];
        preferences?: { show_default_blocks?: boolean };
      };
    };
  }

  interface RazorpayCheckoutInstance {
    open: () => void;
    on: (
      event: "payment.failed",
      handler: (response: RazorpayCheckoutFailureResponse) => void
    ) => void;
  }

  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
  }
}
