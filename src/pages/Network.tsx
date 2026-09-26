import BracketButton from "@/components/BracketButton";
import Section, { SectionHead } from "@/components/Section";
import { site } from "@/content/site";

/**
 * /network: the future home of Mehr's CRM ("The Tower") as a section of
 * mehr-anand.com. A placeholder until that is built.
 */
export default function Network() {
  return (
    <Section labelledBy="network-title">
      <SectionHead
        eyebrow="// MY NETWORK"
        title="My Network"
        level={1}
        id="network-title"
        lede="The people I build with, learn from, and owe favors to. This is where that network will live; it's under construction."
      >
        {site.calendarUrl && <BracketButton href={site.calendarUrl}>Book time</BracketButton>}
      </SectionHead>
    </Section>
  );
}
