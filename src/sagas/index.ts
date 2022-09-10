import { all } from "redux-saga/effects";
import { employeeSaga } from "./src/employeeSaga";
import { authSaga } from "./src/authSaga";
import {customerSaga } from "./src/customerSaga";
import {clientSaga} from "./src/clientSaga"
import {insuranceCompanySaga} from "./src/insuranceCompanySaga"
import {workTypeSaga} from "./src/workSaga"
import {jobSaga} from "./src/jobSaga"
import {calendarSaga} from "./src/calendarSaga"

export default function* rootSaga() {
	yield all([
		employeeSaga(), 
		authSaga(),
		customerSaga(), 
		clientSaga(), 
		insuranceCompanySaga(), 
		workTypeSaga(), 
		jobSaga(),
		calendarSaga()
	]);
}