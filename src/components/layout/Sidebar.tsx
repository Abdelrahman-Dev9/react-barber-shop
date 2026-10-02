import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineBell,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineBuildingOffice2,
  HiOutlineUsers,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import logo from "@/icons/logo.svg";
import { cn } from "@/lib/utils";
import { adminProfile, navItems } from "@/data/mock";

const iconMap = {
  dashboard: HiOutlineHome,
  booking: HiOutlineCalendar,
  users: HiOutlineUsers,
  admins: HiOutlineShieldCheck,
  branches: HiOutlineBuildingOffice2,
  review: HiOutlineClipboardDocumentCheck,
  notifications: HiOutlineBell,
  reports: HiOutlineChartBar,
} as const;

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside className="dash-sidebar" data-collapsed={collapsed}>
      <div
        className={cn(
          "mb-6 flex items-center",
          collapsed ? "justify-center" : "justify-start px-2",
        )}
      >
        <img
          src={logo}
          alt="ZERO"
          className={cn(
            "object-contain",
            collapsed ? "h-8 w-8" : "h-8 w-auto max-w-[110px]",
          )}
        />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? HiOutlineCog6Tooth;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={item.label}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--dash-ink)] transition-colors hover:bg-[var(--dash-active)]",
                  collapsed && "justify-center px-2",
                  isActive && "bg-[var(--dash-active)] font-medium",
                )
              }
            >
              <Icon className="size-5 shrink-0" />
              {!collapsed ? (
                <>
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.badge != null ? (
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e8e8e8] text-xs font-medium">
                      {item.badge}
                    </span>
                  ) : null}
                </>
              ) : item.badge != null ? (
                <span className="absolute right-1 top-1 size-2 rounded-full bg-[var(--dash-ink)]" />
              ) : null}
            </NavLink>
          );
        })}
      </nav>

      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={onToggle}
        className="absolute top-1/2 -right-3 z-10 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[var(--dash-border)] bg-white text-[var(--dash-ink)] shadow-sm"
      >
        {collapsed ? (
          <HiOutlineChevronRight className="size-3.5" />
        ) : (
          <HiOutlineChevronLeft className="size-3.5" />
        )}
      </button>

      <div className="mt-4 flex flex-col gap-3 border-t border-[var(--dash-border)] pt-4">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--dash-ink)] hover:bg-[var(--dash-active)]",
            collapsed && "justify-center px-2",
          )}
        >
          <HiOutlineArrowLeftOnRectangle className="size-5 shrink-0" />
          {!collapsed ? <span>Logout</span> : null}
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[var(--dash-active)]",
            collapsed && "justify-center px-2",
          )}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--dash-active)]">
            <HiOutlineShieldCheck className="size-5" />
          </span>
          {!collapsed ? (
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-[var(--dash-muted)]">
                Welcome back 👋
              </span>
              <span className="block truncate text-sm font-medium text-[var(--dash-ink)]">
                {adminProfile.name}
              </span>
            </span>
          ) : null}
        </button>
      </div>
    </aside>
  );
};
