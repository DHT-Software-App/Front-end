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
import { ResponseError } from "utils/errors/ResponseError";
import { MetaResponse, RequestQueryParams } from "utils/params/query";

const { REACT_APP_BACKEND_API } = process.env;

export class EmployeeService {
	static async getAll(access_token: string, requestQueryParams: RequestQueryParams<Employee>): Promise<{employees: Employee[], meta: MetaResponse} | undefined> {
		let queryParams: any = {};

		if(requestQueryParams.filter) {
			queryParams[`filter[${requestQueryParams.filter?.[0]}]`]  = requestQueryParams.filter?.[1]
		}

		if(requestQueryParams.order && requestQueryParams.orderBy) {
			queryParams['sort'] = (requestQueryParams.order == 'asc' ? '' : '-') + requestQueryParams.orderBy;
		}

		if(requestQueryParams.page) {
			queryParams['page'] = requestQueryParams.page;
		}

		if(requestQueryParams.per_page) {
			queryParams['per_page'] = requestQueryParams.per_page;
		}

		try {
			const endpoint = `${REACT_APP_BACKEND_API}/employees?include=role, user, profile`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				params: queryParams
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

			
			const meta: MetaResponse = {
					...data.meta
			}

			return {
				employees,
				meta
			};

		} catch (error) {
		
		}
	}

	static async getById(id: number, access_token: string): Promise<Employee> {
		try {
			return {};
		} catch (error) {
			throw error;
		}
	}

	static async create(
		employee: Employee,
		roleName: string,
		access_token: string
	): Promise<Employee | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/employees`;

			const { data: createdEmployee } = await axios.post(endpoint, employee, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
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
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
						Accept: "application/json",
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

					if (data.success) {
						throw [new ResponseError(data as SuccessResponse)];
					}
				}
			}
		}
	}

	static async update(
		employee: Employee,
		roleName: string,
		access_token: string
	): Promise<Employee | void> {
		try {
			let endpoint = `${REACT_APP_BACKEND_API}/employees/${employee.id}`;

			const { data } = await axios.put(
				`${endpoint}?include=role,abilities,user,profile`,
				employee,
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);

			const {
				data: { id, attributes },
				included,
			} = data;

			const updated_employee: Employee = { id, ...attributes };

			endpoint = `${endpoint}/relationships/role`;

			const { data: assignedRole } = await axios.post(
				endpoint,
				{
					name: roleName,
				},
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				}
			);

			updated_employee.role = {
				id: assignedRole.data.id,
				...assignedRole.data.attributes,
			};

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

						updated_employee.user = user;
						break;
					}

					case "abilities": {
						if (!updated_employee.abilities) {
							updated_employee.abilities = [];
						}

						updated_employee.abilities = [
							...updated_employee.abilities!,
							{ id, ...attributes },
						];
						break;
					}

					default:
						break;
				}
			});

			return updated_employee;
		} catch (error) {
			if (error instanceof AxiosError) {
				const {
					status,
					data: { errors },
				} = error.response as AxiosResponse;

				console.log(error);

				// BAD REQUEST
				if (status === HTTPResponse.BAD_REQUEST) {
					throw errors.map((error: {}) => {
						return new InvalidAttributeError(error as InvalidAttribute);
					});
				}
			}
		}
	}

	static async delete(
		id: number,
		access_token: string
	): Promise<SuccessResponse | void> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/employees/${id}`;

			const { data } = await axios.delete(endpoint, {
				headers: {
					Authorization: `Bearer ${access_token}`,
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			});

			return data as SuccessResponse;
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
}