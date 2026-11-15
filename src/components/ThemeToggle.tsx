"use client";

export function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="다크모드 전환"
      className="flex size-10 items-center justify-center rounded-full border border-stone-200 bg-white text-lg shadow-sm transition hover:scale-105 dark:border-stone-800 dark:bg-stone-900"
    >
      <span className="dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  );
}
