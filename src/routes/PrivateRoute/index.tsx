import { useAuth } from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getCookieValue } from "utils/cookies/getCookieValue";
import { Cookie } from "utils/cookies/cookieEnum";
import { signout_auth_success, sign_auth_success } from "actions/auth";
import { useDispatch } from "react-redux";

export const PrivateRoute = ({ children }: any) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const access_token = getCookieValue(Cookie.AuthenticationToken);

    if (access_token) {
      dispatch(sign_auth_success(access_token));
    } else {
      dispatch(signout_auth_success());
    }
  }, []);

  if (isAuthenticated == undefined) {
    return <>Loading Page</>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/sign" state={{ from: location }} replace />
  );
};