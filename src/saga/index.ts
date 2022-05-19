import { all } from "redux-saga/effects";
import { employeeSaga } from "./src/employeeSaga";
import { authSaga } from "./src/authSaga";
import { userSaga } from "./src/userSaga";

export default function* rootSaga() {
	yield all([employeeSaga(), authSaga(), userSaga()]);
}
