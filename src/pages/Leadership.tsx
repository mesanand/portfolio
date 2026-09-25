import RoleCell from "@/components/RoleCell";
import RoleLine from "@/components/RoleLine";
import Section, { SectionHead } from "@/components/Section";
import { honors, leadership } from "@/content";
import type { Role } from "@/content/schemas";
import { formatRange } from "@/lib/dates";

const headline = leadership.filter((r) => r.tier === "headline");
const supporting = leadership.filter((r) => r.tier === "supporting");
const archive = leadership.filter((r) => r.tier === "archive");

const ERAS = [
  { era: "neu-boston", label: "BOSTON" },
  { era: "neu-oakland", label: "OAKLAND" },
] as const;

const line = (r: Role) => (
  <RoleLine
    key={r.id}
    date={formatRange(r.start, r.end)}
    title={`${r.org}, ${r.role}`}
    summary={r.summary}
    href={r.orgUrl}
  />
);

export default function Leadership() {
  return (
    <Section labelledBy="leadership-title">
      <SectionHead
        eyebrow="// LEADERSHIP"
        title="Leadership"
        level={1}
        id="leadership-title"
        // TODO(mehr): "Eight so far" counts founder/co-founder roles in leadership.ts (CBC, four at
        // Oakland, three in high school). 07 dropped the club count from the about strip; confirm or cut.
        lede="I start things, systematize them, and hand them off. Eight so far."
      />

      <section className="lead-group" aria-labelledby="lead-now">
        <h2 id="lead-now" className="group-label">
          NOW
        </h2>
        <div className="cells">
          {headline.map((r, i) => (
            <RoleCell key={r.id} role={r} index={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </section>

      <section className="lead-group" aria-labelledby="lead-honors">
        <h2 id="lead-honors" className="group-label">
          HONORS
        </h2>
        <ul className="role-lines" role="list">
          {honors.map((h) => (
            <RoleLine
              key={h.title}
              date={String(h.year)}
              title={h.title}
              summary={h.body}
              href={h.url}
            />
          ))}
        </ul>
      </section>

      <section className="lead-group" aria-labelledby="lead-previously">
        <h2 id="lead-previously" className="group-label">
          PREVIOUSLY
        </h2>
        {ERAS.map(({ era, label }) => {
          const rows = supporting.filter((r) => r.era === era);
          if (rows.length === 0) return null;
          return (
            <div key={era} className="lead-era">
              <h3 className="era-label">{label}</h3>
              <ul className="role-lines" role="list">
                {rows.map(line)}
              </ul>
            </div>
          );
        })}
      </section>

      {archive.length > 0 && (
        <details className="lead-archive">
          <summary className="lead-archive__summary">High school, 2021 to 2023</summary>
          <ul className="role-lines" role="list">
            {archive.map(line)}
          </ul>
        </details>
      )}
    </Section>
  );
}
