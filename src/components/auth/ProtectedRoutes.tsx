import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const ProtectedRoutes: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  console.log("ProtectedRoutes token:", token);
  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
