import HighlightCard from "@/components/HighlightCard";
import Section, { SectionHead } from "@/components/Section";
import { highlights } from "@/content";

export default function Highlights() {
  return (
    <Section labelledBy="highlights-title">
      <SectionHead
        eyebrow="// HIGHLIGHTS"
        title="Highlights"
        level={1}
        id="highlights-title"
        lede="Articles, posts, and photos: press from Northeastern and things I've written."
      />
      <ul className="press-grid" role="list">
        {highlights.map((h) => (
          <HighlightCard key={h.id} item={h} headingLevel={2} />
        ))}
      </ul>
    </Section>
  );
}
