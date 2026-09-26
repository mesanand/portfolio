/** Primary navigation, shared by the header, phone menu, and footer. */
export interface NavItem {
  label: string;
  to: string;
  /**
   * Served by another app (Vercel rewrite), not this SPA: render a plain
   * <a href> so the browser does a full page load and React Router never
   * intercepts it.
   */
  external?: true;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "WORK", to: "/work" },
  { label: "PROJECTS", to: "/projects" },
  { label: "LEADERSHIP", to: "/leadership" },
  { label: "HIGHLIGHTS", to: "/highlights" },
  // The Tower (separate Vercel project), proxied at mehr-anand.com/network by vercel.json.
  { label: "NETWORK", to: "/network", external: true },
];
