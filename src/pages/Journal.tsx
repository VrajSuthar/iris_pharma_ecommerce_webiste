import { journalArticles } from "../data/journal";
import { SectionLabel } from "../components/common/SectionLabel";
import { Reveal } from "../components/common/Reveal";
import { ArticleCard } from "../components/journal/ArticleCard";

export function Journal() {
  return (
    <section className="px-[5vw] max-mobile:px-[6vw] py-[140px] max-mobile:py-[100px]">
      <Reveal>
        <SectionLabel>Iris Journal</SectionLabel>
        <h2 className="font-serif text-[clamp(55px,7vw,95px)] leading-[.85] font-normal -tracking-[.05em] mt-[18px]">
          Beauty Notes
        </h2>
      </Reveal>

      <div className="grid grid-cols-3 max-mobile:grid-cols-1 gap-[25px] mt-[60px]">
        {journalArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
