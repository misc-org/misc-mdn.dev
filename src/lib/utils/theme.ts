export type Theme = "light" | "dark" | "system";

// <html ... data-theme="dark">
export function switchTheme(theme: Theme): void {
  if (theme === "system") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  document.documentElement.setAttribute("data-theme", theme);
}
