import { filterNotices, formatPublished, sortNotices, type Notice } from "@/lib/notices";

const notices: Notice[] = [
  {
    id: "alpha",
    title: "Alpha notice",
    published: "2026-10-01",
    summary: "Library reading room closes early on Friday.",
    source_url: "fixtures/records/alpha.html",
  },
  {
    id: "beta",
    title: "Beta notice",
    published: "2026-10-15",
    summary: "Water rate for the quarter stays at the published figure.",
    source_url: "fixtures/records/beta.html",
  },
];

test("formatPublished keeps the calendar day", () => {
  expect(formatPublished("2026-10-01")).toBe("1 Oct 2026");
});

test("sortNotices puts the newest date first", () => {
  expect(sortNotices(notices).map((notice) => notice.id)).toEqual(["beta", "alpha"]);
});

test("filterNotices matches the summary", () => {
  expect(filterNotices(notices, "water").map((notice) => notice.id)).toEqual(["beta"]);
  expect(filterNotices(notices, "   ")).toHaveLength(2);
});
