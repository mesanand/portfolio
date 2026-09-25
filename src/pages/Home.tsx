import AsciiDivider from "@/components/AsciiDivider";
import BracketButton from "@/components/BracketButton";
import ExperienceRow from "@/components/ExperienceRow";
import Hero from "@/components/Hero";
import LinkCard from "@/components/LinkCard";
import Section, { SectionHead } from "@/components/Section";
import { experience } from "@/content";
import { site } from "@/content/site";

const featuredWork = experience.filter((e) => e.featured);

export default function Home() {
  return (
    <>
      <Hero />
      <AsciiDivider seed={1984} />

      <Section id="now" labelledBy="home-now">
        <SectionHead eyebrow="// NOW" title="What I'm doing this month" id="home-now" />
      </Section>

      <Section id="work" labelledBy="home-work">
        <SectionHead eyebrow="// WORK" title="Selected work" id="home-work" />
        <div className="about">
          {/* Headshot slot; prompt 11 adds the image. */}
          <div className="about__headshot" aria-hidden="true" />
          <p className="about__text">{site.about}</p>
        </div>
        <div className="xp-list">
          {featuredWork.map((e) => (
            <ExperienceRow key={e.id} entry={e} compact />
          ))}
        </div>
        <div className="section-foot">
          <BracketButton href="/work">Full history</BracketButton>
        </div>
      </Section>

      <Section id="github" labelledBy="home-github">
        <SectionHead eyebrow="// GITHUB" title="Commits, in public" id="home-github" />
      </Section>

      <Section id="projects" labelledBy="home-projects">
        <SectionHead eyebrow="// PROJECTS" title="Projects" id="home-projects" />
      </Section>

      <Section id="elsewhere" labelledBy="home-elsewhere">
        <SectionHead eyebrow="// ELSEWHERE" title="Elsewhere" id="home-elsewhere" />
        <div className="link-cards">
          {site.socials.map((s) => (
            <LinkCard key={s.url} icon={s.icon} title={s.label} subtitle={s.handle} href={s.url} />
          ))}
        </div>
      </Section>

      <AsciiDivider seed={2027} />
    </>
  );
}
