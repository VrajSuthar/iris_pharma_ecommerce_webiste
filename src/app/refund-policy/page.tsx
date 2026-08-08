import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy — ${site.brandName}`,
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage title="Refund & Cancellation Policy" updated="8 August 2026">
      <p>
        Because {site.productName} is a topical personal-care product, we
        don&apos;t accept returns once it&apos;s delivered, for hygiene
        reasons — except in the cases below.
      </p>

      <h2>When a refund applies</h2>
      <ul>
        <li>The item arrives damaged</li>
        <li>You receive the wrong item or wrong quantity</li>
        <li>The item is defective</li>
      </ul>
      <p>
        Message us on WhatsApp within 48 hours of delivery with a photo or
        short video of the product and its packaging, and we&apos;ll sort it
        out.
      </p>

      <h2>Refund processing</h2>
      <p>
        Once a refund is approved, the amount is credited back to your
        original payment method within 5–7 business days.
      </p>

      <h2>Cancellations</h2>
      <p>
        Once payment is completed, we start preparing your order right
        away, so we generally can&apos;t cancel an order after payment. If
        you need to cancel, message us on WhatsApp immediately — we&apos;ll
        cancel it if it hasn&apos;t been dispatched yet, but we can&apos;t
        guarantee it.
      </p>

      <h2>Contact us</h2>
      <p>
        For any refund or cancellation request, message us on WhatsApp at{" "}
        <a
          href={`https://wa.me/${site.whatsappNumber}`}
          className="font-medium text-primary hover:underline"
        >
          +{site.whatsappNumber}
        </a>
        .
      </p>
    </PolicyPage>
  );
}
