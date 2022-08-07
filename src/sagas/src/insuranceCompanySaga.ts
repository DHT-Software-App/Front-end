import { call, put, takeEvery } from "redux-saga/effects";
import {
	create_insurance_company_success,
	update_insurance_company_success,
	delete_insurance_company_success,
	get_insurance_companies_success,
	create_insurance_company_failure,
	delete_insurance_company_failure,
	get_insurance_companies_failure,
} from "actions/insuranceCompany";
import { InsuranceCompany } from "types/InsuranceCompany";
import { InsuranceCompanyService } from "services/InsuranceCompanyService";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { InsuranceCompanyEnum } from "enum/InsuranceCompanyEnum";

function* getAll(action: any): any {
	try {
		const { access_token } = action.payload;
		const insurance_companies: InsuranceCompany[] = yield call(
			InsuranceCompanyService.getAll,
			access_token
		);

		yield put(get_insurance_companies_success(insurance_companies));
	} catch (errors) {
		yield put(get_insurance_companies_failure(errors as Error[]));
	}
}

function* create(action: any): any {
	try {
		const { insuranceCompany, access_token } = action.payload;

		const new_insurance_company: InsuranceCompany = yield call(
			InsuranceCompanyService.create,
			insuranceCompany,
			access_token
		);

		const message: SuccessResponse = {
			message: "Insurance Company added successfully",
			success: true,
			code: InsuranceCompanyEnum.CREATED,
		};

		yield put(create_insurance_company_success(new_insurance_company, message));

	} catch (errors) {
		yield put(create_insurance_company_failure(errors as Error[]));
	}
}

function* update(action: any): any {
	try {
		const { insuranceCompany, access_token } = action.payload;

		const updated_insurance_company: InsuranceCompany = yield call(
			InsuranceCompanyService.update,
			insuranceCompany,
			access_token
		);

		const message: SuccessResponse = {
			message: "Insurance Company updated successfully.",
			success: true,
			code: InsuranceCompanyEnum.UPDATED,
		};

		yield put(update_insurance_company_success(updated_insurance_company, message));
	} catch (errors) {
		yield put(create_insurance_company_failure(errors as Error[]));
	}
}

function* remove(action: any): any {
	try {
		const { id, access_token } = action.payload;

		const success: SuccessResponse = yield call(
			InsuranceCompanyService.delete,
			id,
			access_token
		);

		yield put(delete_insurance_company_success(id, success));
	} catch (errors) {
		yield put(delete_insurance_company_failure(errors as Error[]));
	}
}

export function* insuranceCompanySaga() {
	yield takeEvery("@get/insurance_companies/request", getAll);
	yield takeEvery("@create/insurance_company/request", create);
	yield takeEvery("@update/insurance_company/request", update);
	yield takeEvery("@delete/insurance_company/request", remove);
}