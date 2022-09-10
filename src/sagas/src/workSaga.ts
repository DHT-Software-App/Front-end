import { call, put, takeEvery } from "redux-saga/effects";
import {
	get_work_types_success,
	get_work_types_failure,
} from "actions/workType";
import { WorkType } from "types/WorkType";
import { WorkTypeService } from "services/WorkTypeService";

function* getAll(action: any): any {
	try {
		const { access_token } = action.payload;
		const work_types: WorkType[] = yield call(
			WorkTypeService.getAll,
			access_token
		);

		yield put(get_work_types_success(work_types));
	} catch (errors) {
		yield put(get_work_types_failure(errors as Error[]));
	}
}

export function* workTypeSaga() {
	yield takeEvery("@get/work_types/request", getAll);
}