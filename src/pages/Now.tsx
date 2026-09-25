import Section, { SectionHead } from "@/components/Section";

export default function Now() {
  return (
    <Section labelledBy="now-title">
      <SectionHead eyebrow="// NOW" title="Now" level={1} id="now-title" />
    </Section>
  );
}
