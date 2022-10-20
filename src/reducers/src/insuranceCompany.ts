import { InsuranceCompany } from "types/InsuranceCompany";
import { MetaResponse } from "utils/params/query";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	insuranceCompanies: InsuranceCompany[];
	authenticated?: InsuranceCompany;
	loading: boolean;
	errors?: Error[];
	success?: SuccessResponse;
	meta: MetaResponse;
} = {
	insuranceCompanies: [],
	loading: false,
	meta: {}
};

export const insuranceCompanyReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// GET ALL
		case "@get/insurance_companies/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/insurance_companies/success": {
			const { insuranceCompanies, meta } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				insuranceCompanies,
				meta
			};
		}

		case "@get/insurance_companies/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// GET ONE
		case "@get/insurance_company/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/insurance_company/success": {
			const { insuranceCompany } = payload;

			return {
				...state,
				loading: false,
				errors: null,
			};
		}

		case "@get/insurance_company/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// CREATE
		case "@create/insurance_company/request": {
			return { ...state, loading: true };
		}

		case "@create/insurance_company/success": {
			const { success, insuranceCompany } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				insuranceCompanies: [...state.insuranceCompanies, insuranceCompany],
				success,
			};
		}

		case "@create/insurance_company/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// UPDATE
		case "@update/insurance_company/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@update/insurance_company/success": {
			const { insuranceCompany: updated_insurance_company, success } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				insuranceCompanies: state.insuranceCompanies.map((insuranceCompany) =>
					insuranceCompany.id == updated_insurance_company.id ? updated_insurance_company : insuranceCompany
				),
				success,
			};
		}

		case "@update/insurance_company/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// DELETE
		case "@delete/insurance_company/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@delete/insurance_company/success": {
			const { id, success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				insuranceCompanies: state.insuranceCompanies.filter((insuranceCompany) => insuranceCompany.id !== id),
				success,
			};
		}

		case "@delete/insurance_company/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// clean

		case "@clear/insurance_company/errors": {
			return {
				...state,
				errors: null,
			};
		}

		case "@clear/insurance_company/success": {
			return {
				...state,
				success: null,
			};
		}

		default: {
			return { ...state };
		}
	}
};