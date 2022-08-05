import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducer from "reducers";
import saga from "sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer,
	middleware: [sagaMiddleware],
});




sagaMiddleware.run(saga);