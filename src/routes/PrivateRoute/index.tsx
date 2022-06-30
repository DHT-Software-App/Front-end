import { useAuth } from "hooks/useAuth"
import { Navigate, useLocation } from "react-router-dom";


export const PrivateRoute = ({ children }: any) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return isAuthenticated == undefined ?
    <>Loading....</>
    : isAuthenticated ? <>{children}</> : <Navigate to="/sign" state={{ from: location }} replace />
}