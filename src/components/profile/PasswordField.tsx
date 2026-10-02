import type { UseFormRegisterReturn } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { FieldCard } from "@/components/profile/FieldCard";
import { Input } from "@/components/ui/input";

type PasswordFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: { message?: string };
  visible: boolean;
  onToggle: () => void;
  autoComplete?: string;
};

export const PasswordField = ({
  label,
  registration,
  error,
  visible,
  onToggle,
  autoComplete,
}: PasswordFieldProps) => (
  <FieldCard label={label} error={error} invalid={!!error}>
    <div className="flex h-11 items-center gap-2 rounded-lg bg-[#F0F0F0] px-3">
      <Input
        {...registration}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        aria-invalid={!!error || undefined}
        className="h-full flex-1 border-0 bg-transparent px-0 text-sm font-medium text-[#1A1A1A] shadow-none focus-visible:border-0 focus-visible:ring-0"
      />
      <button
        type="button"
        className="shrink-0 cursor-pointer text-[#1A1A1A]"
        aria-label={visible ? "Hide password" : "Show password"}
        onClick={onToggle}
      >
        {visible ? (
          <HiOutlineEyeSlash className="size-5" />
        ) : (
          <HiOutlineEye className="size-5" />
        )}
      </button>
    </div>
  </FieldCard>
);
