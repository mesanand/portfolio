import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router";
import { AnimatePresence, m as motion, useReducedMotion } from "motion/react";
import BracketButton from "@/components/BracketButton";
import { site } from "@/content/site";
import { NAV_ITEMS } from "@/lib/nav";

const SCROLL_THRESHOLD = 40;

export function Wordmark({ className }: { className?: string }) {
  const [first, second] = site.wordmark;
  return (
    <Link
      to="/"
      className={className ? `wordmark ${className}` : "wordmark"}
      aria-label={`${site.name}, home`}
    >
      <span>{first}</span> <span className="wordmark__accent">{second}</span>
    </Link>
  );
}

function useScrolledPast(threshold: number) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > threshold,
  );
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > threshold);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [threshold]);
  return scrolled;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface MenuOverlayProps {
  onClose: () => void;
}

function MenuOverlay({ onClose }: MenuOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Focus the first link, trap Tab inside the dialog, close on Escape, lock body scroll.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusables = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const list = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.04 } },
  };
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } };

  return (
    <motion.div
      ref={dialogRef}
      id="site-menu"
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
    >
      <div className="container menu-overlay__bar">
        <Wordmark />
        <BracketButton size="sm" onClick={onClose}>
          Close
        </BracketButton>
      </div>
      <nav className="container" aria-label="Primary">
        <motion.ul
          className="menu-overlay__list"
          role="list"
          variants={list}
          initial="hidden"
          animate="show"
        >
          {NAV_ITEMS.map(({ label, to }) => (
            <motion.li key={to} variants={item}>
              <NavLink to={to} className="menu-overlay__link" onClick={onClose}>
                {label}
              </NavLink>
            </motion.li>
          ))}
          <motion.li variants={item} className="menu-overlay__resume">
            <BracketButton href={site.resumeUrl} newTab>
              Resume
            </BracketButton>
          </motion.li>
        </motion.ul>
      </nav>
    </motion.div>
  );
}

/** Sticky site header (02 s5.1). */
export default function Header() {
  const scrolled = useScrolledPast(SCROLL_THRESHOLD);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container site-header__inner">
        <Wordmark />
        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list" role="list">
            {NAV_ITEMS.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} className="nav-link">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <BracketButton href={site.resumeUrl} newTab size="sm">
            Resume
          </BracketButton>
        </nav>
        <BracketButton
          ref={menuButtonRef}
          size="sm"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-haspopup="dialog"
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </BracketButton>
      </div>
      {createPortal(
        <AnimatePresence>{menuOpen && <MenuOverlay onClose={closeMenu} />}</AnimatePresence>,
        document.body,
      )}
    </header>
  );
}
