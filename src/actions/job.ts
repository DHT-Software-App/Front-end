import { Job } from "types/Job";
import { MetaResponse, RequestQueryParams } from "utils/params/query";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// GET ALL
export const get_jobs_request = (access_token: string, queryParams: RequestQueryParams<Job> = {}) => ({
	type: "@get/jobs/request",
	payload: {
		access_token,
		queryParams
	},
});

export const get_jobs_success = (jobs: Job[], meta: MetaResponse = {}) => ({
	type: "@get/jobs/success",
	payload: {
		jobs,
		meta
	},
});

export const get_jobs_failure = (errors: Error[]) => ({
	type: "@get/jobs/failure",
	payload: {
		errors,
	},
});

// GET ONE
export const get_job_request = (id: number, access_token: string) => ({
	type: "@get/job/request",
	payload: {
		id,
	},
});

export const get_job_success = (job: Job) => ({
	type: "@get/job/success",
	payload: {
		job,
	},
});

export const get_job_failed = (errors: Error[]) => ({
	type: "@get/job/success",
	payload: {
		errors,
	},
});

// CREATE
export const create_job_request = (
	job: Job,
	access_token: string
) => ({
	type: "@create/job/request",
	payload: {
		job,
		access_token,
	},
});

export const create_job_success = (
	job: Job,
	success?: SuccessResponse
) => ({
	type: "@create/job/success",
	payload: {
		job,
		success,
	},
});

export const create_job_failure = (errors: Error[]) => ({
	type: "@create/job/failure",
	payload: {
		errors,
	},
});

// UPDATE
export const update_job_request = (
	job: Job,
	access_token: string
) => ({
	type: "@update/job/request",
	payload: {
		job,
		access_token,
	},
});

export const update_job_success = (
	job: Job,
	success?: SuccessResponse
) => ({
	type: "@update/job/success",
	payload: {
		job,
		success,
	},
});

export const update_job_failure = (errors: Error[]) => ({
	type: "@update/job/failure",
	payload: {
		errors,
	},
});

// DELETE
export const delete_job_request = (id: number, access_token: string) => ({
	type: "@delete/job/request",
	payload: {
		id,
		access_token,
	},
});

export const delete_job_success = (
	id: number,
	success?: SuccessResponse
) => ({
	type: "@delete/job/success",
	payload: {
		success,
		id,
	},
});

export const delete_job_failure = (errors: Error[]) => ({
	type: "@delete/job/failure",
	payload: {
		errors,
	},
});

// Clean actions
export const clear_job_errors = () => ({
	type: "@clear/job/errors",
});

export const clear_job_success = () => ({
	type: "@clear/job/success",
});