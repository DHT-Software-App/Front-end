import { SuccessResponse } from "utils/Responses/SuccessResponse";

export class ResponseError extends Error {
	public content: SuccessResponse;

	constructor(success: SuccessResponse) {
		super();

		this.name = "ResponseError";

		this.content = success;
	}
}