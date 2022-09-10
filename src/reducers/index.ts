import { combineReducers } from "redux";
import { employeeReducer } from "./src/employee";
import { authReducer } from "./src/auth";
import { userReducer } from "./src/user";
import {customerReducer } from "./src/customer";
import { clientReducer} from "./src/client";
import { insuranceCompanyReducer } from "./src/insuranceCompany"
import { workTypeReducer } from "./src/workType"
import { jobReducer } from "./src/job"
import { calendarReducer } from "./src/calendar"

const reducer = combineReducers({
	employee: employeeReducer,
	auth: authReducer,
	account: userReducer,
	client: clientReducer,
	customer: customerReducer,
	insuranceCompany: insuranceCompanyReducer,
	workType: workTypeReducer,
	job: jobReducer,
	calendar: calendarReducer
});

export default reducer;