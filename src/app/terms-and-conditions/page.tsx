import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${site.brandName}`,
};

export default function TermsPage() {
  return (
    <PolicyPage title="Terms & Conditions" updated="8 August 2026">
      <p>
        This website is operated by {site.brandName} ({site.address}). By
        browsing this site or placing an order, you agree to the terms
        below.
      </p>

      <h2>Product information</h2>
      <p>
        Photos and descriptions are for reference — actual packaging may
        vary slightly. {site.productName} is for external/topical use only;
        follow the usage instructions on the product packaging. Stop use and
        consult a physician if irritation occurs. Keep out of reach of
        children.
      </p>

      <h2>Pricing & orders</h2>
      <p>
        The price shown on the order page at the time you pay is the price
        you&apos;re charged — MRP and any discount are displayed alongside
        it. An order is confirmed only after payment is successfully
        completed and verified; nothing is charged or marked as placed
        before that.
      </p>

      <h2>Payment</h2>
      <p>
        Payments are processed by Razorpay. We verify every payment
        server-side before confirming an order, so no order is accepted on
        trust.
      </p>

      <h2>Returns, refunds & shipping</h2>
      <p>
        See our{" "}
        <a href="/refund-policy" className="font-medium text-primary hover:underline">
          Refund & Cancellation Policy
        </a>{" "}
        and{" "}
        <a href="/shipping-policy" className="font-medium text-primary hover:underline">
          Shipping Policy
        </a>{" "}
        for details.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time; changes take effect as
        soon as they&apos;re posted on this page.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, subject to the
        jurisdiction of courts in Palghar, Maharashtra.
      </p>

      <h2>Contact us</h2>
      <p>
        Message us on WhatsApp at{" "}
        <a
          href={`https://wa.me/${site.whatsappNumber}`}
          className="font-medium text-primary hover:underline"
        >
          +{site.whatsappNumber}
        </a>{" "}
        for any questions about these terms.
      </p>
    </PolicyPage>
  );
}
