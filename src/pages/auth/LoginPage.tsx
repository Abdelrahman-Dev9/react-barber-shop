import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import loginArt from "@/assets/Frame 406.svg";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthSubmitButton } from "@/components/auth/AuthSubmitButton";
import { AuthTextField } from "@/components/auth/AuthTextField";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { loginSchema, type LoginValues } from "@/pages/auth/schemas";

export const LoginPage = () => {
  const navigate = useNavigate();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <AuthLayout
      showLoginPrompt={false}
      leftClassName="bg-[var(--auth-page-bg)]"
      left={
        <img
          src={loginArt}
          alt=""
          className="h-auto max-h-[min(80vh,640px)] w-full max-w-[520px] object-contain"
        />
      }
    >
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-[var(--auth-ink)]">Welcome Back</h1>
        <p className="text-sm text-[var(--auth-placeholder)]">
          Log in to Manage Administrative Tasks
        </p>
      </div>

      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={form.handleSubmit(() => {
          navigate("/review-branches");
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
        <AuthTextField
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={HiOutlineLockClosed}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-3">
          <Controller
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <Field orientation="horizontal" className="w-auto gap-2">
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                />
                <FieldLabel
                  htmlFor="rememberMe"
                  className="cursor-pointer font-normal text-[var(--auth-ink)]"
                >
                  Remember me
                </FieldLabel>
              </Field>
            )}
          />
          <Link
            to="/forgot-password"
            className="text-sm whitespace-nowrap text-[var(--auth-link)] underline underline-offset-2 hover:opacity-80"
          >
            Forgot password ?
          </Link>
        </div>

        <AuthSubmitButton loading={form.formState.isSubmitting}>
          Log in
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
};
