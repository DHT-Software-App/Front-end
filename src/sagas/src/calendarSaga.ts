import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_calendar_success,
	update_calendar_success,
	delete_calendar_success,
	get_calendars_success,
	create_calendar_failure,
	delete_calendar_failure,
	get_calendars_failure,
} from "actions/calendar";
import { Calendar } from "types/Calendar";
import { CalendarService } from "services/CalendarService";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { CalendarEnum } from "enum/CalendarEnum";

function* getAll(action: any): any {
	try {
		const { access_token } = action.payload;
		const calendars: Calendar[] = yield call(
			CalendarService.getAll,
			access_token
		);

		yield put(get_calendars_success(calendars));
	} catch (errors) {
		yield put(get_calendars_failure(errors as Error[]));
	}
}

function* create(action: any): any {
	try {
		const { calendar, access_token } = action.payload;

		const new_calendar: Calendar = yield call(
			CalendarService.create,
			calendar,
			access_token
		);

		const message: SuccessResponse = {
			message: "Calendar created successfully",
			success: true,
			code: CalendarEnum.CREATED,
		};

		yield put(create_calendar_success(new_calendar, message));

	} catch (errors) {
		yield put(create_calendar_failure(errors as Error[]));
	}
}

function* update(action: any): any {
	try {
		const { calendar, access_token } = action.payload;

		const updated_calendar: Calendar = yield call(
			CalendarService.update,
			calendar,
			access_token
		);

		const message: SuccessResponse = {
			message: "Calendar updated successfully.",
			success: true,
			code: CalendarEnum.UPDATED,
		};

		yield put(update_calendar_success(updated_calendar, message));
	} catch (errors) {
		yield put(create_calendar_failure(errors as Error[]));
	}
}

function* remove(action: any): any {
	try {
		const { id, access_token } = action.payload;

		const success: SuccessResponse = yield call(
			CalendarService.delete,
			id,
			access_token
		);

		yield put(delete_calendar_success(id, success));
	} catch (errors) {
		yield put(delete_calendar_failure(errors as Error[]));
	}
}

export function* calendarSaga() {
	yield takeEvery("@get/calendars/request", getAll);
	yield takeEvery("@create/calendar/request", create);
	yield takeEvery("@update/calendar/request", update);
	yield takeEvery("@delete/calendar/request", remove);
}