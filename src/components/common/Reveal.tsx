import type { ElementType, ReactNode } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export function Reveal({ as: Tag = "div", className = "", children }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform] duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[60px]"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
