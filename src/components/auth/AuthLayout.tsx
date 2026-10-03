import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "@/icons/logo.svg";

type AuthLayoutProps = {
  left: ReactNode;
  children: ReactNode;
  showLoginPrompt?: boolean;
  leftClassName?: string;
};

export const AuthLayout = ({
  left,
  children,
  showLoginPrompt = true,
  leftClassName = "",
}: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <aside className={`auth-left ${leftClassName}`.trim()} aria-hidden>
        {left}
      </aside>
      <section className="auth-right">
        <header className="flex w-full items-center justify-between gap-4">
          <Link to="/login" aria-label="ZERO home" className="shrink-0">
            <img
              src={logo}
              alt="ZERO"
              className="h-8 w-auto max-w-[120px] object-contain"
            />
          </Link>
          {showLoginPrompt ? (
            <p className="flex flex-wrap items-center justify-end gap-1 text-sm text-[var(--auth-ink)]">
              <span>Already Have an account?</span>
              <Link
                to="/login"
                className="font-medium text-[var(--auth-link)] underline underline-offset-2 hover:opacity-80"
              >
                Log in
              </Link>
            </p>
          ) : null}
        </header>

        <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-6 sm:py-8">
          {children}
        </div>

        <footer className="flex flex-col items-center gap-1 pt-4 text-center sm:pt-6">
          <p className="text-sm text-[var(--auth-ink)]">
            Created By <span className="font-semibold">Zero Team</span>
          </p>
          <a
            href="mailto:contact@zero.team"
            className="text-sm text-[var(--auth-link)] underline underline-offset-2 hover:opacity-80"
          >
            Contact us
          </a>
        </footer>
      </section>
    </div>
  );
};
