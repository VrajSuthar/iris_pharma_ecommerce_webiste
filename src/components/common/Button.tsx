import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  variant?: "filled" | "light";
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
}

const BASE =
  "inline-block px-7 py-[15px] border border-brown text-[9px] uppercase tracking-[.18em] text-center transition-all duration-[350ms]";

const VARIANTS = {
  filled: "bg-brown text-white hover:bg-transparent hover:text-brown hover:-translate-y-[3px]",
  light: "bg-transparent text-brown hover:bg-brown hover:text-white",
};

export function Button({
  variant = "filled",
  to,
  onClick,
  type = "button",
  className = "",
  children,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
