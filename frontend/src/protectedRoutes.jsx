import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, loading }) => {
  if (loading) {
    return "";
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
