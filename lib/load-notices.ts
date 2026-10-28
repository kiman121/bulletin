import sample from "@/data/records.json";
import { noticeListSchema, sortNotices, type Notice } from "@/lib/notices";

export type NoticeLoad = {
  notices: Notice[];
  source: "api" | "sample";
};

function sampleNotices(): Notice[] {
  return sortNotices(noticeListSchema.parse(sample));
}

export async function loadNotices(): Promise<NoticeLoad> {
  const base = process.env.RECORDS_API_URL || "http://127.0.0.1:3000";
  try {
    const response = await fetch(`${base}/records`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) {
      throw new Error(`Records API returned ${response.status}`);
    }
    const notices = sortNotices(noticeListSchema.parse(await response.json()));
    return { notices, source: "api" };
  } catch {
    return { notices: sampleNotices(), source: "sample" };
  }
}
