export type InvalidAttribute = {
	title: string;
	detail: string;
	source: {
		pointer: string;
	};
};

export class InvalidAttributeError extends Error {
	public content: { attribute: string; detail: string };

	constructor(invalidAttribute: InvalidAttribute) {
		super();

		this.name = "InvalidAttributeError";

		const {
			source: { pointer },
			detail,
		} = invalidAttribute;

		this.content = {
			attribute: pointer.split("/").pop()!,
			detail,
		};
	}
}