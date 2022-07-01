import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { clientSaga } from "./client";
import { customerSaga } from "./customer";
 
export default function* rootSaga() {
	yield all([authSaga(), customerSaga(), clientSaga()]);
}