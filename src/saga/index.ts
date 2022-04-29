import { all } from "redux-saga/effects";
import { employeeSaga } from "./src/employeeSaga";
import { authSaga } from "./src/authSaga";
import { accountSaga } from "./src/accountSaga";

export default function* rootSaga() {
	yield all([employeeSaga(), authSaga(), accountSaga()]);
}
