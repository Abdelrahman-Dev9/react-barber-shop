export const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--dash-border)] bg-white p-10 text-center">
    <h1 className="mb-2 text-2xl font-bold text-[var(--dash-ink)]">{title}</h1>
    <p className="text-sm text-[var(--dash-muted)]">
      UI placeholder — design coming next.
    </p>
  </div>
);
