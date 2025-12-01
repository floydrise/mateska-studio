import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import Header from "../components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <HeadContent />
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
});
