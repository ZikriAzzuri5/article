// // auth.js
// import { Navigate } from "react-router-dom";

// export const ProtectedRoute = ({ element }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return element;
// };

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (!allowedRoles.includes(role)) {
      navigate("*");
    }
  }, [token, role, allowedRoles, navigate]);

  // Render element jika token ada
  return token && allowedRoles.includes(role) ? element : null;
};
