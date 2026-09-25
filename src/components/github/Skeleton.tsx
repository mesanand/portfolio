/** Loading placeholder for the GitHub module: slow-pulsing blocks, never a spinner (02 s5.10). */
export default function Skeleton() {
  return (
    <div className="gh gh--loading" aria-busy="true" aria-label="Loading GitHub activity">
      <div className="gh-skel gh-skel--heatmap" />
      <div className="gh-skel-row">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="gh-skel gh-skel--stat" />
        ))}
      </div>
      <div className="gh-skel gh-skel--list" />
    </div>
  );
}
