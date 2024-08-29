import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { refreshToken } = useSelector(state => state.auth);
    const sessionToken = sessionStorage.getItem("refreshToken");

    return refreshToken || sessionToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;