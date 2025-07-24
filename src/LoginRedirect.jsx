import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

const LoginRedirect = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      if (authUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [authUser, navigate]);

  return <Login />;
};

export default LoginRedirect;
