
// import { Navigate } from 'react-router-dom';

// const ProtectAdminRoute = ({ children }) => {
//   const user = JSON.parse(localStorage.getItem('loggedInUser'));

//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectAdminRoute;

import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const ProtectAdminRoute = ({ children }) => {
  const { admin, isAdminAuthenticated } = useAdmin();

  if (!isAdminAuthenticated || !admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectAdminRoute;

