import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null;
    }   

    return children;
}
export default ProtectedRoute;