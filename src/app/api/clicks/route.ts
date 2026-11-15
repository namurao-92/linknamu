import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

const validIds = new Set(profile.links.map((l) => l.id));

/** DB 오류를 Vercel 로그에 남기고, 응답에는 오류 종류(예: MongoServerSelectionError)만 담습니다. */
function dbError(err: unknown) {
  console.error("[api/clicks] DB 오류:", err);
  const kind = err instanceof Error ? err.name : "UnknownError";
  return NextResponse.json({ error: "DB 연결 실패", kind }, { status: 500 });
}

/** 모든 링크의 클릭 수를 한 번에 반환합니다. 예: { counts: { github: 42, blog: 3, email: 0 } } */
export async function GET() {
  try {
    return await getCounts();
  } catch (err) {
    return dbError(err);
  }
}

async function getCounts() {
  const db = await getDb();
  if (!db) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않음" }, { status: 503 });
  }

  const docs = await db
    .collection<{ linkId: string; count: number }>("clicks")
    .find({ linkId: { $in: [...validIds] } }, { projection: { _id: 0, linkId: 1, count: 1 } })
    .toArray();

  const counts: Record<string, number> = Object.fromEntries([...validIds].map((id) => [id, 0]));
  for (const doc of docs) counts[doc.linkId] = doc.count ?? 0;

  return NextResponse.json({ counts }, { headers: { "Cache-Control": "no-store" } });
}

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

  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "MONGODB_URI가 설정되지 않음" }, { status: 503 });
    }

    await db.collection("clicks").updateOne(
      { linkId },
      { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
      { upsert: true },
    );
  } catch (err) {
    return dbError(err);
  }

  return NextResponse.json({ ok: true });
}
