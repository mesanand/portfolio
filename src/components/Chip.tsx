import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  variant?: "default" | "accent";
}

/** Pill tag (02 s5.8). The only rounded element on the site. */
export default function Chip({ children, variant = "default" }: ChipProps) {
  return <span className={variant === "accent" ? "chip chip--accent" : "chip"}>{children}</span>;
}
