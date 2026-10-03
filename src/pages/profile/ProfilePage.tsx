import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlineXMark,
} from "react-icons/hi2";
import profileImage from "@/assets/unsplash_T-T-tjEwDLg.svg";
import { PasswordField } from "@/components/profile/PasswordField";
import { ProfileField } from "@/components/profile/ProfileField";
import { adminProfile } from "@/data/mock";
import {
  emptyPasswordValues,
  passwordSchema,
  profileSchema,
  type PasswordValues,
  type ProfileValues,
} from "@/pages/profile/schemas";

type Mode = "view" | "editProfile" | "editPassword";

export const ProfilePage = () => {
  const [mode, setMode] = useState<Mode>("view");
  const [profile, setProfile] = useState(adminProfile);
  const [success, setSuccess] = useState<string | null>(null);
  const [visible, setVisible] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    values: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    },
  });

  const passwordForm = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: emptyPasswordValues,
  });

  useEffect(() => {
    if (!success) return;
    const id = window.setTimeout(() => setSuccess(null), 2800);
    return () => window.clearTimeout(id);
  }, [success]);

  const enterEditProfile = () => {
    profileForm.reset(profile);
    setMode("editProfile");
  };

  const enterEditPassword = () => {
    passwordForm.reset(emptyPasswordValues);
    setVisible({ current: false, next: false, confirm: false });
    setMode("editPassword");
  };

  const cancelEdit = () => {
    profileForm.reset(profile);
    passwordForm.reset(emptyPasswordValues);
    setVisible({ current: false, next: false, confirm: false });
    setMode("view");
  };

  return (
    <div className="flex flex-1 flex-col gap-5">
      <h1 className="text-2xl font-bold text-[#1A1A1A]">Profile admin</h1>

      {success ? (
        <div
          role="status"
          className="flex items-center gap-2 rounded-xl border border-[#86EFAC] bg-[#F0FDF4] px-4 py-3 text-sm font-medium text-[#166534]"
        >
          <HiOutlineCheckCircle className="size-5 shrink-0" />
          {success}
        </div>
      ) : null}

      <div className="flex w-full flex-col gap-5 rounded-2xl border border-[#E5E5E5] bg-white p-6 sm:gap-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-stretch">
          <div className="flex aspect-square w-full shrink-0 items-stretch justify-center rounded-2xl border border-dashed border-[#D1D5DB] p-2.5 sm:aspect-auto sm:w-[48%] sm:max-w-[340px] sm:self-stretch">
            <img
              src={profileImage}
              alt={profile.name}
              className="h-full min-h-[280px] w-full rounded-xl object-cover"
            />
          </div>

          <div className="flex min-h-[280px] min-w-0 flex-1 flex-col gap-3 sm:min-h-0">
            <ProfileField
              label="Name"
              registration={profileForm.register("name")}
              error={profileForm.formState.errors.name}
              readOnly={mode !== "editProfile"}
            />
            <ProfileField
              label="Email"
              registration={profileForm.register("email")}
              error={profileForm.formState.errors.email}
              readOnly={mode !== "editProfile"}
            />
            <ProfileField
              label="phone"
              registration={profileForm.register("phone")}
              error={profileForm.formState.errors.phone}
              readOnly={mode !== "editProfile"}
            />
          </div>
        </div>

        {mode === "editPassword" ? (
          <form
            className="flex flex-col gap-3"
            noValidate
            onSubmit={passwordForm.handleSubmit(() => {
              passwordForm.reset(emptyPasswordValues);
              setVisible({ current: false, next: false, confirm: false });
              setMode("view");
              setSuccess("Password updated successfully");
            })}
          >
            <PasswordField
              label="Current password"
              registration={passwordForm.register("currentPassword")}
              error={passwordForm.formState.errors.currentPassword}
              visible={visible.current}
              autoComplete="current-password"
              onToggle={() =>
                setVisible((prev) => ({ ...prev, current: !prev.current }))
              }
            />
            <PasswordField
              label="New Password"
              registration={passwordForm.register("newPassword")}
              error={passwordForm.formState.errors.newPassword}
              visible={visible.next}
              autoComplete="new-password"
              onToggle={() =>
                setVisible((prev) => ({ ...prev, next: !prev.next }))
              }
            />
            <PasswordField
              label="Confirm new password"
              registration={passwordForm.register("confirmPassword")}
              error={passwordForm.formState.errors.confirmPassword}
              visible={visible.confirm}
              autoComplete="new-password"
              onToggle={() =>
                setVisible((prev) => ({ ...prev, confirm: !prev.confirm }))
              }
            />
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#1A1A1A] bg-white text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F5F5]"
                onClick={cancelEdit}
              >
                <HiOutlineXMark className="size-4" />
                Cancel
              </button>
              <button
                type="submit"
                className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] text-base font-medium text-white hover:bg-[#1A1A1A]/90"
              >
                <HiOutlineCheckCircle className="size-5" />
                Save password
              </button>
            </div>
          </form>
        ) : null}

        {mode === "view" ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#1A1A1A] bg-white text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F5F5]"
              onClick={enterEditPassword}
            >
              <HiOutlinePencilSquare className="size-4" />
              Edit password
            </button>
            <button
              type="button"
              className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] text-sm font-medium text-white hover:bg-[#1A1A1A]/90"
              onClick={enterEditProfile}
            >
              <HiOutlinePencilSquare className="size-4" />
              Edit profile
            </button>
          </div>
        ) : null}

        {mode === "editProfile" ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#1A1A1A] bg-white text-sm font-medium text-[#1A1A1A] hover:bg-[#F5F5F5]"
              onClick={cancelEdit}
            >
              <HiOutlineXMark className="size-4" />
              Cancel
            </button>
            <button
              type="button"
              className="flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] text-base font-medium text-white hover:bg-[#1A1A1A]/90"
              onClick={profileForm.handleSubmit((values) => {
                setProfile((prev) => ({ ...prev, ...values }));
                setMode("view");
                setSuccess("Profile updated successfully");
              })}
            >
              <HiOutlineCheckCircle className="size-5" />
              Save new data
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
