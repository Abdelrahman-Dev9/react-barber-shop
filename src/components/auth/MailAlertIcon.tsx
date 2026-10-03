import { HiOutlineEnvelope } from "react-icons/hi2";

export const MailAlertIcon = () => (
  <div className="relative flex size-10 items-center justify-center">
    <HiOutlineEnvelope className="size-8 text-[var(--auth-ink)]" />
    <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--auth-ink)] text-[10px] font-bold text-white">
      !
    </span>
  </div>
);
