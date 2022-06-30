import { createCustomerFailed, createCustomerSuccess, CREATE_CUSTOMER_REQUEST, getAllCustomerFailed, getAllCustomerSuccess, GET_ALL_CUSTOMER_REQUEST } from "reducers/customers";
import { call, put, takeEvery } from "redux-saga/effects";
import { CustomerService } from "services/CustomerService";

// CustomerService instance
const customerService = new CustomerService();

function* all(action:any) : any {
  try {
    const { accessToken } = action.payload;

    const { customers }= yield call(customerService.all, accessToken);

    yield put(getAllCustomerSuccess(customers));
  } catch (error) {
    yield put(getAllCustomerFailed(error));
  }
}

function* create(action:any) : any {
  try {
    const { customer, accessToken } = action.payload;

    const { success }= yield call(customerService.create, customer, accessToken);

    yield put(createCustomerSuccess(success));
  } catch (error) {
    yield put(createCustomerFailed(error));
  }
}

export function* customerSaga() {
  yield takeEvery(CREATE_CUSTOMER_REQUEST, create);
  yield takeEvery(GET_ALL_CUSTOMER_REQUEST,all);
}