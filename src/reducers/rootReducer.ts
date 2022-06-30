import { combineReducers } from "redux";

import { reducer as auth } from "./auth";
import { reducer as customer } from "./customers"

const reducers = combineReducers({
	auth,
	customer
});

export default reducers;