import { useSearchParams } from "react-router";
import ProjectCell from "@/components/ProjectCell";
import Section, { SectionHead } from "@/components/Section";
import { PROJECT_TAGS, projects, type ProjectTag } from "@/content";

const pad = (n: number) => String(n).padStart(2, "0");

// Only tags that at least one project uses, in display order.
const TAGS = PROJECT_TAGS.filter((t) => projects.some((p) => p.tags.includes(t)));
const isTag = (v: string | null): v is ProjectTag => TAGS.includes(v as ProjectTag);

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("tag");
  const active = isTag(raw) ? raw : null;
  const shown = active ? projects.filter((p) => p.tags.includes(active)) : projects;

  const select = (tag: ProjectTag | null) => {
    const next = new URLSearchParams(params);
    if (tag) next.set("tag", tag);
    else next.delete("tag");
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <Section labelledBy="projects-title">
      <SectionHead
        eyebrow="// PROJECTS"
        title="Projects"
        level={1}
        id="projects-title"
        lede="Hackathon builds, side projects, and things I made because the existing thing annoyed me."
      />
      <div className="filters" role="group" aria-label="Filter projects by tag">
        <button
          type="button"
          className="filter-btn"
          aria-pressed={active === null}
          onClick={() => select(null)}
        >
          All
        </button>
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className="filter-btn"
            aria-pressed={active === tag}
            onClick={() => select(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {`Showing ${shown.length} of ${projects.length} projects`}
      </p>
      <div className="cells">
        {shown.map((p) => (
          <ProjectCell
            key={p.id}
            project={p}
            index={pad(projects.indexOf(p) + 1)}
            headingLevel={2}
          />
        ))}
      </div>
    </Section>
  );
}
