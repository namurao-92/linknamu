"use client";

type Props = {
  id: string;
  title: string;
  url: string;
};

function recordClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  // 새 탭이 열리거나 페이지가 이동해도 전송이 끊기지 않도록 sendBeacon을 우선 사용합니다.
  const sent =
    typeof navigator.sendBeacon === "function" &&
    navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
  if (!sent) {
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

export function LinkCard({ id, title, url }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(id)}
      onAuxClick={(e) => e.button === 1 && recordClick(id)}
      className="block w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-500"
    >
      {title}
    </a>
  );
}
