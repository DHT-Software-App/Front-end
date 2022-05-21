import { Employee } from "types/Employee";
import axios, { AxiosError, AxiosResponse } from "axios";
import { HTTPResponse } from "utils/Responses/HTTPResponse";
import {
	InvalidAttribute,
	InvalidAttributeError,
} from "utils/errors/InvalidAttributeError";
import { SuccessResponse } from "utils/Responses/SuccessResponse";
import { Role } from "types/Role";
import { User } from "types/User";

const { REACT_APP_BACKEND_API } = process.env;

export class EmployeeService {
	static async getAll(token: string): Promise<Employee[]> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/employees?include=role, user, profile`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const employees: Employee[] = data.data.map((data: any) => {
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
			});

			return employees;
		} catch (error) {
			return [];
		}
	}

	static async getById(id: number): Promise<Employee> {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	}

	static async create(
		employee: Employee,
		roleName: string,
		token: string
	): Promise<Employee | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/employees`;

			const { data: createdEmployee } = await axios.post(endpoint, employee, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const new_employee: Employee = {
				id: createdEmployee.data.id,
				...createdEmployee.data.attributes,
			};

			// assign role endpoint
			endpoint = `${endpoint}/${new_employee.id}/relationships/role`;

			const { data: assignedRole } = await axios.post(
				endpoint,
				{
					name: roleName,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			new_employee.role = {
				id: assignedRole.data.id,
				...assignedRole.data.attributes,
			};

			return new_employee;
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

	static async update(employee: Employee): Promise<Employee> {
		try {
			return {};
		} catch (error) {
			return {};
		}
	}

	static async delete(id: number): Promise<number> {
		try {
			return 0;
		} catch (error) {
			return 0;
		}
	}
}
