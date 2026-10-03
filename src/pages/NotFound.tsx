import { Button } from "../components/common/Button";

export function NotFound() {
  return (
    <section className="text-center px-[7vw] py-[180px]">
      <div className="text-[9px] uppercase tracking-[.3em] text-rose-dark">404</div>
      <h1 className="font-serif text-[clamp(48px,6vw,85px)] font-normal leading-[.95] -tracking-[.04em] mt-[30px]">
        Page not found
      </h1>
      <p className="max-w-[450px] mx-auto mt-[30px] text-brown-light text-[14px] leading-[1.8]">
        The page you're looking for doesn't exist.
      </p>
      <Button to="/" className="mt-[30px]">
        Back to Home
      </Button>
    </section>
  );
}
