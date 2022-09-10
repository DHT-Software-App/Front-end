import { Job } from "types/Job";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	jobs: Job[];
	authenticated?: Job;
	loading: boolean;
	errors?: Error[];
	success?: SuccessResponse;
} = {
	jobs: [],
	loading: false,
};

export const jobReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// GET ALL
		case "@get/jobs/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/jobs/success": {
			const { jobs } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				jobs,
			};
		}

		case "@get/jobs/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// GET ONE
		case "@get/job/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/job/success": {
			const { job } = payload;

			return {
				...state,
				loading: false,
				errors: null,
			};
		}

		case "@get/job/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// CREATE
		case "@create/job/request": {
			return { ...state, loading: true };
		}

		case "@create/job/success": {
			const { success, job } = payload;
	
			return {
				...state,
				loading: false,
				errors: null,
				jobs: [...state.jobs, job],
				success,
			};
		}

		case "@create/job/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// UPDATE
		case "@update/job/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@update/job/success": {
			const { job: updated_job, success } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				jobs: state.jobs.map((job) =>
					job.id == updated_job.id ? updated_job : job
				),
				success,
			};
		}

		case "@update/job/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// DELETE
		case "@delete/job/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@delete/job/success": {
			const { id, success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				jobs: state.jobs.filter((job) => job.id !== id),
				success,
			};
		}

		case "@delete/job/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// clean

		case "@clear/job/errors": {
			return {
				...state,
				errors: null,
			};
		}

		case "@clear/job/success": {
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