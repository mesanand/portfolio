import ExperienceRow from "@/components/ExperienceRow";
import Section, { SectionHead } from "@/components/Section";
import { experience } from "@/content";
import { site } from "@/content/site";
import { firstSentences } from "@/lib/text";

const current = experience.filter((e) => e.end === "present");
const previous = experience.filter((e) => e.end !== "present");

export default function Work() {
  return (
    <Section labelledBy="work-title">
      <SectionHead
        eyebrow="// WORK"
        title="Work"
        level={1}
        id="work-title"
        lede={firstSentences(site.about, 2)}
      />
      {[
        { label: "NOW", id: "work-now", rows: current },
        { label: "PREVIOUSLY", id: "work-previously", rows: previous },
      ].map(
        (group) =>
          group.rows.length > 0 && (
            <section key={group.id} className="xp-group" aria-labelledby={group.id}>
              <h2 id={group.id} className="group-label">
                {group.label}
              </h2>
              <div className="xp-list">
                {group.rows.map((e) => (
                  <ExperienceRow key={e.id} entry={e} />
                ))}
              </div>
            </section>
          ),
      )}
    </Section>
  );
}
