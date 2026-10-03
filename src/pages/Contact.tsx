import { useState, type FormEvent } from "react";
import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { useUI } from "../context/UIContext";

const INPUT_CLASS =
  "w-full border-0 border-b border-brown outline-none bg-transparent py-[13px] text-[14px]";

const CONTACT_DETAILS = [
  {
    label: "Visit Us",
    value: "123 Bandra Linking Road, Mumbai 400050, India",
  },
  {
    label: "Email Us",
    value: "hello@irispharma.com",
    href: "mailto:hello@irispharma.com",
  },
  {
    label: "Call Us",
    value: "+91 1800-123-456",
    href: "tel:+911800123456",
  },
  {
    label: "Hours",
    value: "Monday – Saturday, 10am – 7pm IST",
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { showToast } = useUI();

  /* TODO: replace with a real contact/support API call. */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showToast("Thanks for reaching out — we'll be in touch soon.");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  }

  return (
    <Reveal as="section" className="px-[7vw] py-[160px] max-mobile:py-[100px]">
      <div className="text-center max-w-[700px] mx-auto">
        <SectionLabel>Get In Touch</SectionLabel>
        <h1 className="mt-[20px] font-serif text-[clamp(48px,6vw,80px)] font-normal leading-[.95] -tracking-[.04em]">
          We'd love to <em className="italic text-rose-dark">hear from you.</em>
        </h1>
        <p className="max-w-[450px] mx-auto mt-[25px] text-brown-light text-[14px] leading-[1.8]">
          Questions about a product, an order, or just want to say hello —
          send us a note and our team will respond shortly.
        </p>
      </div>

      <div className="grid grid-cols-[1.3fr_1fr] gap-[80px] max-w-[1100px] mx-auto mt-[80px] max-tablet:grid-cols-1 max-tablet:gap-[60px]">
        <form onSubmit={handleSubmit} className="text-left">
          <div className="grid grid-cols-2 gap-x-[25px] max-mobile:grid-cols-1">
            <div className="mb-[25px]">
              <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className={INPUT_CLASS}
              />
            </div>

            <div className="mb-[25px]">
              <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="mb-[25px]">
            <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              required
              className={INPUT_CLASS}
            />
          </div>

          <div className="mb-[10px]">
            <label className="block text-[9px] uppercase tracking-[.18em] mb-[8px]">
              Message
            </label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              rows={5}
              className={`${INPUT_CLASS} resize-none`}
            />
          </div>

          <Button type="submit" className="mt-[30px]">
            Send Message
          </Button>
        </form>

        <div className="flex flex-col gap-[35px]">
          {CONTACT_DETAILS.map((detail) => (
            <div key={detail.label} className="border-b border-border pb-[25px] last:border-0">
              <div className="text-[9px] uppercase tracking-[.25em] text-rose-dark mb-[10px]">
                {detail.label}
              </div>
              {detail.href ? (
                <a href={detail.href} className="text-[14px] text-brown-light leading-[1.7]">
                  {detail.value}
                </a>
              ) : (
                <p className="text-[14px] text-brown-light leading-[1.7]">{detail.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
