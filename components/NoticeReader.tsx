import { formatPublished, type Notice } from "@/lib/notices";

export function NoticeReader({
  notice,
  reading,
  hiddenByFilter,
  onBack,
}: {
  notice: Notice | null;
  reading: boolean;
  hiddenByFilter: boolean;
  onBack: () => void;
}) {
  return (
    <article className={`${reading ? "block" : "hidden lg:block"} bg-white/80 px-5 py-6 sm:px-10 sm:py-10`}>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 text-sm font-semibold text-[var(--teal)] underline decoration-[var(--gold)] decoration-2 underline-offset-4 lg:hidden"
      >
        ← All notices
      </button>
      {notice ? (
        <>
          {hiddenByFilter ? (
            <p className="mb-6 border border-[var(--line)] bg-[#f3e7cf] px-3 py-2 text-sm">
              This notice is hidden by the current search. Clear the search to see it in the list.
            </p>
          ) : null}
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--muted)] uppercase">
            {formatPublished(notice.published)}
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-serif)] text-4xl leading-tight font-medium sm:text-5xl">
            {notice.title}
          </h2>
          <div className="mt-5 h-px w-16 bg-[var(--gold)]" />
          <p className="mt-6 max-w-xl text-lg leading-relaxed">{notice.summary}</p>
          <dl className="mt-10 grid max-w-xl gap-4 border-t border-[var(--line)] pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">Record</dt>
              <dd className="mt-1">{notice.id}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-[var(--muted)] uppercase">Source page</dt>
              <dd className="mt-1 break-all">{notice.source_url}</dd>
            </div>
          </dl>
        </>
      ) : (
        <p className="font-[family-name:var(--font-serif)] text-3xl">Choose a notice to read it.</p>
      )}
    </article>
  );
}
