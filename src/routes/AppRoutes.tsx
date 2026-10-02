import { Navigate, Route, Routes } from "react-router-dom";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { CheckEmailPage } from "@/pages/auth/CheckEmailPage";
import { CreatePasswordPage } from "@/pages/auth/CreatePasswordPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { NotificationsPage } from "@/pages/notifications/NotificationsPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { ReportsPage } from "@/pages/reports/ReportsPage";
import { ReviewBranchesPage } from "@/pages/review-branches/ReviewBranchesPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/check-email" element={<CheckEmailPage />} />
    <Route path="/create-password" element={<CreatePasswordPage />} />

    <Route
      path="/dashboard"
      element={
        <DashboardShell>
          <PlaceholderPage title="Dashboard" />
        </DashboardShell>
      }
    />
    <Route
      path="/bookings"
      element={
        <DashboardShell>
          <PlaceholderPage title="Booking list" />
        </DashboardShell>
      }
    />
    <Route
      path="/users"
      element={
        <DashboardShell>
          <PlaceholderPage title="Users" />
        </DashboardShell>
      }
    />
    <Route
      path="/admins"
      element={
        <DashboardShell>
          <PlaceholderPage title="Admins" />
        </DashboardShell>
      }
    />
    <Route
      path="/branches"
      element={
        <DashboardShell>
          <PlaceholderPage title="Branches" />
        </DashboardShell>
      }
    />
    <Route
      path="/review-branches"
      element={
        <DashboardShell>
          <ReviewBranchesPage />
        </DashboardShell>
      }
    />
    <Route
      path="/notifications"
      element={
        <DashboardShell>
          <NotificationsPage />
        </DashboardShell>
      }
    />
    <Route
      path="/reports"
      element={
        <DashboardShell>
          <ReportsPage />
        </DashboardShell>
      }
    />
    <Route
      path="/profile"
      element={
        <DashboardShell>
          <ProfilePage />
        </DashboardShell>
      }
    />

    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
