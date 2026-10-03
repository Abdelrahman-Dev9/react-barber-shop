import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HiOutlineArrowPath, HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NOTIFICATION_CATEGORY_OPTIONS,
  notificationDefaultValues,
  notificationSchema,
  type NotificationFormValues,
} from "@/components/notifications/schemas";
import { cn } from "@/lib/utils";

type AddNotificationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const inputClass =
  "h-12 rounded-xl border-[#E5E7EB] bg-white px-4 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus-visible:border-[#1A1A1A] focus-visible:ring-0 aria-invalid:border-[#EF4444]";

export const AddNotificationModal = ({
  open,
  onOpenChange,
}: AddNotificationModalProps) => {
  const [categories, setCategories] = useState<string[]>(["Client (Android)"]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: notificationDefaultValues,
  });

  useEffect(() => {
    if (!open) return;
    form.reset(notificationDefaultValues);
    setCategories(["Client (Android)"]);
    setCategoryError(null);
  }, [open, form]);

  const resetAll = () => {
    form.reset(notificationDefaultValues);
    setCategories(["Client (Android)"]);
    setCategoryError(null);
  };

  const addNextCategory = () => {
    const next = NOTIFICATION_CATEGORY_OPTIONS.find(
      (c) => !categories.includes(c),
    );
    if (!next) return;
    setCategories((prev) => [...prev, next]);
    setCategoryError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="bg-black/25 backdrop-blur-none supports-backdrop-filter:backdrop-blur-none"
        className="!flex w-[min(560px,96vw)] !max-w-[560px] flex-col gap-0 overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-xl ring-0 sm:!max-w-[560px]"
      >
        <div className="relative flex shrink-0 items-center justify-center px-6 pt-5 pb-3">
          <button
            type="button"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 left-4 flex size-8 cursor-pointer items-center justify-center rounded-[10px] border border-[#EF4444] bg-[#EF4444] text-white"
          >
            <HiOutlineXMark className="size-[18px] stroke-[2]" />
          </button>
          <DialogTitle className="text-center text-xl font-bold text-[#1A1A1A]">
            Add New Notification
          </DialogTitle>
        </div>

        <form
          className="flex flex-col gap-5 px-6 pt-2 pb-6"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const hasCategory = categories.length > 0;
            if (!hasCategory) {
              setCategoryError("Select at least one recipient category");
            }
            void form.handleSubmit(() => {
              if (!hasCategory) return;
              onOpenChange(false);
              resetAll();
            })(e);
          }}
        >
          <Field
            className="gap-2"
            data-invalid={!!form.formState.errors.subject || undefined}
          >
            <FieldLabel className="text-sm font-medium text-[#1A1A1A]">
              Subject EX:
            </FieldLabel>
            <Input
              {...form.register("subject")}
              placeholder="You received a new booking request from a customer."
              aria-invalid={!!form.formState.errors.subject || undefined}
              className={inputClass}
            />
            <FieldError errors={[form.formState.errors.subject]} />
          </Field>

          <div className="flex flex-col gap-5 sm:flex-row">
            <Field
              className="min-w-0 flex-1 gap-2"
              data-invalid={!!form.formState.errors.sendBy || undefined}
            >
              <FieldLabel className="text-sm font-medium text-[#1A1A1A]">
                Send by:
              </FieldLabel>
              <Input
                {...form.register("sendBy")}
                aria-invalid={!!form.formState.errors.sendBy || undefined}
                className={inputClass}
              />
              <FieldError errors={[form.formState.errors.sendBy]} />
            </Field>
            <Field
              className="min-w-0 flex-1 gap-2"
              data-invalid={!!form.formState.errors.sendAt || undefined}
            >
              <FieldLabel className="text-sm font-medium text-[#1A1A1A]">
                Send at:
              </FieldLabel>
              <Input
                {...form.register("sendAt")}
                placeholder="MM/DD/YYYY"
                aria-invalid={!!form.formState.errors.sendAt || undefined}
                className={inputClass}
              />
              <FieldError errors={[form.formState.errors.sendAt]} />
            </Field>
          </div>

          <Field
            className="gap-2"
            data-invalid={!!categoryError || undefined}
          >
            <FieldLabel className="text-sm font-medium text-[#1A1A1A]">
              Send to:
            </FieldLabel>
            <div
              className={cn(
                "flex min-h-12 flex-wrap items-center gap-2 rounded-xl border bg-white px-3 py-2",
                categoryError ? "border-[#EF4444]" : "border-[#E5E7EB]",
              )}
            >
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#F3F4F6] px-2.5 py-1.5 text-xs font-medium text-[#1A1A1A]"
                >
                  {cat}
                  <button
                    type="button"
                    aria-label={`Remove ${cat}`}
                    className="cursor-pointer text-[#6B7280] hover:text-[#1A1A1A]"
                    onClick={() => {
                      setCategories((prev) => prev.filter((c) => c !== cat));
                      setCategoryError(null);
                    }}
                  >
                    <HiOutlineXMark className="size-3.5 stroke-[2]" />
                  </button>
                </span>
              ))}
              {categories.length < NOTIFICATION_CATEGORY_OPTIONS.length ? (
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-dashed border-[#D1D5DB] px-2.5 py-1.5 text-xs font-medium text-[#6B7280] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                  onClick={addNextCategory}
                >
                  <HiOutlinePlus className="size-3.5" />
                  Add new category
                </button>
              ) : null}
            </div>
            {categoryError ? (
              <p role="alert" className="text-sm text-destructive">
                {categoryError}
              </p>
            ) : null}
          </Field>

          <div className="mt-1 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-12 gap-2 rounded-xl border-[#1A1A1A] bg-white px-5 text-[#1A1A1A] hover:bg-[#F5F5F5]"
              onClick={resetAll}
            >
              <HiOutlineArrowPath className="size-4" />
              Reset all
            </Button>
            <Button
              type="submit"
              className="h-12 min-w-[120px] rounded-xl bg-[#1A1A1A] px-8 text-white hover:bg-[#1A1A1A]/90"
            >
              Send
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
