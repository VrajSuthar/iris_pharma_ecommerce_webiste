import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Shipping Policy — ${site.brandName}`,
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy" updated="8 August 2026">
      <h2>Dispatch</h2>
      <p>
        Orders are dispatched within 1–2 business days of payment
        confirmation.
      </p>

      <h2>Delivery time</h2>
      <p>
        We ship pan-India via India Post / courier partners. Typical
        delivery takes 3–7 business days from dispatch, depending on your
        location. Delivery to remote areas may take longer.
      </p>

      <h2>Shipping charges</h2>
      <p>
        Shipping is included in the price shown at checkout — there are no
        extra delivery charges.
      </p>

      <h2>Delays</h2>
      <p>
        Occasionally deliveries are delayed due to courier or weather
        disruptions outside our control. If your order is delayed, we&apos;ll
        let you know via WhatsApp.
      </p>

      <h2>Order updates</h2>
      <p>
        We&apos;ll send you shipment details via WhatsApp once your order is
        dispatched.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about your delivery? Message us on WhatsApp at{" "}
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
