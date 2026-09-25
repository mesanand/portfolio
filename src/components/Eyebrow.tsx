import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
}

/** Small mono uppercase label. Never a heading. */
export default function Eyebrow({ children, as: Tag = "p", className }: EyebrowProps) {
  return <Tag className={className ? `eyebrow ${className}` : "eyebrow"}>{children}</Tag>;
}
