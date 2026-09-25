import { m as motion, useReducedMotion, type Transition } from "motion/react";
import AsciiMark from "@/components/AsciiMark";
import BracketButton from "@/components/BracketButton";
import { site } from "@/content/site";

const EASE: Transition["ease"] = [0.2, 0.8, 0.2, 1];

/** Home hero (02 s5.11). The only centered block on the site. */
export default function Hero() {
  const reduce = useReducedMotion();

  // Mark fades in over 0.8s; subline, where-list, buttons follow, staggered 0.1s (02 s6).
  // The text starts while the mark is still fading so it is not held back as the LCP element.
  const rise = (i: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, ease: EASE, delay: 0.2 + i * 0.1 },
        };

  return (
    <section className="hero bleed" aria-labelledby="hero-title">
      <div className="hero__inner container">
        <motion.h1
          id="hero-title"
          className="hero__mark"
          {...(reduce
            ? { initial: false }
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.8, ease: EASE },
              })}
        >
          <AsciiMark />
        </motion.h1>
        <motion.p className="hero__subline" {...rise(0)}>
          {site.tagline}
        </motion.p>
        <motion.p className="hero__where" {...rise(1)}>
          {site.whereList.join(" · ")}
        </motion.p>
        <motion.div className="btn-row hero__actions" {...rise(2)}>
          <BracketButton href="/work">See the work</BracketButton>
          <BracketButton href="/now" variant="secondary">
            What I&rsquo;m doing now
          </BracketButton>
        </motion.div>
      </div>
    </section>
  );
}
