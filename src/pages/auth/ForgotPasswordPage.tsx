import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiOutlineEnvelope } from "react-icons/hi2";
import contentArt from "@/assets/content.svg";
import lockResetIcon from "@/icons/Group 346.svg";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  AuthSubmitButton,
  AuthTextField,
} from "@/components/auth/AuthTextField";
import { AuthTitle } from "@/components/auth/AuthTitle";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "@/pages/auth/schemas";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: { email: "" },
  });

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
        icon={
          <img src={lockResetIcon} alt="" className="size-10 object-contain" />
        }
        title="Forgot your password?"
        subtitle="A code will be sent to your email to reset password"
      />

      <form
        className="flex flex-col gap-5"
        noValidate
        onSubmit={form.handleSubmit((values) => {
          navigate("/check-email", { state: { email: values.email } });
        })}
      >
        <AuthTextField
          control={form.control}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={HiOutlineEnvelope}
          autoFocus
          autoComplete="email"
        />
        <AuthSubmitButton loading={form.formState.isSubmitting}>
          Continue
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
}
