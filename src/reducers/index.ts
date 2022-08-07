import { combineReducers } from "redux";
import { employeeReducer } from "./src/employee";
import { authReducer } from "./src/auth";
import { userReducer } from "./src/user";
import {customerReducer } from "./src/customer";
import { clientReducer} from "./src/client";
import { insuranceCompanyReducer } from "./src/insuranceCompany"

const reducer = combineReducers({
	employee: employeeReducer,
	auth: authReducer,
	account: userReducer,
	client: clientReducer,
	customer: customerReducer,
	insuranceCompany: insuranceCompanyReducer
});

export default reducer;