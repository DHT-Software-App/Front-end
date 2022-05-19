import { combineReducers } from "redux";
import { employeeReducer } from "./src/employee";
import { authReducer } from "./src/auth";
import { userReducer } from "./src/user";

const reducer = combineReducers({
	employee: employeeReducer,
	auth: authReducer,
	account: userReducer,
});

export default reducer;
