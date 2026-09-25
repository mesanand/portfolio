import AsciiDivider from "@/components/AsciiDivider";
import BracketButton from "@/components/BracketButton";
import ExperienceRow from "@/components/ExperienceRow";
import Hero from "@/components/Hero";
import LinkCard from "@/components/LinkCard";
import ProjectCell from "@/components/ProjectCell";
import Section, { SectionHead } from "@/components/Section";
import { experience, projects } from "@/content";
import headshotAvif from "@/assets/headshot.jpg?w=320;480&format=avif&as=srcset";
import headshotWebpSet from "@/assets/headshot.jpg?w=320;480&format=webp&as=srcset";
import headshotFallback from "@/assets/headshot.jpg?w=320&format=webp";
import { site } from "@/content/site";

const featuredWork = experience.filter((e) => e.featured);
const featuredProjects = projects.filter((p) => p.featured);

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
          <picture className="about__headshot">
            <source type="image/avif" srcSet={headshotAvif} sizes="160px" />
            <source type="image/webp" srcSet={headshotWebpSet} sizes="160px" />
            <img
              src={headshotFallback}
              alt="Mehr Anand"
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
            />
          </picture>
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
        <div className="cells">
          {featuredProjects.map((p, i) => (
            <ProjectCell key={p.id} project={p} index={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
        <div className="section-foot">
          <BracketButton href="/projects">All projects</BracketButton>
        </div>
      </Section>

      <Section id="elsewhere" labelledBy="home-elsewhere">
        <SectionHead eyebrow="// ELSEWHERE" title="Elsewhere" id="home-elsewhere" />
        <div className="link-cards">
          {site.socials.map((s) => (
            <LinkCard key={s.url} icon={s.icon} title={s.label} subtitle={s.handle} href={s.url} />
          ))}
        </div>
        {site.calendarUrl && (
          <div className="section-foot">
            <BracketButton href={site.calendarUrl}>Book time</BracketButton>
          </div>
        )}
      </Section>

      <AsciiDivider seed={2027} />
    </>
  );
}
