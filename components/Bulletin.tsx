"use client";

import { useMemo, useState } from "react";
import { NoticeList } from "@/components/NoticeList";
import { NoticeReader } from "@/components/NoticeReader";
import { filterNotices, sortNotices, type Notice } from "@/lib/notices";

export function Bulletin({
  notices,
  source,
  initialId,
}: {
  notices: Notice[];
  source: "api" | "sample";
  initialId?: string;
}) {
  const ordered = useMemo(() => sortNotices(notices), [notices]);
  const known = ordered.some((notice) => notice.id === initialId);
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(known ? initialId : ordered[0]?.id);
  const [reading, setReading] = useState(known);
  const visible = filterNotices(ordered, query);
  const active = ordered.find((notice) => notice.id === activeId) ?? null;
  const hiddenByFilter = Boolean(active && query.trim() && !visible.some((notice) => notice.id === active.id));

  function openNotice(id: string) {
    setActiveId(id);
    setReading(true);
    const url = new URL(window.location.href);
    url.searchParams.set("notice", id);
    window.history.replaceState(null, "", url);
  }

  const countLabel = query.trim()
    ? `${visible.length} of ${ordered.length}`
    : `${ordered.length} ${ordered.length === 1 ? "notice" : "notices"}`;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="bg-[var(--teal)] text-[#f6f1e8]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:px-8 sm:py-10">
          <div className="flex items-center justify-between gap-4 text-[11px] font-semibold tracking-[0.22em] uppercase">
            <span>Bulletin</span>
            <span className="text-[#d5c39a]">{source === "api" ? "Live records" : "Saved sample"}</span>
          </div>
          <div className="max-w-2xl">
            <h1 className="font-[family-name:var(--font-serif)] text-4xl leading-tight font-medium sm:text-5xl">
              Public notices, ready to read
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#d7e2e6]">
              Each card is one parsed record: a title, a date, and the summary taken from the page.
            </p>
          </div>
          <div className="h-px w-16 bg-[var(--gold)]" />
        </div>
      </header>

      {source === "sample" ? (
        <p className="border-b border-[var(--line)] bg-[#f3e7cf] px-5 py-3 text-sm text-[var(--ink)] sm:px-8">
          The records API is not running, so this is the saved sample. Start records-api on port 3000 and refresh to read the live service.
        </p>
      ) : null}

      <main className="mx-auto grid w-full max-w-6xl flex-1 lg:grid-cols-[340px_minmax(0,1fr)]">
        <section
          id="notices"
          className={`${reading ? "hidden lg:block" : "block"} border-[var(--line)] lg:sticky lg:top-0 lg:max-h-dvh lg:overflow-y-auto lg:border-r`}
        >
          <div className="px-5 pt-5 sm:px-6">
            <label className="block text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)] uppercase" htmlFor="find-notice">
              Find a notice
            </label>
            <div className="relative mt-2">
              <input
                id="find-notice"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, date, or summary"
                className="w-full border border-[var(--line)] bg-white px-3 py-2.5 pr-16 text-sm placeholder:text-[#9aa6ad] focus:border-[var(--teal)]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-2 -translate-y-1/2 px-2 py-1 text-xs font-semibold text-[var(--teal)]"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">{countLabel}</p>
          </div>
          <NoticeList notices={visible} activeId={activeId} query={query} onOpen={openNotice} onClear={() => setQuery("")} />
        </section>

        <NoticeReader
          notice={active}
          reading={reading}
          hiddenByFilter={hiddenByFilter}
          onBack={() => setReading(false)}
        />
      </main>
    </div>
  );
}
