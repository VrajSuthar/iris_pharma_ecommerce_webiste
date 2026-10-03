const MARQUEE_ITEMS = ["Science", "Beauty", "Wellness", "Innovation"];
const MARQUEE_TRACK = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-brown text-cream py-[18px] relative">
      <div className="flex w-max items-center gap-[35px] animate-marquee will-change-transform">
        {MARQUEE_TRACK.map((label, index) => (
          <div
            key={`${label}-${index}`}
            className="group flex items-center gap-[18px] max-mobile:gap-3 shrink-0 font-serif text-[25px] max-mobile:text-[20px] italic whitespace-nowrap"
          >
            <span className="w-[44px] h-[44px] max-mobile:w-[35px] max-mobile:h-[35px] border border-[rgba(245,239,231,.7)] rounded-full flex items-center justify-center text-rose font-sans text-[15px] max-mobile:text-[12px] shrink-0 transition duration-[400ms] group-hover:bg-rose group-hover:text-brown group-hover:rotate-180">
              ✦
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
