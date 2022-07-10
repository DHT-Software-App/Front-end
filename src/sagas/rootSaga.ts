import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { clientSaga } from "./client";
import { customerSaga } from "./customer";
import { citySaga } from "./city"
 
export default function* rootSaga() {
	yield all([authSaga(), customerSaga(), clientSaga(), citySaga()]);
}