import { lazy, Suspense } from "react";
import AsciiDivider from "@/components/AsciiDivider";
import BracketButton from "@/components/BracketButton";
import ExperienceRow from "@/components/ExperienceRow";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import GithubSkeleton from "@/components/github/Skeleton";
import LinkCard from "@/components/LinkCard";
import ProjectCell from "@/components/ProjectCell";
import Section, { SectionHead } from "@/components/Section";
import { experience, highlights, projects } from "@/content";
import headshotAvif from "@/assets/headshot.jpg?w=320;560;840&format=avif&as=srcset";
import headshotWebpSet from "@/assets/headshot.jpg?w=320;560;840&format=webp&as=srcset";
import headshotFallback from "@/assets/headshot.jpg?w=560&format=webp";
import { site } from "@/content/site";

// Separate chunk: the heatmap code only loads with Home, after first paint.
const GithubModule = lazy(() => import("@/components/github/GithubModule"));

const featuredWork = experience.filter((e) => e.featured);
const featuredProjects = projects.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      <Hero />
      <AsciiDivider seed={1984} />

      <Section id="highlights" labelledBy="home-highlights">
        <SectionHead eyebrow="// HIGHLIGHTS" title="Highlights" id="home-highlights" />
        <Highlights items={highlights} />
      </Section>

      <Section id="work" labelledBy="home-work">
        <SectionHead eyebrow="// WORK" title="Selected work" id="home-work" />
        <div className="about">
          <picture className="about__headshot">
            <source
              type="image/avif"
              srcSet={headshotAvif}
              sizes="(min-width: 640px) 280px, 200px"
            />
            <source
              type="image/webp"
              srcSet={headshotWebpSet}
              sizes="(min-width: 640px) 280px, 200px"
            />
            <img
              src={headshotFallback}
              alt="Mehr Anand"
              width={280}
              height={280}
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
        <SectionHead
          eyebrow="// GITHUB"
          title="Commits, in public"
          id="home-github"
          lede="Live from github.com/mesanand, refreshed every 15 minutes."
        />
        <Suspense fallback={<GithubSkeleton />}>
          <GithubModule />
        </Suspense>
        <div className="section-foot">
          <BracketButton href="https://github.com/mesanand">Profile</BracketButton>
        </div>
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
