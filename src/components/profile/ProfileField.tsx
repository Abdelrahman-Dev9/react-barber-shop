import type { UseFormRegisterReturn } from "react-hook-form";
import { FieldCard } from "@/components/profile/FieldCard";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ProfileFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: { message?: string };
  readOnly?: boolean;
};

export const ProfileField = ({
  label,
  registration,
  error,
  readOnly,
}: ProfileFieldProps) => (
  <FieldCard
    label={label}
    error={error}
    invalid={!!error}
    className="min-h-0 flex-1"
  >
    <Input
      {...registration}
      readOnly={readOnly}
      aria-invalid={!!error || undefined}
      className={cn(
        "min-h-11 w-full flex-1 rounded-lg border-0 bg-[#F0F0F0] px-3 text-sm font-medium text-[#1A1A1A] shadow-none focus-visible:border-0 focus-visible:ring-0",
        readOnly && "cursor-default",
      )}
    />
  </FieldCard>
);
