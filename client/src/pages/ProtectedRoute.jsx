import { Navigate } from "react-router-dom";
import Dashboard from "../admin/Dashboard";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token)

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Dashboard/>;
};

export default ProtectedRoute;
