import { getAllStateFailed, getAllStateSuccess, GET_ALL_STATE_REQUEST } from "reducers/states";
import { call, put, takeEvery } from "redux-saga/effects";
import { StateService } from "services/StateService";

// StateService instance
const stateService = new StateService();

function* all(action:any) : any {
  try {
    const { accessToken } = action.payload;

    const { states }= yield call(stateService.all, accessToken);

    yield put(getAllStateSuccess(states));
  } catch (error) {
    yield put(getAllStateFailed(error));
  }
}

export function* stateSaga() {
  yield takeEvery(GET_ALL_STATE_REQUEST, all);
}