import { Link } from "react-router-dom";
import type { JournalArticle } from "../../types";
import { Reveal } from "../common/Reveal";

export function ArticleCard({ article }: { article: JournalArticle }) {
  return (
    <Reveal as="article" className="group">
      <Link to={`/journal/${article.id}`}>
        <div className="h-[340px] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
          />
        </div>

        <div className="text-[8px] uppercase tracking-[.18em] text-brown-light mt-[18px]">
          {article.meta}
        </div>

        <h3 className="font-serif text-[32px] leading-[1] font-medium mt-[10px]">
          {article.title}
        </h3>

        <p className="text-[12px] text-brown-light leading-[1.6] mt-[10px]">
          {article.excerpt}
        </p>
      </Link>
    </Reveal>
  );
}
