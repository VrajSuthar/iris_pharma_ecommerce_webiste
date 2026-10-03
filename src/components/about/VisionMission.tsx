import { SectionLabel } from "../common/SectionLabel";
import { Reveal } from "../common/Reveal";

export function VisionMission() {
  return (
    <section>
      <div className="grid grid-cols-2 max-tablet:grid-cols-1">
        <Reveal as="div" className="h-[560px] max-tablet:h-[380px] overflow-hidden">
          <img
            src="/vision.jpg"
            alt="Iris Pharma vision"
            className="w-full h-full object-cover"
          />
        </Reveal>

        <Reveal
          as="div"
          className="flex flex-col justify-center px-[6vw] max-tablet:px-[7vw] py-[70px] bg-white-warm"
        >
          <SectionLabel>Our Vision</SectionLabel>
          <h3 className="font-serif text-[clamp(34px,4vw,50px)] font-normal leading-[1.05] -tracking-[.03em] mt-[20px]">
            Beauty <em className="italic text-rose-dark">without barriers.</em>
          </h3>
          <p className="max-w-[420px] mt-[20px] text-brown-light text-[14px] leading-[1.8]">
            A world where effective, honest skincare isn't a luxury reserved
            for the few — where everyone has access to formulas that
            actually work, without compromise or confusion.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 max-tablet:grid-cols-1">
        <Reveal
          as="div"
          className="flex flex-col justify-center px-[6vw] max-tablet:px-[7vw] py-[70px] bg-cream-dark max-tablet:order-2"
        >
          <SectionLabel>Our Mission</SectionLabel>
          <h3 className="font-serif text-[clamp(34px,4vw,50px)] font-normal leading-[1.05] -tracking-[.03em] mt-[20px]">
            Science you can <em className="italic text-rose-dark">trust.</em>
          </h3>
          <p className="max-w-[420px] mt-[20px] text-brown-light text-[14px] leading-[1.8]">
            To formulate pharmaceutical-grade skincare that performs —
            blending research-backed ingredients with honest simplicity, so
            every ritual delivers real, visible results.
          </p>
        </Reveal>

        <Reveal
          as="div"
          className="h-[560px] max-tablet:h-[380px] overflow-hidden max-tablet:order-1"
        >
          <img
            src="/mission.jpg"
            alt="Iris Pharma mission"
            className="w-full h-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
