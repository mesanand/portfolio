import { createBrowserRouter } from "react-router";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import Projects from "@/pages/Projects";
import Leadership from "@/pages/Leadership";
import Now from "@/pages/Now";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/work", element: <Work /> },
  { path: "/projects", element: <Projects /> },
  { path: "/leadership", element: <Leadership /> },
  { path: "/now", element: <Now /> },
  { path: "*", element: <NotFound /> },
]);
