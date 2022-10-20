import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_estimate_item_success,
	update_estimate_item_success,
	delete_estimate_item_success,
	get_estimate_items_success,
	create_estimate_item_failure,
	delete_estimate_item_failure,
	get_estimate_items_failure,
} from "actions/estimateItem";
import { EstimateItem } from "types/EstimateItem";
import { EstimateItemService } from "services/EstimateItemService";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { EstimateItemEnum } from "enum/EstimateItemEnum";

function* getAll(action: any): any {
	try {
		const { access_token, queryParams } = action.payload;
		const {estimate_items, meta}= yield call(
			EstimateItemService.getAll,
			access_token,
			queryParams
		);

		yield put(get_estimate_items_success(estimate_items, meta));
	} catch (errors) {
		yield put(get_estimate_items_failure(errors as Error[]));
	}
}

function* create(action: any): any {
	try {
		const { estimate_item, access_token } = action.payload;

		const new_estimate_item: EstimateItem = yield call(
			EstimateItemService.create,
			estimate_item,
			access_token
		);

		const message: SuccessResponse = {
			message: "Estimate Item created successfully",
			success: true,
			code: EstimateItemEnum.CREATED,
		};

		yield put(create_estimate_item_success(new_estimate_item, message));

	} catch (errors) {
		yield put(create_estimate_item_failure(errors as Error[]));
	}
}

function* update(action: any): any {
	try {
		const { estimate_item, access_token } = action.payload;

		const updated_estimate_item: EstimateItem = yield call(
			EstimateItemService.update,
			estimate_item,
			access_token
		);

		const message: SuccessResponse = {
			message: "Estimate Item updated successfully.",
			success: true,
			code: EstimateItemEnum.UPDATED,
		};

		yield put(update_estimate_item_success(updated_estimate_item, message));
	} catch (errors) {
		yield put(create_estimate_item_failure(errors as Error[]));
	}
}

function* remove(action: any): any {
	try {
		const { id, access_token } = action.payload;

		const success: SuccessResponse = yield call(
			EstimateItemService.delete,
			id,
			access_token
		);

		yield put(delete_estimate_item_success(id, success));
	} catch (errors) {
		yield put(delete_estimate_item_failure(errors as Error[]));
	}
}

export function* estimateItemSaga() {
	yield takeEvery("@get/estimate_items/request", getAll);
	yield takeEvery("@create/estimate_item/request", create);
	yield takeEvery("@update/estimate_item/request", update);
	yield takeEvery("@delete/estimate_item/request", remove);
}