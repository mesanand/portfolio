import type { ReactNode } from "react";

export interface Fact {
  key: string;
  value: ReactNode;
}

/** Key/value grid (02 s5.6): mono keys, sans values, dashed rule above. */
export default function FactList({ facts }: { facts: readonly Fact[] }) {
  if (facts.length === 0) return null;
  return (
    <dl className="facts">
      {facts.map(({ key, value }) => (
        <div key={key} className="facts__row">
          <dt className="facts__key">{key}</dt>
          <dd className="facts__value">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
