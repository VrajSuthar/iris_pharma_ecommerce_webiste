import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${site.brandName}`,
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" updated="8 August 2026">
      <p>
        This policy explains what information {site.brandName} collects when
        you order products through this website, and how it&apos;s used.
      </p>

      <h2>What we collect</h2>
      <p>When you place an order, we collect the details you enter on the order form:</p>
      <ul>
        <li>Your name</li>
        <li>Your phone number</li>
        <li>Your delivery address</li>
      </ul>
      <p>
        We do not collect or store your card, UPI, or bank details. Payment
        is processed entirely by Razorpay — see &quot;Payment
        information&quot; below.
      </p>

      <h2>How we use it</h2>
      <p>
        Your details are used only to process, pack, ship and deliver your
        order, and to contact you (by phone or WhatsApp) if there&apos;s an
        issue with your order or delivery.
      </p>

      <h2>Payment information</h2>
      <p>
        Payments are handled by Razorpay, a licensed payment gateway. When
        you pay, Razorpay&apos;s checkout script runs in your browser and
        your payment details go directly to Razorpay — this site never sees
        or stores your card, UPI ID, or bank details. We only receive
        confirmation that a payment succeeded.
      </p>

      <h2>Sharing</h2>
      <p>
        We don&apos;t sell or rent your information. It&apos;s shared only
        where necessary to fulfil your order — with Razorpay to process
        payment, and with our courier/postal partner to deliver your
        package.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep order details only as long as needed to fulfil your order
        and handle any related support request.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Message us on WhatsApp at{" "}
        <a
          href={`https://wa.me/${site.whatsappNumber}`}
          className="font-medium text-primary hover:underline"
        >
          +{site.whatsappNumber}
        </a>{" "}
        or write to us at {site.address}.
      </p>
    </PolicyPage>
  );
}
