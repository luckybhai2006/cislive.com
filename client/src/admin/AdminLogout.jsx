import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_TOKEN_STORAGE_KEY } from "./AdminLogin";

export default function AdminLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    navigate("/admin-login", { replace: true });
  }, [navigate]);

  return null;
}

