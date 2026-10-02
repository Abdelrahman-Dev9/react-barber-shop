import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineEnvelope } from "react-icons/hi2";
import contentArt from "@/assets/content.svg";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthSubmitButton } from "@/components/auth/AuthTextField";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import {
  checkEmailSchema,
  maskEmail,
  type CheckEmailValues,
} from "@/pages/auth/schemas";

function MailAlertIcon() {
  return (
    <div className="relative flex size-10 items-center justify-center">
      <HiOutlineEnvelope className="size-8 text-[var(--auth-ink)]" />
      <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--auth-ink)] text-[10px] font-bold text-white">
        !
      </span>
    </div>
  );
}

export function CheckEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = (location.state as { email?: string } | null)?.email;
  const displayEmail = emailFromState
    ? maskEmail(emailFromState)
    : "your email";

  const [resent, setResent] = useState(false);

  const form = useForm<CheckEmailValues>({
    resolver: zodResolver(checkEmailSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: { otp: "" },
  });

  const goToCreatePassword = () => {
    navigate("/create-password", {
      state: { email: emailFromState },
    });
  };

  return (
    <AuthLayout
      left={
        <img
          src={contentArt}
          alt=""
          className="h-auto max-h-[min(85vh,720px)] w-full max-w-[480px] object-contain"
        />
      }
    >
      <AuthTitle
        icon={<MailAlertIcon />}
        title="Check your email"
        subtitle={
          <>
            Enter the code that was sent to{" "}
            <span className="font-semibold text-[var(--auth-ink)]">
              {displayEmail}
            </span>
          </>
        }
      />

      <Separator className="mb-6" />

      <form
        className="flex flex-col gap-6"
        noValidate
        onSubmit={form.handleSubmit(goToCreatePassword)}
      >
        <Controller
          control={form.control}
          name="otp"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  if (value.length === 6 && /^\d{6}$/.test(value)) {
                    void form.handleSubmit(goToCreatePassword)();
                  }
                }}
                autoFocus
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-invalid={fieldState.invalid}
                aria-label="One-time password"
              >
                <InputOTPGroup className="flex w-full justify-center gap-2 sm:gap-3">
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="size-11 rounded-lg border border-[var(--auth-border)] text-base font-semibold first:rounded-lg first:border-l last:rounded-lg sm:size-12"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FieldError
                errors={[fieldState.error]}
                className="min-h-5 text-center"
              />
            </Field>
          )}
        />

        <AuthSubmitButton loading={form.formState.isSubmitting}>
          Reset Password
        </AuthSubmitButton>

        <p className="text-center text-sm text-[var(--auth-placeholder)]">
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            className="cursor-pointer font-medium text-[var(--auth-link)] underline underline-offset-2 hover:opacity-80"
            onClick={() => {
              setResent(true);
              form.reset({ otp: "" });
            }}
          >
            Resend
          </button>
        </p>

        {resent ? (
          <p role="status" className="text-center text-sm text-emerald-700">
            A new code was sent{emailFromState ? ` to ${displayEmail}` : ""}.
          </p>
        ) : null}

        {!emailFromState ? (
          <p className="text-center text-sm text-[var(--auth-placeholder)]">
            Wrong place?{" "}
            <Link
              to="/forgot-password"
              className="text-[var(--auth-link)] underline underline-offset-2"
            >
              Enter your email again
            </Link>
          </p>
        ) : null}
      </form>
    </AuthLayout>
  );
}
