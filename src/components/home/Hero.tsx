import { Button } from "../common/Button";
import { useMouseParallax } from "../../hooks/useMouseParallax";

export function Hero() {
  const mouse = useMouseParallax(10);

  return (
    <section
      id="home"
      className="min-h-screen max-mobile:min-h-[850px] relative overflow-hidden flex items-center px-[7vw] max-mobile:px-[6vw] pt-[38px] max-mobile:pt-[58px] pb-[70px] max-mobile:pb-[80px]"
    >
      <video
        src="/hero-background.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(48,37,31,.92)_8%,rgba(48,37,31,.6)_38%,rgba(48,37,31,.2)_65%,rgba(48,37,31,0)_85%)] max-mobile:bg-[linear-gradient(180deg,rgba(48,37,31,.3)_0%,rgba(48,37,31,.85)_55%,rgba(48,37,31,.92)_100%)]" />

      <div
        className="relative z-[3] w-[55%] max-tablet:w-[75%] max-mobile:w-full max-mobile:text-center"
        style={{
          transform: `translate3d(${mouse.x}px, ${mouse.y}px, 0)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="text-[9px] uppercase tracking-[.35em] mb-[25px] text-cream/80 opacity-0 animate-fade-up-1">
          Advanced Skincare / Est. 2026
        </div>

        <h1 className="font-serif font-normal text-[clamp(90px,14vw,210px)] max-mobile:text-[90px] leading-[.7] -tracking-[.06em] text-cream opacity-0 animate-title-in">
          Iris
          <span className="block text-rose italic ml-[9vw] max-mobile:ml-5">
            Pharma
          </span>
        </h1>

        <p className="max-w-[450px] max-mobile:mx-auto my-[55px] max-mobile:my-[45px] mb-[30px] max-mobile:mb-[25px] text-cream/75 text-[14px] leading-[1.8] opacity-0 animate-fade-up-2">
          Where pharmaceutical science meets the art of modern beauty.
          Thoughtfully created skincare for healthier, more radiant skin.
        </p>

        <div className="flex gap-3 max-mobile:justify-center opacity-0 animate-fade-up-3">
          <Button to="/shop">Shop Collection</Button>
          <Button
            to="/about"
            variant="light"
            className="border-cream! text-cream! hover:bg-cream! hover:text-brown!"
          >
            Discover Iris
          </Button>
        </div>
      </div>
    </section>
  );
}
