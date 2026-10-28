import { z } from "zod";

export const noticeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  summary: z.string().min(1),
  source_url: z.string().min(1),
});

export const noticeListSchema = z.array(noticeSchema);

export type Notice = z.infer<typeof noticeSchema>;

export function formatPublished(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function sortNotices(notices: Notice[]) {
  return [...notices].sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));
}

export function filterNotices(notices: Notice[], query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return notices;
  return notices.filter((notice) =>
    `${notice.title} ${notice.summary} ${notice.published}`.toLowerCase().includes(needle)
  );
}
