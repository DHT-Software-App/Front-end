import { User } from "types/User";

// Initial State
export type AuthStateProps = {
  isAuthenticated?:boolean;
  accessToken?: string;
  loading: boolean;
  error?: any;
};

const initialState : AuthStateProps = {
  loading: false
}

// actions
export const AUTH_SIGN_REQUEST = 'AUTH_SIGN_REQUEST';
export const AUTH_SIGN_SUCCESS = 'AUTH_SIGN_SUCCESS';
export const AUTH_SIGN_FAILED = 'AUTH_SIGN_FAILED';
export const CLEAN_ERROR = 'CLEAN_ERROR';
export const UNAUTHORIZED = 'UNAUTHORIZED';

export const reducer = (state = initialState, action: { type: string; payload: any }) : AuthStateProps => {
  const { type, payload } = action;

	switch (type) {
    // REQUEST
    case AUTH_SIGN_REQUEST:
      return {
        ...state,
        loading: true
      };
    
    // SUCCESS
    case AUTH_SIGN_SUCCESS:
      const {accessToken} = payload;

      return {
        ...state,
        loading: false,
        error: null,
        accessToken,
        isAuthenticated: true
      }

    // FAILED
    case AUTH_SIGN_FAILED:
      const {error} = payload;

      return {
        ...state,
        loading: false,
        error
      }

    case UNAUTHORIZED: 
      return {
        ...state,
        isAuthenticated: false
      }

    // CLEAN
    case CLEAN_ERROR:
      return {
        ...state,
        error:null
      }

    default:
      return state;
  }
}

// actions creators
export const signAuthRequest = (user: User) => ({
  type: AUTH_SIGN_REQUEST,
  payload: {
    user
  }
});

export const signAuthSuccess = (accessToken: string) => ({
  type: AUTH_SIGN_SUCCESS,
  payload: {
    accessToken
  }
});

export const signAuthFailed = (error: any) => ({
  type: AUTH_SIGN_FAILED,
  payload: {
    error
  }
});

export const unAUTHORIZED  = () => ({
  type: UNAUTHORIZED,
})

// CLEAN
export const cleanErrorFromAuth = () => ({
  type: CLEAN_ERROR
})