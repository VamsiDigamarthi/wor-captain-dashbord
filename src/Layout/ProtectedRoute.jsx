import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { fetchProfile } from "../Redux/slice/profileSlice";
const ProtectedRoute = ({ allowedRoles }) => {
  const dispatch = useDispatch();
  const userRole = localStorage.getItem("role");
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (storedToken) dispatch(fetchProfile(storedToken));
  }, [dispatch, storedToken]);

  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  }
};

export default ProtectedRoute;
