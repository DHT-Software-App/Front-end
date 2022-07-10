import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { clientSaga } from "./client";
import { customerSaga } from "./customer";
import { citySaga } from "./city"
import { stateSaga } from "./state"
 
export default function* rootSaga() {
	yield all([authSaga(), customerSaga(), clientSaga(), citySaga(), stateSaga()]);
}