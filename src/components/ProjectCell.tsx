import { m, useReducedMotion } from "motion/react";
import BracketButton from "@/components/BracketButton";
import Chip from "@/components/Chip";
import FactList, { type Fact } from "@/components/FactList";
import type { Project } from "@/content/schemas";

const LINK_ORDER = [
  ["repo", "Code"],
  ["demo", "Live"],
  ["devpost", "Devpost"],
  ["video", "Video"],
] as const;

interface ProjectCellProps {
  project: Project;
  /** Two-digit label, e.g. "01". */
  index: string;
  headingLevel?: 2 | 3;
}

/** Ruled grid cell for a project (02 s5.5). */
export default function ProjectCell({ project, index, headingLevel = 3 }: ProjectCellProps) {
  const reduce = useReducedMotion();
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const links = LINK_ORDER.flatMap(([key, label]) => {
    const href = project.links[key];
    return href ? [{ href, label }] : [];
  }).slice(0, 2);

  const facts: Fact[] = [
    { key: "Built", value: project.year },
    ...(project.outcome ? [{ key: "Outcome", value: project.outcome }] : []),
    ...(project.stack.length
      ? [
          {
            key: "Stack",
            value: (
              <ul className="chips" role="list">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
  ];

  return (
    <m.article className="cell" layout={reduce ? false : "position"}>
      <p className="cell__index" aria-hidden="true">
        {index}
      </p>
      <div className="cell__head">
        <Heading className="cell__title">{project.name}</Heading>
        <p className="cell__sub">{project.tagline}</p>
      </div>
      <p className="cell__desc">{project.description}</p>
      <FactList facts={facts} />
      <div className="cell__foot">
        <ul className="chips" role="list" aria-label="Tags">
          {project.tags.map((t) => (
            <li key={t}>
              <Chip variant={t === "hackathon" ? "accent" : "default"}>{t}</Chip>
            </li>
          ))}
        </ul>
        {links.length > 0 && (
          <div className="cell__links">
            {links.map((l) => (
              <BracketButton
                key={l.href}
                href={l.href}
                size="sm"
                aria-label={`${l.label}: ${project.name} (opens in a new tab)`}
              >
                {l.label}
              </BracketButton>
            ))}
          </div>
        )}
      </div>
    </m.article>
  );
}
