import { combineReducers } from "redux";
import { employeeReducer } from "./src/employee";
import { authReducer } from "./src/auth";
import { accountReducer } from "./src/account";

const reducer = combineReducers({
	employee: employeeReducer,
	auth: authReducer,
	account: accountReducer,
});

export default reducer;
