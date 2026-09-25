import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { LazyMotion } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const loadMotionFeatures = () => import("@/lib/motion-features").then((m) => m.default);

/** Resets scroll on route change unless the URL targets an anchor. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Frame for every route: skip link, header, main, footer. */
export default function Layout() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {/* The /_vercel/* scripts only exist on Vercel; elsewhere they 404. */}
      {__ON_VERCEL__ && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </LazyMotion>
  );
}
