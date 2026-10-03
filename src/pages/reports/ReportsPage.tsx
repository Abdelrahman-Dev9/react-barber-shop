import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PillTab } from "@/components/dashboard/PillTab";
import { Stars } from "@/components/reports/Stars";
import {
  applicationReports,
  complaintReports,
} from "@/data/mock";

export const ReportsPage = () => {
  const [mainTab, setMainTab] = useState<"complaint" | "application">(
    "application",
  );
  const [subTab, setSubTab] = useState<"clients" | "business">("clients");

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="Reports list" count={15}>
        <div className="flex flex-wrap gap-2">
          <PillTab
            label="Complaint reports"
            count={7}
            active={mainTab === "complaint"}
            onClick={() => setMainTab("complaint")}
          />
          <PillTab
            label="Application reports"
            count={8}
            active={mainTab === "application"}
            onClick={() => setMainTab("application")}
          />
        </div>
      </PageHeader>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-[var(--dash-ink)]">
          {mainTab === "complaint" ? "Complaint reports" : "Application reports"}{" "}
          / {subTab === "clients" ? "Clients" : "Business"}
        </p>
        <div className="flex gap-2">
          <PillTab
            label="Clients"
            count={mainTab === "complaint" ? 2 : 2}
            active={subTab === "clients"}
            onClick={() => setSubTab("clients")}
          />
          <PillTab
            label="Business"
            count={mainTab === "complaint" ? 6 : 6}
            active={subTab === "business"}
            onClick={() => setSubTab("business")}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--dash-border)] bg-white">
        {mainTab === "application" ? (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-5 py-4">Report ID</TableHead>
                <TableHead className="px-5 py-4">Date</TableHead>
                <TableHead className="px-5 py-4">Clients Name</TableHead>
                <TableHead className="px-5 py-4">Review Details</TableHead>
                <TableHead className="px-5 py-4">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicationReports.map((row, idx) => (
                <TableRow key={`${row.id}-${idx}`}>
                  <TableCell className="px-5 py-4 font-medium">
                    {row.id}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                    {row.date}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={row.avatar} alt={row.name} />
                        <AvatarFallback>{row.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                    {row.details}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <Stars rating={row.rating} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-5 py-4">Report ID</TableHead>
                <TableHead className="px-5 py-4">Report Date</TableHead>
                <TableHead className="px-5 py-4">Clients Name</TableHead>
                <TableHead className="px-5 py-4">Clients Email</TableHead>
                <TableHead className="px-5 py-4">Complaints details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaintReports.map((row, idx) => (
                <TableRow key={`${row.id}-${idx}`}>
                  <TableCell className="px-5 py-4 font-medium">
                    {row.id}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                    {row.date}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={row.avatar} alt={row.name} />
                        <AvatarFallback>{row.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                    {row.email}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[var(--dash-muted)]">
                    {row.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};
