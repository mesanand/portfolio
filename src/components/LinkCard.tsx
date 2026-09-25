import { Briefcase, Calendar, GitBranch, Mail, type LucideIcon } from "lucide-react";
import type { SocialIcon } from "@/content/site";

const ICONS: Record<SocialIcon, LucideIcon> = {
  github: GitBranch,
  linkedin: Briefcase,
  mail: Mail,
  calendar: Calendar,
};

interface LinkCardProps {
  icon: SocialIcon;
  title: string;
  subtitle: string;
  href: string;
}

/** Dashed card linking out (02 s5.4). */
export default function LinkCard({ icon, title, subtitle, href }: LinkCardProps) {
  const Icon = ICONS[icon];
  const external = /^https?:\/\//.test(href);
  return (
    <a
      className="link-card"
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <Icon className="link-card__icon" size={20} strokeWidth={1.5} aria-hidden="true" />
      <span className="link-card__text">
        <span className="link-card__title">{title}</span>
        <span className="link-card__subtitle">{subtitle}</span>
      </span>
      <span className="link-card__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
