import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AuthStateProps, cleanErrorFromAuth, signAuthRequest, signAuthSuccess, unAUTHORIZED } from "reducers/auth";
import { User } from "types/User";
import { getCookie } from "utils/cookies/cookies";

export const useAuth = () => {
  // read auth state
  const { isAuthenticated, loading, accessToken, error } : AuthStateProps = useSelector(({auth}:any) => auth);

  useEffect(() => {
      if(isAuthenticated == undefined) {
        const accessToken = getCookie('access-token');

        if(accessToken) {
          dispatch(signAuthSuccess(accessToken));
        } else {
          dispatch(unAUTHORIZED());
        }
       
      }

  }, [isAuthenticated]);

  // To dispatch actions
  const dispatch = useDispatch();

  const sign = (user: User) => {
    dispatch(signAuthRequest(user));
  }

  const cleanError = () => {
    dispatch(cleanErrorFromAuth());
  }

  return {
    isAuthenticated,
    sign,
    accessToken,
    loading,
    error,
    cleanError
  }
}