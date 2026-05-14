import { Navigate, useLocation } from "react-router-dom";
import { ADMIN_TOKEN_STORAGE_KEY } from "./AdminLogin";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);

  if (!token) {
    return (
      <Navigate
        to="/admin-login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

