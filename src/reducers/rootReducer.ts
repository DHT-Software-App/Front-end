import { combineReducers } from "redux";

import { reducer as auth } from "./auth";
import { reducer as customer } from "./customers"
import { reducer as client } from "./clients"
import { reducer as city } from "./cities";

const reducers = combineReducers({
	auth,
	customer,
	client,
	city
});

export default reducers;