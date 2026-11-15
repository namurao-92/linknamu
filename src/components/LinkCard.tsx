"use client";

type Props = {
  id: string;
  title: string;
  url: string;
  count: number;
  /** 클릭이 기록될 때 호출됩니다 (화면의 숫자를 바로 올리는 용도). */
  onRecorded?: () => void;
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

export function LinkCard({ id, title, url, count, onRecorded }: Props) {
  // mailto: 링크는 메일 앱을 여는 것이라 새 탭을 띄우면 빈 탭만 남습니다.
  const opensNewTab = !url.startsWith("mailto:");

  const handleClick = () => {
    recordClick(id);
    onRecorded?.();
  };

  return (
    <a
      href={url}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      onAuxClick={(e) => e.button === 1 && handleClick()}
      className="relative block w-full rounded-3xl border border-white/70 bg-white/45 px-6 py-[18px] text-center text-[15px] font-semibold text-stone-800 shadow-[0_4px_20px_-6px_rgb(160_90_50/0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-8px_rgb(160_90_50/0.25)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-400 dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:shadow-[0_4px_20px_-6px_rgb(0_0_0/0.5)] dark:hover:bg-white/10"
    >
      {/* 제목은 가운데 유지, 클릭 수는 오른쪽 끝에 작게 */}
      <span className="block px-12">{title}</span>
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-medium tabular-nums text-stone-400 dark:text-stone-500">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
