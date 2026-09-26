import { NavLink } from "react-router";
import LinkCard from "@/components/LinkCard";
import { Wordmark } from "@/components/Header";
import { NAV_ITEMS } from "@/lib/nav";
import { site } from "@/content/site";

/** Site footer (02 s5.13). */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Wordmark />
            <p className="site-footer__bio">{site.tagline}</p>
          </div>
          <nav className="site-footer__nav" aria-label="Footer">
            <ul role="list">
              {NAV_ITEMS.map(({ label, to, external }) => (
                <li key={to}>
                  {external ? (
                    <a href={to} className="nav-link">
                      {label}
                    </a>
                  ) : (
                    <NavLink to={to} className="nav-link">
                      {label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="link-cards link-cards--stack">
            {site.socials.map((s) => (
              <LinkCard
                key={s.url}
                icon={s.icon}
                title={s.label}
                subtitle={s.handle}
                href={s.url}
              />
            ))}
          </div>
        </div>
        <p className="site-footer__meta">
          © {year} {site.name} · {site.footerTagline}
        </p>
      </div>
    </footer>
  );
}
