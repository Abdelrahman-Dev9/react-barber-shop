import type { ReactNode } from "react";

type AuthTitleProps = {
  icon: ReactNode;
  title: string;
  subtitle: ReactNode;
};

export const AuthTitle = ({ icon, title, subtitle }: AuthTitleProps) => {
  return (
    <div className="mb-8 flex flex-col items-center text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#F0F0F0]">
        {icon}
      </div>
      <h1 className="mb-2 text-2xl font-bold text-[var(--auth-ink)] sm:text-[1.75rem]">
        {title}
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-[var(--auth-placeholder)]">
        {subtitle}
      </p>
    </div>
  );
};
