import { formatPublished, type Notice } from "@/lib/notices";

export function NoticeList({
  notices,
  activeId,
  query,
  onOpen,
  onClear,
}: {
  notices: Notice[];
  activeId?: string;
  query: string;
  onOpen: (id: string) => void;
  onClear: () => void;
}) {
  if (notices.length === 0) {
    return (
      <div className="px-5 py-10 sm:px-6">
        <p className="font-[family-name:var(--font-serif)] text-2xl">No notices match “{query.trim()}”.</p>
        <button
          type="button"
          onClick={onClear}
          className="mt-4 text-sm font-semibold text-[var(--teal)] underline decoration-[var(--gold)] decoration-2 underline-offset-4"
        >
          Clear the search
        </button>
      </div>
    );
  }

  return (
    <ul className="mt-2">
      {notices.map((notice) => {
        const open = notice.id === activeId;
        return (
          <li key={notice.id} className="border-b border-[var(--line)]">
            <button
              type="button"
              onClick={() => onOpen(notice.id)}
              aria-current={open ? "true" : undefined}
              className={`w-full cursor-pointer px-5 py-4 text-left transition-colors sm:px-6 ${
                open ? "bg-white shadow-[inset_3px_0_0_var(--gold)]" : "hover:bg-white/80"
              }`}
            >
              <span className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">
                {formatPublished(notice.published)}
              </span>
              <span className="mt-1 block font-[family-name:var(--font-serif)] text-xl leading-snug">{notice.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-[var(--muted)]">{notice.summary}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
