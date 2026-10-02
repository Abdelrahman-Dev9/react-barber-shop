export const FilterChip = ({ label }: { label: string }) => (
  <button
    type="button"
    className="flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[var(--dash-border)] bg-white px-3 text-sm text-[var(--dash-ink)] hover:bg-[var(--dash-active)]"
  >
    <span className="flex flex-col gap-0.5" aria-hidden>
      <span className="block h-0.5 w-3 rounded bg-[var(--dash-ink)]" />
      <span className="block h-0.5 w-3 rounded bg-[var(--dash-ink)]" />
      <span className="block h-0.5 w-3 rounded bg-[var(--dash-ink)]" />
    </span>
    {label}
  </button>
);
