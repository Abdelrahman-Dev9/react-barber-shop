import { useState, type ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

type AuthTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  icon: IconType;
  autoFocus?: boolean;
  autoComplete?: string;
};

export function AuthTextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  icon: Icon,
  autoFocus,
  autoComplete,
}: AuthTextFieldProps<T>) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  const resolvedAutoComplete =
    autoComplete ??
    (type === "email"
      ? "email"
      : isPassword
        ? "current-password"
        : undefined);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid || undefined}>
          <FieldLabel htmlFor={field.name} className="text-[var(--auth-ink)]">
            {label}
          </FieldLabel>
          <InputGroup
            className={cn(
              "h-12 border-[var(--auth-border)] bg-[var(--auth-input-bg)] transition-colors",
              fieldState.invalid && "border-destructive",
            )}
          >
            <InputGroupAddon align="inline-start">
              <Icon className="size-5 text-[var(--auth-ink)]" aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              {...field}
              id={field.name}
              type={isPassword ? (visible ? "text" : "password") : type}
              placeholder={placeholder}
              autoFocus={autoFocus}
              autoComplete={resolvedAutoComplete}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-invalid={fieldState.invalid}
              aria-describedby={
                fieldState.error ? `${field.name}-error` : undefined
              }
              className="h-full placeholder:text-[var(--auth-placeholder)]"
            />
            {isPassword ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-sm"
                  tabIndex={-1}
                  aria-label={visible ? "Hide password" : "Show password"}
                  onClick={() => setVisible((v) => !v)}
                >
                  {visible ? (
                    <HiOutlineEye className="size-5 text-[var(--auth-ink)]" />
                  ) : (
                    <HiOutlineEyeSlash className="size-5 text-[var(--auth-ink)]" />
                  )}
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
          <FieldError
            id={`${field.name}-error`}
            errors={[fieldState.error]}
            className="min-h-5"
          />
        </Field>
      )}
    />
  );
}

export function AuthSubmitButton({
  children,
  className,
  disabled,
  loading,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
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
}
