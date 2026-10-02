import { z } from "zod";

const emailField = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address");

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const checkEmailSchema = z.object({
  otp: z
    .string()
    .min(6, "Enter the 6-digit code")
    .max(6, "Enter the 6-digit code")
    .regex(/^\d{6}$/, "Code must be 6 digits"),
});

export type CheckEmailValues = z.infer<typeof checkEmailSchema>;

export const createPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreatePasswordValues = z.infer<typeof createPasswordSchema>;

export function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const visible = user.slice(0, Math.min(6, Math.max(1, user.length - 2)));
  return `${visible}****@${domain}`;
}
