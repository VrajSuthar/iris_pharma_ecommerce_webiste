import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the Iris Pharma website, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please discontinue use of the site.",
  },
  {
    title: "2. Products & Pricing",
    body: "We make every effort to display product information, images and prices accurately. Prices are subject to change without notice, and we reserve the right to correct any errors, inaccuracies or omissions.",
  },
  {
    title: "3. Orders & Payment",
    body: "By placing an order, you confirm that the information you provide is accurate and complete. We reserve the right to refuse or cancel any order for reasons including product availability, errors in pricing, or suspected fraud.",
  },
  {
    title: "4. Shipping & Delivery",
    body: "Delivery timelines are estimates and not guaranteed. Iris Pharma is not liable for delays caused by courier partners, customs, or circumstances beyond our reasonable control.",
  },
  {
    title: "5. Returns & Refunds",
    body: "Unopened products in their original packaging may be returned within 14 days of delivery. Refunds are processed to the original payment method once the returned item is received and inspected.",
  },
  {
    title: "6. Intellectual Property",
    body: "All content on this site, including text, graphics, logos and images, is the property of Iris Pharma and protected by applicable intellectual property laws. It may not be reproduced without written permission.",
  },
  {
    title: "7. Limitation of Liability",
    body: "Iris Pharma shall not be liable for any indirect, incidental or consequential damages arising from the use of, or inability to use, our products or this website.",
  },
  {
    title: "8. Changes to These Terms",
    body: "We may update these Terms & Conditions from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
  },
  {
    title: "9. Contact",
    body: "Questions about these Terms & Conditions can be sent to hello@irispharma.com.",
  },
];

export function Terms() {
  return (
    <Reveal as="section" className="px-[7vw] py-[160px] max-mobile:py-[100px]">
      <div className="text-center max-w-[700px] mx-auto">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-[20px] font-serif text-[clamp(44px,6vw,70px)] font-normal leading-[.95] -tracking-[.04em]">
          Terms & <em className="italic text-rose-dark">Conditions.</em>
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
