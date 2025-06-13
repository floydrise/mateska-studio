import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Header from "../components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
      <TanStackRouterDevtools />
    </div>
  ),
});
