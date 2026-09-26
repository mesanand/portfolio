import { createBrowserRouter } from "react-router";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import Projects from "@/pages/Projects";
import Leadership from "@/pages/Leadership";
import Highlights from "@/pages/Highlights";
import Network from "@/pages/Network";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/work", element: <Work /> },
      { path: "/projects", element: <Projects /> },
      { path: "/leadership", element: <Leadership /> },
      { path: "/highlights", element: <Highlights /> },
      { path: "/network", element: <Network /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
