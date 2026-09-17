import { useEffect } from "react";
import { useFinanceStore } from "@/lib/store";

const THEME_CLASSES = ["theme-midnight", "theme-mint", "theme-lime", "theme-minimal", "theme-dark", "theme-ocean"];

/** Renders nothing — just keeps `<html>`'s theme class in sync with the store. */
export function ThemeEffect() {
  const theme = useFinanceStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...THEME_CLASSES);
    if (theme === "midnight") root.classList.add("theme-midnight");
    if (theme === "mint") root.classList.add("theme-mint");
    if (theme === "lime") root.classList.add("theme-lime");
    if (theme === "minimal") root.classList.add("theme-minimal");
    // Backward compatibility for stored values from older Hisab builds.
    if (theme === "dark") root.classList.add("theme-dark");
    if (theme === "ocean") root.classList.add("theme-ocean");

    const themeMeta = {
      midnight: "#5365ff",
      mint: "#173b33",
      lime: "#233e20",
      minimal: "#242a30",
      warm: "#2c4a3e",
      dark: "#7cb79c",
      ocean: "#1f5c73",
    } satisfies Record<typeof theme, string>;

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeMeta[theme]);
    root.style.colorScheme = theme === "midnight" || theme === "dark" ? "dark" : "light";
  }, [theme]);

  return null;
}
