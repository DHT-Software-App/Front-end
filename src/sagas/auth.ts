import { AUTH_SIGN_REQUEST, signAuthFailed, signAuthSuccess } from "reducers/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import { AuthService } from "services/AuthService";
import { setCookie } from "utils/cookies/cookies";

// AuthService instance
const authService = new AuthService();

function* sign(action:any) : any {
  try {
    const { user } = action.payload;

    const { accessToken } = yield call(authService.sign, user);

    setCookie('access-token', accessToken, 5000);

    yield put(signAuthSuccess(accessToken));
  } catch (error) {
    yield put(signAuthFailed(error));
  }
}

export function* authSaga() {
  yield takeEvery(AUTH_SIGN_REQUEST, sign);
}