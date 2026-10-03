import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  count?: number;
  children?: ReactNode;
};

export const PageHeader = ({ title, count, children }: PageHeaderProps) => (
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
    <h1 className="text-2xl font-bold text-[var(--dash-ink)]">
      {title}
      {count != null ? (
        <span className="font-bold">
          {" "}
          ({" "}
          {count} )
        </span>
      ) : null}
    </h1>
    {children}
  </div>
);
