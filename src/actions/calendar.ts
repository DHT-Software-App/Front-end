import { Calendar } from "types/Calendar";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

// GET ALL
export const get_calendars_request = (access_token: string) => ({
	type: "@get/calendars/request",
	payload: {
		access_token,
	},
});

export const get_calendars_success = (calendars: Calendar[]) => ({
	type: "@get/calendars/success",
	payload: {
		calendars,
	},
});

export const get_calendars_failure = (errors: Error[]) => ({
	type: "@get/calendars/failure",
	payload: {
		errors,
	},
});

// GET ONE
export const get_calendar_request = (id: number, access_token: string) => ({
	type: "@get/calendar/request",
	payload: {
		id,
	},
});

export const get_calendar_success = (calendar: Calendar) => ({
	type: "@get/calendar/success",
	payload: {
		calendar,
	},
});

export const get_calendar_failed = (errors: Error[]) => ({
	type: "@get/calendar/success",
	payload: {
		errors,
	},
});

// CREATE
export const create_calendar_request = (
	calendar: Calendar,
	access_token: string
) => ({
	type: "@create/calendar/request",
	payload: {
		calendar,
		access_token,
	},
});

export const create_calendar_success = (
	calendar: Calendar,
	success?: SuccessResponse
) => ({
	type: "@create/calendar/success",
	payload: {
		calendar,
		success,
	},
});

export const create_calendar_failure = (errors: Error[]) => ({
	type: "@create/calendar/failure",
	payload: {
		errors,
	},
});

// UPDATE
export const update_calendar_request = (
	calendar: Calendar,
	access_token: string
) => ({
	type: "@update/calendar/request",
	payload: {
		calendar,
		access_token,
	},
});

export const update_calendar_success = (
	calendar: Calendar,
	success?: SuccessResponse
) => ({
	type: "@update/calendar/success",
	payload: {
		calendar,
		success,
	},
});

export const update_calendar_failure = (errors: Error[]) => ({
	type: "@update/calendar/failure",
	payload: {
		errors,
	},
});

// DELETE
export const delete_calendar_request = (id: number, access_token: string) => ({
	type: "@delete/calendar/request",
	payload: {
		id,
		access_token,
	},
});

export const delete_calendar_success = (
	id: number,
	success?: SuccessResponse
) => ({
	type: "@delete/calendar/success",
	payload: {
		success,
		id,
	},
});

export const delete_calendar_failure = (errors: Error[]) => ({
	type: "@delete/calendar/failure",
	payload: {
		errors,
	},
});

// Clean actions
export const clear_calendar_errors = () => ({
	type: "@clear/calendar/errors",
});

export const clear_calendar_success = () => ({
	type: "@clear/calendar/success",
});