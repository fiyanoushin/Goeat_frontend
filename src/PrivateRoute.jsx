import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { authUser } = useAuth();

  if (!authUser) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(authUser.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

