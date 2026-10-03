import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterChip } from "@/components/dashboard/FilterChip";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SearchInput } from "@/components/dashboard/SearchInput";
import { ReviewBranchModal } from "@/components/review-branch/ReviewBranchModal";
import { reviewBranches } from "@/data/mock";
import { cn } from "@/lib/utils";

export const ReviewBranchesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>("3");
  const [modalOpen, setModalOpen] = useState(false);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return reviewBranches;
    return reviewBranches.filter((r) => r.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Branches" count={10} />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="Search for name"
          value={search}
          onChange={setSearch}
        />
        <FilterChip label="Country" />
        <FilterChip label="City" />
        <FilterChip label="Area" />
        <FilterChip label="District" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--dash-border)] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5 py-4 text-[var(--dash-ink)]">
                Branch name
              </TableHead>
              <TableHead className="px-5 py-4 text-[var(--dash-ink)]">
                Phone number
              </TableHead>
              <TableHead className="px-5 py-4 text-[var(--dash-ink)]">
                Number of services
              </TableHead>
              <TableHead className="px-5 py-4 text-[var(--dash-ink)]">
                Number of barbers
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  "cursor-pointer",
                  selectedId === row.id && "bg-[var(--dash-active)]",
                )}
                onClick={() => {
                  setSelectedId(row.id);
                  setModalOpen(true);
                }}
              >
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={row.avatar} alt={row.name} />
                      <AvatarFallback>{row.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-[var(--dash-ink)]">
                      {row.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                  {row.phone}
                </TableCell>
                <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                  {row.services} services
                </TableCell>
                <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                  {row.barbers} barbers
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ReviewBranchModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
};
