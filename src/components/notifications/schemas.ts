import { z } from "zod";
import { adminProfile } from "@/data/mock";

export const notificationSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be under 200 characters"),
  sendBy: z
    .string()
    .trim()
    .min(1, "Send by is required")
    .min(2, "Send by must be at least 2 characters"),
  sendAt: z
    .string()
    .trim()
    .min(1, "Send at is required")
    .regex(
      /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/\d{4}$/,
      "Use date format MM/DD/YYYY",
    ),
});

export type NotificationFormValues = z.infer<typeof notificationSchema>;

export const notificationDefaultValues: NotificationFormValues = {
  subject: "",
  sendBy: adminProfile.name,
  sendAt: "10/30/2024",
};

export const NOTIFICATION_CATEGORY_OPTIONS = [
  "Client (Android)",
  "Client (iOS)",
  "Business",
  "All",
] as const;
