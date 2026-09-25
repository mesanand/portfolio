import Section, { SectionHead } from "@/components/Section";

export default function Home() {
  return (
    <Section labelledBy="home-title">
      <SectionHead eyebrow="// HOME" title="Home" level={1} id="home-title" />
    </Section>
  );
}
