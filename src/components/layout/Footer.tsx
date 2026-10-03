import { Link } from "react-router-dom";

const SHOP_LINKS = [
  { label: "All Products", to: "/shop" },
  { label: "Face & Serums", to: "/shop?category=face" },
  { label: "Body", to: "/shop?category=body" },
];

const COMPANY_LINKS = [
  { label: "About Iris", to: "/about" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
  { label: "My Orders", to: "/orders" },
  { label: "Account", to: "/login" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: <path d="M14 9h2V6h-2c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.28.22-.5.5-.5H15" />,
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    path: (
      <path d="M9.5 20c-.3-1.6-.4-2.7.1-4.2L10.8 11s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.6 0 1-.6 2.4-1 3.7-.3 1.1.5 2 1.6 2 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.5.7 2 .2.2.2.3.1.5l-.3 1c-.1.3-.3.4-.6.3-1.3-.5-2-2-2-3.6C6.4 7.6 9 5 13.3 5c3.4 0 5.9 2.4 5.9 5.6 0 3.3-1.9 5.9-4.8 5.9-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.9-.7 1.9-1.1 2.6" />
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-footer text-cream px-[5vw] pt-20 pb-[30px]">
      <div className="grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-[50px] pb-[70px] max-tablet:grid-cols-2 max-mobile:grid-cols-1">
        <div>
          <Link to="/" className="font-serif text-[40px] leading-none">
            IRIS PHARMA
          </Link>
          <p className="max-w-[300px] text-footer-text text-[12px] leading-[1.7] mt-[14px]">
            Modern skincare thoughtfully created for modern life — effective
            formulations, honest ingredients, quietly elegant rituals.
          </p>

          <div className="flex gap-[14px] mt-[24px]">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={social.label}
                className="w-9 h-9 flex items-center justify-center border border-white/15 rounded-full text-footer-link transition-colors duration-300 hover:bg-white/10 hover:text-cream"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  {social.path}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[9px] uppercase tracking-[.25em] text-footer-bottom mb-[20px]">
            Shop
          </div>
          <ul className="flex flex-col gap-[13px]">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-[12px] text-footer-link hover:text-cream transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[9px] uppercase tracking-[.25em] text-footer-bottom mb-[20px]">
            Company
          </div>
          <ul className="flex flex-col gap-[13px]">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-[12px] text-footer-link hover:text-cream transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[9px] uppercase tracking-[.25em] text-footer-bottom mb-[20px]">
            Get In Touch
          </div>
          <ul className="flex flex-col gap-[13px] text-[12px] text-footer-link">
            <li>123 Bandra Linking Road, Mumbai 400050, India</li>
            <li>
              <a href="mailto:hello@irispharma.com" className="hover:text-cream transition-colors duration-300">
                hello@irispharma.com
              </a>
            </li>
            <li>
              <a href="tel:+911800123456" className="hover:text-cream transition-colors duration-300">
                +91 1800-123-456
              </a>
            </li>
            <li className="text-footer-bottom">Mon–Sat, 10am–7pm IST</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex justify-between items-center gap-[20px] flex-wrap text-footer-bottom text-[8px] uppercase tracking-[.15em] max-mobile:justify-center max-mobile:text-center">
        <span>© {new Date().getFullYear()} Iris Pharma. All Rights Reserved.</span>

        <div className="flex gap-[22px]">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-footer-link transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
