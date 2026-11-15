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
      className="flex size-10 items-center justify-center rounded-full border border-white/70 bg-white/45 text-base shadow-[0_4px_16px_-6px_rgb(160_90_50/0.2)] backdrop-blur-xl transition duration-300 hover:bg-white/65 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <span className="dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  );
}
