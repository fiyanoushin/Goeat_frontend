import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectAdminRoute = ({ children }) => {
  const { authUser } = useAuth();

  if (!authUser || authUser.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectAdminRoute;
