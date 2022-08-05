import axios, { AxiosError, AxiosResponse } from "axios";
import { User } from "types/User";
import { HTTPResponse } from "utils/Responses/HTTPResponse";
import {
	InvalidAttribute,
	InvalidAttributeError,
} from "utils/errors/InvalidAttributeError";
import { Employee } from "types/Employee";
import { decodeToken } from "react-jwt";
import { Role } from "types/Role";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { ResponseError } from "utils/errors/ResponseError";

const { REACT_APP_BACKEND_API } = process.env;

export class AuthService {
	static async me(access_token: string): Promise<Employee | void> {
		try {
			const { employee_id } = decodeToken(access_token) as any;
			const endpoint = `${REACT_APP_BACKEND_API}/employees/${employee_id}?include=role,abilities,user,profile`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			const {
				data: { id, attributes },
				included,
			} = data;

			const employee: Employee = { id, ...attributes };

			included.map((data: any) => {
				const {
					data: { id, attributes, type },
					included,
				} = data;

				switch (type) {
					case "users": {
						const user: User = { id, ...attributes };

						included.map((data: any) => {
							const { id, attributes, type } = data;

							switch (type) {
								case "profiles":
									user.profile = { id, ...attributes };
									break;
							}
						});

						employee.user = user;
						break;
					}

					case "roles": {
						const role: Role = { id, ...attributes };

						employee.role = role;
						break;
					}

					case "abilities": {
						if (!employee.abilities) {
							employee.abilities = [];
						}

						employee.abilities = [
							...employee.abilities!,
							{ id, ...attributes },
						];
						break;
					}

					default:
						break;
				}
			});

			return employee;
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					// InvalidAttribute
					if (data.errors) {
						const { errors } = data;

						throw errors.map((error: {}) => {
							return new InvalidAttributeError(error as InvalidAttribute);
						});
					}

					if (data.code) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async sign(user: User): Promise<any> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/auth/login`;

			const {
				data: { access_token, expires_in: maxAge, success, message, code },
			} = await axios.post(endpoint, user, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			return {
				access_token,
				maxAge,
				success: {
					success,
					message,
					code,
				},
			};
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					// InvalidAttribute
					if (data.errors) {
						const { errors } = data;

						throw errors.map((error: {}) => {
							return new InvalidAttributeError(error as InvalidAttribute);
						});
					}

					if (data.code) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async signout(access_token: string): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/auth/logout`;

			const { data } = await axios.post(
				endpoint,
				{},
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);

			return data as SuccessResponse;
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					if (data.code) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async register(
		owner: Employee,
		access_token: string
	): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/employees/${owner.id}/user`;

			const { data } = await axios.post(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			return data as SuccessResponse;
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					// InvalidAttribute
					if (data.errors) {
						const { errors } = data;

						throw errors.map((error: {}) => {
							return new InvalidAttributeError(error as InvalidAttribute);
						});
					}

					if (data.code) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async resend(email: string): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/auth/resend/email/token`;

			const { data } = await axios.post(
				endpoint,
				{ email },
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);

			return data as SuccessResponse;
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					// InvalidAttribute
					if (data.errors) {
						const { errors } = data;

						throw errors.map((error: {}) => {
							return new InvalidAttributeError(error as InvalidAttribute);
						});
					}

					if (data.code) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async verifyPin(email_token: string): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/auth/verify/pin`;

			const { data } = await axios.post(
				endpoint,
				{ token: email_token },
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);
			return data as SuccessResponse;
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					if (data.code) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async verifyEmail(
		email_token: string
	): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/auth/email/verify`;

			// const { password, password_confirmation } = user;
			const { data } = await axios.post(
				endpoint,
				{
					token: email_token,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);

			return data as SuccessResponse;
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					if (data.code) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async forgetPassword(user: User): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/auth/forgot-password`;

			const { data } = await axios.post(
				endpoint,
				{ email: user.email },
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);
			return data as SuccessResponse;
		} catch (error) {
			if (error instanceof AxiosError) {
				const { status, data } = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					// InvalidAttribute
					if (data.errors) {
						const { errors } = data;

						throw errors.map((error: {}) => {
							return new InvalidAttributeError(error as InvalidAttribute);
						});
					}

					if (data.code) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}
}