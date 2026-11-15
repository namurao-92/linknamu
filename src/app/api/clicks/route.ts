import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

const validIds = new Set(profile.links.map((l) => l.id));

export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "존재하지 않는 링크" }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않음" }, { status: 503 });
  }

  await db.collection("clicks").updateOne(
    { linkId },
    { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
    { upsert: true },
  );

  return NextResponse.json({ ok: true });
}
