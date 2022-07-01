import { getAllCityFailed, getAllCitySuccess, GET_ALL_CITY_REQUEST } from "reducers/cities";
import { call, put, takeEvery } from "redux-saga/effects";
import { CityService } from "services/CityService";

// CityService instance
const cityService = new CityService();

function* all(action:any) : any {
  try {
    const { accessToken } = action.payload;

    const { cities }= yield call(cityService.all, accessToken);

    yield put(getAllCitySuccess(cities));
  } catch (error) {
    yield put(getAllCityFailed(error));
  }
}

export function* customerSaga() {
  yield takeEvery(GET_ALL_CITY_REQUEST, all);
}