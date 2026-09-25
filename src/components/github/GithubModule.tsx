import ActivityList from "@/components/github/ActivityList";
import Heatmap from "@/components/github/Heatmap";
import Skeleton from "@/components/github/Skeleton";
import StatsStrip from "@/components/github/StatsStrip";
import { useGithub } from "@/lib/github";

/** Live GitHub module (03 s5.3). Lazy-loaded from Home; never blocks the page. */
export default function GithubModule() {
  const { data, loading } = useGithub();
  if (loading) return <Skeleton />;
  if (!data) {
    return (
      <p className="gh-error">
        GitHub is not answering. Try{" "}
        <a href="https://github.com/mesanand" target="_blank" rel="noopener noreferrer">
          github.com/mesanand
        </a>
        .
      </p>
    );
  }
  return (
    <div className="gh">
      <Heatmap weeks={data.calendar.weeks} total={data.calendar.total} />
      <StatsStrip stats={data.stats} />
      <ActivityList events={data.events} />
    </div>
  );
}
