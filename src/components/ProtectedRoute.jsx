
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token"); // Or use sessionStorage
    return token ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
