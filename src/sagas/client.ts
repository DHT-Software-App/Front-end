import { updateCityFailed } from "reducers/cities";
import { createClientFailed, createClientSuccess, CREATE_CLIENT_REQUEST, deleteClientFailed, deleteClientSuccess, DELETE_CLIENT_REQUEST, getAllClientFailed, getAllClientSuccess, GET_ALL_CLIENT_REQUEST, updateClientSuccess, UPDATE_CLIENT_REQUEST } from "reducers/clients";
import { call, put, takeEvery } from "redux-saga/effects";
import { ClientService } from "services/ClientService";

// ClientService instance
const clientService = new ClientService();

function* all(action:any) : any {
  try {
    const { accessToken } = action.payload;

    const { clients }= yield call(clientService.all, accessToken);

    yield put(getAllClientSuccess(clients));
  } catch (error) {
    yield put(getAllClientFailed(error));
  }
}

function* create(action:any) : any {
  try {
    const { client, accessToken } = action.payload;

    const { success, newClient }= yield call(clientService.create, client, accessToken);

    yield put(createClientSuccess(newClient, success));
  } catch (error) {
    yield put(createClientFailed(error));
  }
}

function* update(action:any) : any {
  try {
    const { client, accessToken } = action.payload;

    const { updatedClient, success }= yield call(clientService.update, client, accessToken);

    yield put(updateClientSuccess(updatedClient, success));
  } catch (error) {
    yield put(updateCityFailed(error));
  }
}

function* remove(action: any) : any {
  try {
    const { id, accessToken } = action.payload;

    const { success }= yield call(clientService.remove, id, accessToken);

    yield put(deleteClientSuccess(id, success));
  } catch (error) {
    yield put(deleteClientFailed(error));
  }
}

export function* clientSaga() {
  yield takeEvery(CREATE_CLIENT_REQUEST, create);
  yield takeEvery(GET_ALL_CLIENT_REQUEST,all);
  yield takeEvery(UPDATE_CLIENT_REQUEST, update);
  yield takeEvery(DELETE_CLIENT_REQUEST, remove);
}