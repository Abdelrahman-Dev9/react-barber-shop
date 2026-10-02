import type { ReactNode } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type FieldCardProps = {
  label: string;
  children: ReactNode;
  error?: { message?: string };
  invalid?: boolean;
  className?: string;
};

export const FieldCard = ({
  label,
  children,
  error,
  invalid,
  className,
}: FieldCardProps) => (
  <Field
    data-invalid={invalid || undefined}
    className={cn("flex min-h-0 flex-col gap-0", className)}
  >
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col rounded-xl border bg-white px-4 pt-3 pb-3 transition-colors",
        invalid ? "border-[#EF4444]" : "border-[#E5E5E5]",
      )}
    >
      <FieldLabel className="mb-2 block shrink-0 text-sm font-semibold text-[#1A1A1A]">
        {label}
      </FieldLabel>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
    <FieldError errors={[error]} className="mt-1 px-1" />
  </Field>
);
