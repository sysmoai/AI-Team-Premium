import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { ServicesPage } from "./components/ServicesPage";
import { BrandPage } from "./components/BrandPage";
import { ContactPage } from "./components/ContactPage";
import { RedirectToBrand, RedirectToHome } from "./components/RedirectToBrand";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "services", Component: ServicesPage },
      { path: "brand", Component: BrandPage },
      { path: "contact", Component: ContactPage },
      // Legacy redirects
      { path: "final", Component: RedirectToBrand },
      { path: "colors", Component: RedirectToBrand },
      { path: "guidelines", Component: RedirectToBrand },
      // Catch-all
      { path: "*", Component: RedirectToHome },
    ],
  },
]);
