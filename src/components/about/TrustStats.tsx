import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCountUp } from "../../hooks/useCountUp";

interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 25000, suffix: "+", label: "Happy Customers" },
  { value: 4.8, decimals: 1, suffix: "/5", label: "Average Rating" },
  { value: 50000, suffix: "+", label: "Products Shipped" },
  { value: 98, suffix: "%", label: "Would Recommend" },
];

function StatItem({ value, decimals = 0, prefix = "", suffix = "", label }: Stat) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const count = useCountUp(value, isVisible);

  const display =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.round(count).toLocaleString();

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-[clamp(42px,5vw,64px)] font-normal -tracking-[.03em] text-rose">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-[12px] text-[9px] uppercase tracking-[.2em] text-cream/70">
        {label}
      </div>
    </div>
  );
}

export function TrustStats() {
  return (
    <section className="grid grid-cols-4 max-tablet:grid-cols-2 max-mobile:grid-cols-1 gap-[40px] px-[6vw] py-[100px] bg-brown text-cream">
      {STATS.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </section>
  );
}
