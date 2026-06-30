import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RoleRoute = ({ children, allow }) => {

    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return <p>Cargando sesión...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allow.includes(user?.role?.name)) {
        return <Navigate to="/" replace />;
    }

    return children
}

export default RoleRoute