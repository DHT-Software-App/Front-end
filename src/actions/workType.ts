import { WorkType } from "types/WorkType";

// GET ALL
export const get_work_types_request = (access_token: string) => ({
	type: "@get/work_types/request",
	payload: {
		access_token
	},
});

export const get_work_types_success = (work_types: WorkType[]) => ({
	type: "@get/work_types/success",
	payload: {
		work_types,
	},
});

export const get_work_types_failure = (errors: Error[]) => ({
	type: "@get/work_types/failure",
	payload: {
		errors,
	},
});