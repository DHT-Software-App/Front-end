import { combineReducers } from "redux";

import { reducer as auth } from "./auth";
import { reducer as customer } from "./customers"
import { reducer as client } from "./clients"

const reducers = combineReducers({
	auth,
	customer,
	client
});

export default reducers;