import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

type DashboardShellProps = {
  children: ReactNode;
};

export const DashboardShell = ({ children }: DashboardShellProps) => (
  <DashboardLayout>{children}</DashboardLayout>
);
