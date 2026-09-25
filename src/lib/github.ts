import { useEffect, useState } from "react";
import type { GithubPayload } from "@/lib/github-types";

const TIMEOUT_MS = 12_000;

export interface GithubState {
  data: GithubPayload | null;
  error: string | null;
  loading: boolean;
}

// One fetch per page session; revisiting Home reuses it.
let cache: GithubPayload | null = null;

/** Fetches /api/github once, with a 12 s timeout; aborts on unmount. */
export function useGithub(): GithubState {
  const [state, setState] = useState<GithubState>(() =>
    cache
      ? { data: cache, error: null, loading: false }
      : { data: null, error: null, loading: true },
  );

  useEffect(() => {
    if (cache) return;
    const controller = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, TIMEOUT_MS);

    fetch("/api/github", { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as GithubPayload;
        if (!data?.calendar?.weeks) throw new Error("Malformed payload");
        cache = data;
        setState({ data, error: null, loading: false });
      })
      .catch((err: unknown) => {
        // An unmount abort is not an error; a timeout is.
        if (controller.signal.aborted && !timedOut) return;
        setState({
          data: null,
          error: timedOut ? "timeout" : err instanceof Error ? err.message : String(err),
          loading: false,
        });
      })
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return state;
}
