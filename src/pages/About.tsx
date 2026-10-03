import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { AboutSection } from "../components/about/AboutSection";
import { VisionMission } from "../components/about/VisionMission";
import { TrustStats } from "../components/about/TrustStats";

export function About() {
  return (
    <>
      <Reveal as="section" className="text-center px-[7vw] py-[180px] bg-white-warm">
        <SectionLabel>The Iris Philosophy</SectionLabel>

        <h2 className="max-w-[1100px] mx-auto mt-[30px] font-serif text-[clamp(48px,6vw,85px)] font-normal leading-[.95] -tracking-[.04em]">
          Skincare should be <em className="italic text-rose-dark">effective, elegant</em> and
          beautifully simple.
        </h2>
      </Reveal>

      <VisionMission />

      <TrustStats />

      <AboutSection />
    </>
  );
}
