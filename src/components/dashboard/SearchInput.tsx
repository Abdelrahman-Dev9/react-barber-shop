import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type SearchInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const SearchInput = ({
  placeholder,
  value,
  onChange,
  className,
}: SearchInputProps) => (
  <div
    className={cn(
      "relative flex min-w-[220px] flex-1 items-center",
      className,
    )}
  >
    <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-3 size-4 text-[var(--dash-muted)]" />
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-10 rounded-xl border-[var(--dash-border)] bg-white pl-9"
    />
  </div>
);
