import { cn } from "@/lib/utils";

type PillTabProps = {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
};

export const PillTab = ({ label, count, active, onClick }: PillTabProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "border-[var(--dash-ink)] bg-[var(--dash-ink)] text-white"
        : "border-[var(--dash-ink)] bg-white text-[var(--dash-ink)] hover:bg-[var(--dash-active)]",
    )}
  >
    {label}
    {count != null ? ` (${count})` : ""}
  </button>
);
