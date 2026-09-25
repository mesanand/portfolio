// Temporary type specimen (prompt 2). Prompt 3/4 replace this.
const TYPE_TOKENS = [
  { token: "hero", sample: "Mehr Anand", upper: false },
  { token: "h1", sample: "Page title", upper: false },
  { token: "h2", sample: "Section heading", upper: false },
  { token: "h3", sample: "Card title, role title", upper: false },
  { token: "lead", sample: "I build data pipelines and AI tooling for finance.", upper: false },
  { token: "body", sample: "Paragraph text in Funnel Sans at 16 over 24.", upper: false },
  { token: "body-sm", sample: "Card description text at 15 over 23.", upper: false },
  { token: "eyebrow", sample: "Section eyebrow", upper: true },
  { token: "label", sample: "Work Projects Leadership Now", upper: true },
  { token: "btn", sample: "See the work", upper: true },
  { token: "meta", sample: "2026-09-25 · a1b2c3d", upper: false },
  { token: "chip", sample: "Databricks", upper: true },
] as const;

const SWATCHES = [
  "ground",
  "surface",
  "surface-2",
  "line-soft",
  "chip-bg",
  "dash",
  "line",
  "ink-faint",
  "ink-body",
  "ink",
  "white",
  "accent",
] as const;

export default function Home() {
  return (
    <div className="container" style={{ paddingBlock: "var(--space-24)" }}>
      <h1 className="visually-hidden">Type specimen</h1>
      <div style={{ display: "grid", gap: "var(--space-8)" }}>
        {TYPE_TOKENS.map(({ token, sample, upper }) => (
          <div key={token} data-token={token}>
            <p className="eyebrow">--t-{token}</p>
            <p
              style={{
                font: `var(--t-${token})`,
                letterSpacing: `var(--ls-${token})`,
                color: "var(--ink)",
                textTransform: upper ? "uppercase" : "none",
              }}
            >
              {sample}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: "var(--space-2)",
          marginTop: "var(--space-12)",
        }}
      >
        {SWATCHES.map((name) => (
          <div key={name}>
            <div
              style={{
                height: "var(--space-12)",
                background: `var(--${name})`,
                border: "var(--rule-hair) solid var(--line-soft)",
              }}
            />
            <p className="eyebrow">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
