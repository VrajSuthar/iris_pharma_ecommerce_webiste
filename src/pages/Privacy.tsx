import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, such as your name, email address, shipping address and payment details when you create an account, place an order, or contact us.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to process orders, communicate with you, improve our products and services, personalize your experience, and send marketing communications where you have opted in.",
  },
  {
    title: "3. Cookies & Tracking",
    body: "We use cookies and similar technologies to remember your preferences, understand how you use our site, and improve functionality. You can control cookies through your browser settings.",
  },
  {
    title: "4. Sharing Your Information",
    body: "We do not sell your personal information. We may share it with trusted service providers who help us operate our business, such as payment processors and shipping partners, under appropriate confidentiality obligations.",
  },
  {
    title: "5. Data Security",
    body: "We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "6. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time by contacting us. You may also opt out of marketing communications using the unsubscribe link in any email.",
  },
  {
    title: "7. Data Retention",
    body: "We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.",
  },
  {
    title: "8. Children's Privacy",
    body: "Our website is not directed at children under 16, and we do not knowingly collect personal information from children.",
  },
  {
    title: "9. Changes to This Policy",
    body: "We may update this Privacy Policy periodically. We encourage you to review this page occasionally to stay informed of any changes.",
  },
  {
    title: "10. Contact Us",
    body: "If you have questions about this Privacy Policy or how your data is handled, please reach out to hello@irispharma.com.",
  },
];

export function Privacy() {
  return (
    <Reveal as="section" className="px-[7vw] py-[160px] max-mobile:py-[100px]">
      <div className="text-center max-w-[700px] mx-auto">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-[20px] font-serif text-[clamp(44px,6vw,70px)] font-normal leading-[.95] -tracking-[.04em]">
          Privacy <em className="italic text-rose-dark">Policy.</em>
        </h1>
        <p className="mt-[20px] text-brown-light text-[12px] uppercase tracking-[.15em]">
          Last updated: January 1, 2026
        </p>
      </div>

      <div className="max-w-[720px] mx-auto mt-[80px] flex flex-col gap-[45px]">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="font-serif text-[24px] font-normal mb-[12px]">{section.title}</h2>
            <p className="text-brown-light text-[14px] leading-[1.8]">{section.body}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
