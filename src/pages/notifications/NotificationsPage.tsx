import { useMemo, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SearchInput } from "@/components/dashboard/SearchInput";
import { AddNotificationModal } from "@/components/notifications/AddNotificationModal";
import { notifications } from "@/data/mock";

export const NotificationsPage = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notifications;
    return notifications.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.sendBy.toLowerCase().includes(q) ||
        n.sendTo.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Notifications" count={3}>
        <Button
          type="button"
          className="h-10 rounded-xl bg-[var(--dash-ink)] px-4 text-white hover:bg-[var(--dash-ink)]/90"
          onClick={() => setOpen(true)}
        >
          <HiOutlinePlus className="size-4" />
          Add new notification
        </Button>
      </PageHeader>

      <div className="mb-4">
        <SearchInput
          placeholder="Search for Notification's name"
          value={search}
          onChange={setSearch}
          className="max-w-xl"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--dash-border)] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5 py-4">Title</TableHead>
              <TableHead className="px-5 py-4">Send by</TableHead>
              <TableHead className="px-5 py-4">Send to</TableHead>
              <TableHead className="px-5 py-4">Send at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="max-w-[360px] truncate px-5 py-4 font-medium text-[var(--dash-ink)]">
                  {row.title}
                </TableCell>
                <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                  {row.sendBy}
                </TableCell>
                <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                  {row.sendTo}
                </TableCell>
                <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                  {row.sendAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddNotificationModal open={open} onOpenChange={setOpen} />
    </div>
  );
};
