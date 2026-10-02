import { Navigate, Route, Routes } from "react-router-dom";
import { CheckEmailPage } from "@/pages/auth/CheckEmailPage";
import { CreatePasswordPage } from "@/pages/auth/CreatePasswordPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { LoginPage } from "@/pages/auth/LoginPage";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/check-email" element={<CheckEmailPage />} />
      <Route path="/create-password" element={<CreatePasswordPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
