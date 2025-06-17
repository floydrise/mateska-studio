import { Link } from "@tanstack/react-router";
import studioLogoLight from "/logoLight.webp";
import studioLogoDark from "/logoDark.webp";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { DesktopNav } from "./DesktopNav";
import { useMediaQuery } from "usehooks-ts";
import { MobileNav } from "./MobileNav";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <header className="p-2 border sticky top-0 bg-background z-10">
      <nav className="flex flex-row justify-between items-center gap-2 w-full px-2">
        <Link to="/">
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            src={resolvedTheme === "dark" ? studioLogoDark : studioLogoLight}
            alt="App logo"
            className="size-20"
          />
        </Link>
        {isDesktop ? <DesktopNav /> : <MobileNav />}
      </nav>
    </header>
  );
}
