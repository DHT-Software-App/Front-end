import { createCustomerFailed, createCustomerSuccess, CREATE_CUSTOMER_REQUEST, deleteCustomerFailed, deleteCustomerSuccess, DELETE_CUSTOMER_REQUEST, getAllCustomerFailed, getAllCustomerSuccess, GET_ALL_CUSTOMER_REQUEST, updateCustomerFailed, updateCustomerSuccess, UPDATE_CUSTOMER_REQUEST } from "reducers/customers";
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

function* update(action:any) : any {
  try {
    const { customer, accessToken } = action.payload;

    const { updatedCustomer, success }= yield call(customerService.update, customer, accessToken);

    yield put(updateCustomerSuccess(updatedCustomer, success));
  } catch (error) {
    yield put(updateCustomerFailed(error));
  }
}

function* remove(action: any) : any {
  try {
    const { id, accessToken } = action.payload;

    const { updatedCustomer, success }= yield call(customerService.remove, id, accessToken);

    yield put(deleteCustomerSuccess(updatedCustomer, success));
  } catch (error) {
    yield put(deleteCustomerFailed(error));
  }
}

export function* customerSaga() {
  yield takeEvery(CREATE_CUSTOMER_REQUEST, create);
  yield takeEvery(GET_ALL_CUSTOMER_REQUEST,all);
  yield takeEvery(UPDATE_CUSTOMER_REQUEST, update);
  yield takeEvery(DELETE_CUSTOMER_REQUEST, remove);
}