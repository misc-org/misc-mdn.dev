import { persistentAtom } from "@nanostores/persistent";
import { getLocalStorageKey } from "$lib/utils/consts";
import type { ThemeMode } from "$lib/utils/types/ui";

export const atomThemeMode = persistentAtom<ThemeMode>(
  getLocalStorageKey("theme-mode"),
  "system",
);

atomThemeMode.listen((themeMode) => {
  if (themeMode === "system") {
    themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.documentElement.setAttribute("data-theme", themeMode);
});
