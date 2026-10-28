import { Bulletin } from "@/components/Bulletin";
import { loadNotices } from "@/lib/load-notices";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const { notice } = await searchParams;
  const { notices, source } = await loadNotices();
  return <Bulletin notices={notices} source={source} initialId={notice} />;
}
