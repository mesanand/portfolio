import BracketButton from "@/components/BracketButton";
import Eyebrow from "@/components/Eyebrow";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="not-found" labelledBy="not-found-title">
      <Eyebrow>404</Eyebrow>
      <h1 id="not-found-title" className="not-found__title">
        Nothing at this address.
      </h1>
      <BracketButton href="/">Home</BracketButton>
    </Section>
  );
}
