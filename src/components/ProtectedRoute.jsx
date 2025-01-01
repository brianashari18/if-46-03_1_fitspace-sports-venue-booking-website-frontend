import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    const expiredAt = localStorage.getItem("expired_at");

    console.log(`EXP: ${expiredAt}`);

    const isTokenValid = token && expiredAt && new Date(expiredAt) > new Date();

    if (isTokenValid) {
        return <Outlet />;
    } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expired_at");
        localStorage.removeItem("user");
        return <Navigate to="/sign-in" replace />;
    }
};

export default ProtectedRoute;
