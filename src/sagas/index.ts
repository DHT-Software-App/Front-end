import { all } from "redux-saga/effects";
import { employeeSaga } from "./src/employeeSaga";
import { authSaga } from "./src/authSaga";
import {customerSaga } from "./src/customerSaga";
import {clientSaga} from "./src/clientSaga"
import {insuranceCompanySaga} from "./src/insuranceCompanySaga"

export default function* rootSaga() {
	yield all([employeeSaga(), authSaga(), customerSaga(), clientSaga(), insuranceCompanySaga()]);
}