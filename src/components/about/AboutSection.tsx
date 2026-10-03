import { SectionLabel } from "../common/SectionLabel";
import { Reveal } from "../common/Reveal";
import { Button } from "../common/Button";

export function AboutSection() {
  return (
    <section className="grid grid-cols-2 max-tablet:grid-cols-1 bg-cream-dark">
      <Reveal as="div" className="h-[640px] max-tablet:h-[440px] overflow-hidden">
        <video
          src="/gloying_skin_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </Reveal>

      <Reveal
        as="div"
        className="flex flex-col justify-center px-[6vw] max-tablet:px-[7vw] py-[80px]"
      >
        <SectionLabel>About Iris Pharma</SectionLabel>

        <h2 className="font-serif text-[clamp(38px,4.5vw,58px)] font-normal leading-[1] -tracking-[.03em] mt-[20px]">
          Formulated with purpose,
          <br />
          worn with <em className="italic text-rose-dark">confidence.</em>
        </h2>

        <p className="max-w-[440px] mt-[25px] text-brown-light text-[14px] leading-[1.8]">
          Iris Pharma was founded on a simple belief: skincare should be
          effective without being complicated. We blend pharmaceutical-grade
          science with honest ingredients to create rituals that fit real
          life — not just the shelf.
        </p>

        <p className="max-w-[440px] mt-[18px] text-brown-light text-[14px] leading-[1.8]">
          Every formula is tested, refined and made to last — because real
          results come from consistency, not noise.
        </p>

        <div className="mt-[35px]">
          <Button to="/shop" variant="light">
            Shop Collection
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
