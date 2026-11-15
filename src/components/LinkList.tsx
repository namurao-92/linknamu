"use client";

import { useEffect, useState } from "react";
import { LinkCard } from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Props = {
  links: LinkItem[];
};

export function LinkList({ links }: Props) {
  // 데이터를 받기 전에는 모두 0회로 표시합니다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Record<string, number> } | null) => {
        if (cancelled || !data?.counts) return;
        // 응답 전까지 prev에는 그사이 누른 클릭 수만 들어 있으므로, 서버 값에 더해 줍니다.
        const server = data.counts;
        setCounts((prev) => {
          const next = { ...server };
          for (const [id, n] of Object.entries(prev)) next[id] = (next[id] ?? 0) + n;
          return next;
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const increment = (id: string) => setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  return (
    <ul className="mt-10 flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            id={link.id}
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onRecorded={() => increment(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
