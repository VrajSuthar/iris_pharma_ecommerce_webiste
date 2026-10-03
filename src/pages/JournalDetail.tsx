import { useParams } from "react-router-dom";
import { journalArticles } from "../data/journal";
import { Reveal } from "../components/common/Reveal";
import { Button } from "../components/common/Button";
import { NotFound } from "./NotFound";

export function JournalDetail() {
  const { id } = useParams<{ id: string }>();
  const article = journalArticles.find((item) => item.id === Number(id));

  if (!article) return <NotFound />;

  return (
    <article>
      <div className="h-[420px] max-mobile:h-[280px] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <Reveal
        as="div"
        className="max-w-[700px] mx-auto px-[7vw] max-mobile:px-[6vw] py-[100px] max-mobile:py-[70px]"
      >
        <div className="text-[9px] uppercase tracking-[.2em] text-rose-dark">
          {article.meta}
        </div>

        <h1 className="font-serif text-[clamp(40px,5vw,60px)] font-normal leading-[1.05] -tracking-[.03em] mt-[20px]">
          {article.title}
        </h1>

        <div className="flex flex-col gap-[20px] mt-[40px]">
          {article.body.map((paragraph, index) => (
            <p key={index} className="text-brown-light text-[14px] leading-[1.9]">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-[50px]">
          <Button to="/journal" variant="light">
            Back to Journal
          </Button>
        </div>
      </Reveal>
    </article>
  );
}
