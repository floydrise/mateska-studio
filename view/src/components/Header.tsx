import { Link } from "@tanstack/react-router";
import studioLogoLight from "/logoLight.webp";
import studioLogoDark from "/logoDark.webp";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTheme } from "next-themes";
import { DesktopNav } from "./DesktopNav";
import { useMediaQuery } from "usehooks-ts";
import { MobileNav } from "./MobileNav";
import { useState } from "react";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const previous = scrollY.getPrevious();
    if (latestValue > previous!) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-140%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.5,
      }}
      className="p-2 border sticky top-0 backdrop-blur-md bg-background/20 z-30"
    >
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
    </motion.header>
  );
}
