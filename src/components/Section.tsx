import type { ReactNode } from "react";
import Eyebrow from "@/components/Eyebrow";

interface SectionProps {
  id?: string;
  /** id of the heading that names this section. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

/** A page section: container width plus vertical rhythm (02 s4.2). */
export default function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={className ? `section ${className}` : "section"}
    >
      <div className="container">{children}</div>
    </section>
  );
}

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  /** Two-character accent prefix such as "01". */
  index?: string;
  /** 1 for page titles, 2 for sections within a page. */
  level?: 1 | 2;
  /** id for the heading, so the section can reference it. */
  id?: string;
  /** Optional actions row under the lede (e.g. an RSS link). */
  children?: ReactNode;
}

/** Eyebrow + heading + optional lede (02 s5.3). */
export function SectionHead({
  eyebrow,
  title,
  lede,
  index,
  level = 2,
  id,
  children,
}: SectionHeadProps) {
  const Heading = level === 1 ? "h1" : "h2";
  // "// NOW" renders its "//" in the accent, like an index prefix.
  const slash = eyebrow.startsWith("// ");
  const prefix = index ?? (slash ? "//" : null);
  const label = slash ? eyebrow.slice(3) : eyebrow;

  return (
    <div className="section-head">
      <Eyebrow>
        {prefix && <span className="section-head__prefix">{prefix} </span>}
        {label}
      </Eyebrow>
      <Heading
        id={id}
        className={
          level === 1 ? "section-head__title section-head__title--page" : "section-head__title"
        }
      >
        {title}
      </Heading>
      {lede && <p className="section-head__lede">{lede}</p>}
      {children && <div className="section-head__actions">{children}</div>}
    </div>
  );
}
