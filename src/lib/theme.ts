export function getCurrentTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";

  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "light" ? "light" : "dark";
}

export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);

  return next;
}
