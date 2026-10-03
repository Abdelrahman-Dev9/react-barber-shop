import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AuthSubmitButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

export const AuthSubmitButton = ({
  children,
  className,
  disabled,
  loading,
}: AuthSubmitButtonProps) => (
  <Button
    type="submit"
    disabled={disabled || loading}
    className={cn(
      "h-12 w-full rounded-lg bg-[var(--auth-ink)] text-base font-semibold text-white hover:bg-[var(--auth-ink)]/90 disabled:opacity-60",
      className,
    )}
  >
    {loading ? "Please wait..." : children}
  </Button>
);
