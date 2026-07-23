import { Navigate } from "react-router";

export function RedirectToBrand() {
  return <Navigate to="/brand" replace />;
}

export function RedirectToHome() {
  return <Navigate to="/" replace />;
}
