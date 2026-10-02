import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi2";
import contentArt from "@/assets/content.svg";
import lockIcon from "@/icons/Group 346 (1).svg";
import { AuthLayout } from "@/components/auth/AuthLayout";
import {
  AuthSubmitButton,
  AuthTextField,
} from "@/components/auth/AuthTextField";
import { AuthTitle } from "@/components/auth/AuthTitle";
import {
  createPasswordSchema,
  type CreatePasswordValues,
} from "@/pages/auth/schemas";

export function CreatePasswordPage() {
  const navigate = useNavigate();
  const form = useForm<CreatePasswordValues>({
    resolver: zodResolver(createPasswordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
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
        icon={<img src={lockIcon} alt="" className="size-10 object-contain" />}
        title="Create new password"
        subtitle="Your new password must be unique from those previously used"
      />

      <form
        className="flex flex-col gap-4"
        noValidate
        onSubmit={form.handleSubmit(() => {
          navigate("/login", { replace: true });
        })}
      >
        <AuthTextField
          control={form.control}
          name="password"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          icon={HiOutlineLockClosed}
          autoFocus
          autoComplete="new-password"
        />
        <AuthTextField
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Enter confirm password"
          icon={HiOutlineLockClosed}
          autoComplete="new-password"
        />
        <AuthSubmitButton
          className="mt-1"
          loading={form.formState.isSubmitting}
        >
          Confirm
        </AuthSubmitButton>
      </form>
    </AuthLayout>
  );
}
