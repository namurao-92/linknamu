import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 중 핫 리로드마다 새 연결이 생기지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 없으면 null을 반환합니다 (클릭 수 집계만 비활성화). */
export async function getDb() {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 실패한 연결을 캐시에 남기면 이후 요청이 전부 같은 에러로 실패하므로, 비워서 다음 요청 때 재시도합니다.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  const client = await globalForMongo._mongoClientPromise;
  return client.db(dbName);
}
