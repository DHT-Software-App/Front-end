import { Calendar } from "types/Calendar";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

const initialState: {
	calendars: Calendar[];
	authenticated?: Calendar;
	loading: boolean;
	errors?: Error[];
	success?: SuccessResponse;
} = {
	calendars: [],
	loading: false,
};

export const calendarReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	const { type, payload } = action;

	switch (type) {
		// GET ALL
		case "@get/calendars/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/calendars/success": {
			const { calendars } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				calendars,
			};
		}

		case "@get/calendars/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// GET ONE
		case "@get/calendar/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@get/calendar/success": {
			const { calendar } = payload;

			return {
				...state,
				loading: false,
				errors: null,
			};
		}

		case "@get/calendar/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// CREATE
		case "@create/calendar/request": {
			return { ...state, loading: true };
		}

		case "@create/calendar/success": {
			const { success, calendar } = payload;
	
			return {
				...state,
				loading: false,
				errors: null,
				calendars: [...state.calendars, calendar],
				success,
			};
		}

		case "@create/calendar/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// UPDATE
		case "@update/calendar/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@update/calendar/success": {
			const { calendar: updated_calendar, success } = payload;
			return {
				...state,
				loading: false,
				errors: null,
				calendars: state.calendars.map((calendar) =>
					calendar.id == updated_calendar.id ? updated_calendar : calendar
				),
				success,
			};
		}

		case "@update/calendar/failure": {
			const { errors } = payload;

			return {
				...state,
				loading: false,
				errors,
			};
		}

		// DELETE
		case "@delete/calendar/request": {
			return {
				...state,
				loading: true,
			};
		}

		case "@delete/calendar/success": {
			const { id, success } = payload;

			return {
				...state,
				loading: false,
				errors: null,
				calendars: state.calendars.filter((calendar) => calendar.id !== id),
				success,
			};
		}

		case "@delete/calendar/failure": {
			const { errors } = payload;
			return {
				...state,
				loading: false,
				errors,
			};
		}

		// clean

		case "@clear/calendar/errors": {
			return {
				...state,
				errors: null,
			};
		}

		case "@clear/calendar/success": {
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