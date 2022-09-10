import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_job_success,
	update_job_success,
	delete_job_success,
	get_jobs_success,
	create_job_failure,
	delete_job_failure,
	get_jobs_failure,
} from "actions/job";
import { Job } from "types/Job";
import { JobService } from "services/JobService";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { JobEnum } from "enum/JobEnum";

function* getAll(action: any): any {
	try {
		const { access_token } = action.payload;
		const jobs: Job[] = yield call(
			JobService.getAll,
			access_token
		);

		yield put(get_jobs_success(jobs));
	} catch (errors) {
		yield put(get_jobs_failure(errors as Error[]));
	}
}

function* create(action: any): any {
	try {
		const { job, access_token } = action.payload;

		const new_job: Job = yield call(
			JobService.create,
			job,
			access_token
		);

		const message: SuccessResponse = {
			message: "Job created successfully",
			success: true,
			code: JobEnum.CREATED,
		};

		yield put(create_job_success(new_job, message));

	} catch (errors) {
		yield put(create_job_failure(errors as Error[]));
	}
}

function* update(action: any): any {
	try {
		const { job, access_token } = action.payload;

		const updated_job: Job = yield call(
			JobService.update,
			job,
			access_token
		);

		const message: SuccessResponse = {
			message: "Job updated successfully.",
			success: true,
			code: JobEnum.UPDATED,
		};

		yield put(update_job_success(updated_job, message));
	} catch (errors) {
		yield put(create_job_failure(errors as Error[]));
	}
}

function* remove(action: any): any {
	try {
		const { id, access_token } = action.payload;

		const success: SuccessResponse = yield call(
			JobService.delete,
			id,
			access_token
		);

		yield put(delete_job_success(id, success));
	} catch (errors) {
		yield put(delete_job_failure(errors as Error[]));
	}
}

export function* jobSaga() {
	yield takeEvery("@get/jobs/request", getAll);
	yield takeEvery("@create/job/request", create);
	yield takeEvery("@update/job/request", update);
	yield takeEvery("@delete/job/request", remove);
}