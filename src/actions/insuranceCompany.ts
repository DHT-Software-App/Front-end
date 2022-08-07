import { InsuranceCompany } from "types/InsuranceCompany";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// GET ALL
export const get_insurance_companies_request = (access_token: string) => ({
	type: "@get/insurance_companies/request",
	payload: {
		access_token,
	},
});

export const get_insurance_companies_success = (insuranceCompanies: InsuranceCompany[]) => ({
	type: "@get/insurance_companies/success",
	payload: {
		insuranceCompanies,
	},
});

export const get_insurance_companies_failure = (errors: Error[]) => ({
	type: "@get/insurance_companies/failure",
	payload: {
		errors,
	},
});

// GET ONE
export const get_insurance_company_request = (id: number, access_token: string) => ({
	type: "@get/insurance_company/request",
	payload: {
		id,
	},
});

export const get_insurance_company_success = (insuranceCompany: InsuranceCompany) => ({
	type: "@get/insurance_company/success",
	payload: {
		insuranceCompany,
	},
});

export const get_insurance_company_failed = (errors: Error[]) => ({
	type: "@get/insurance_company/success",
	payload: {
		errors,
	},
});

// CREATE
export const create_insurance_company_request = (
	insuranceCompany: InsuranceCompany,
	access_token: string
) => ({
	type: "@create/insurance_company/request",
	payload: {
		insuranceCompany,
		access_token,
	},
});

export const create_insurance_company_success = (
	insuranceCompany: InsuranceCompany,
	success?: SuccessResponse
) => ({
	type: "@create/insurance_company/success",
	payload: {
		insuranceCompany,
		success,
	},
});

export const create_insurance_company_failure = (errors: Error[]) => ({
	type: "@create/insurance_company/failure",
	payload: {
		errors,
	},
});

// UPDATE
export const update_insurance_company_request = (
	insuranceCompany: InsuranceCompany,
	access_token: string
) => ({
	type: "@update/insurance_company/request",
	payload: {
		insuranceCompany,
		access_token,
	},
});

export const update_insurance_company_success = (
	insuranceCompany: InsuranceCompany,
	success?: SuccessResponse
) => ({
	type: "@update/insurance_company/success",
	payload: {
		insuranceCompany,
		success,
	},
});

export const update_insurance_company_failure = (errors: Error[]) => ({
	type: "@update/insurance_company/failure",
	payload: {
		errors,
	},
});

// DELETE
export const delete_insurance_company_request = (id: number, access_token: string) => ({
	type: "@delete/insurance_company/request",
	payload: {
		id,
		access_token,
	},
});

export const delete_insurance_company_success = (
	id: number,
	success?: SuccessResponse
) => ({
	type: "@delete/insurance_company/success",
	payload: {
		success,
		id,
	},
});

export const delete_insurance_company_failure = (errors: Error[]) => ({
	type: "@delete/insurance_company/failure",
	payload: {
		errors,
	},
});

// Clean actions
export const clear_insurance_company_errors = () => ({
	type: "@clear/insurance_company/errors",
});

export const clear_insurance_company_success = () => ({
	type: "@clear/insurance_company/success",
});