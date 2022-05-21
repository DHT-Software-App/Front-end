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

const { REACT_APP_BACKEND_API } = process.env;

export class AuthService {
	static async me(token: string): Promise<Employee> {
		try {
			const { employee_id } = decodeToken(token) as any;
			const endpoint = `${REACT_APP_BACKEND_API}/employees/${employee_id}?include=role,abilities,user,profile`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
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
			throw error;
		}
	}

	static async sign(user: User): Promise<any> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/auth/login`;

			const {
				data: { access_token: token, expires_in: maxAge },
			} = await axios.post(endpoint, user);

			return {
				token,
				maxAge,
			};
		} catch (error) {
			if (error instanceof AxiosError) {
				const {
					status,
					data: { errors },
				} = error.response as AxiosResponse;

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					throw errors.map((error: {}) => {
						return new InvalidAttributeError(error as InvalidAttribute);
					});
				}
			}
		}
	}

	static async register(
		owner: Employee,
		token: string
	): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/employees/${owner.id}/user`;

			const { data } = await axios.post(endpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			return data as SuccessResponse;
		} catch (error) {}
	}

	static async resend(email: string): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/auth/resend/email/token`;

			const { data } = await axios.post(endpoint, { email });

			return data as SuccessResponse;
		} catch (error) {}
	}
}
