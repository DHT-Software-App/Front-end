import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_client_success,
	update_client_success,
	delete_client_success,
	get_clients_success,
	create_client_failure,
	delete_client_failure,
	get_clients_failure,
} from "actions/client";
import { Client } from "types/Client";
import { ClientService } from "services/ClientService";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { ClientEnum } from "enum/ClientEnum";

function* getAll(action: any): any {
	try {
		const { access_token } = action.payload;
		const clients: Client[] = yield call(
			ClientService.getAll,
			access_token
		);

		yield put(get_clients_success(clients));
	} catch (errors) {
		yield put(get_clients_failure(errors as Error[]));
	}
}

function* create(action: any): any {
	try {
		const { client, access_token } = action.payload;

		const new_client: Client = yield call(
			ClientService.create,
			client,
			access_token
		);

		const message: SuccessResponse = {
			message: "Client created successfully",
			success: true,
			code: ClientEnum.CREATED,
		};

		yield put(create_client_success(new_client, message));

	} catch (errors) {
		yield put(create_client_failure(errors as Error[]));
	}
}

function* update(action: any): any {
	try {
		const { client, access_token } = action.payload;

		const updated_client: Client = yield call(
			ClientService.update,
			client,
			access_token
		);

		const message: SuccessResponse = {
			message: "Client updated successfully.",
			success: true,
			code: ClientEnum.UPDATED,
		};

		yield put(update_client_success(updated_client, message));
	} catch (errors) {
		yield put(create_client_failure(errors as Error[]));
	}
}

function* remove(action: any): any {
	try {
		const { id, access_token } = action.payload;

		const success: SuccessResponse = yield call(
			ClientService.delete,
			id,
			access_token
		);

		yield put(delete_client_success(id, success));
	} catch (errors) {
		yield put(delete_client_failure(errors as Error[]));
	}
}

export function* clientSaga() {
	yield takeEvery("@get/clients/request", getAll);
	yield takeEvery("@create/client/request", create);
	yield takeEvery("@update/client/request", update);
	yield takeEvery("@delete/client/request", remove);
}