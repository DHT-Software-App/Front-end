import { useAuth } from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	return isAuthenticated ? (
		<>{children}</>
	) : (
		<Navigate to="/sign" state={{ from: location }} replace />
	);
};
