import { Navigate, Outlet } from "react-router-dom";

const AdminVerification = () => {
    const token = localStorage.getItem("token");
    const expiredAt = localStorage.getItem("expired_at");
    const user = JSON.parse(localStorage.getItem("user"))

    console.log(`EXP: ${expiredAt}`);
    console.log(`user: ${user}`)
    console.log(`user: ${user.role}`)
    console.log(`user: ${user.first_name}`)

    const isTokenValid = token && expiredAt && new Date(expiredAt) > new Date();

    if (isTokenValid && user.role === "admin") {
        return <Outlet />;
    } else {
        return <Navigate to="/home" />;
    }
};

export default AdminVerification;
