import { Employee } from "types/Employee";
import { decodeToken } from "react-jwt";
import axios, { AxiosError, AxiosResponse } from "axios";

const { REACT_APP_BACKEND_API } = process.env;

export class EmployeeService {
	static async getAll(token: string): Promise<Employee[]> {
		try {
			const endpoint = `${REACT_APP_BACKEND_API}/employees`;

			const { data } = await axios.get(endpoint, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const employees: Employee[] = data.data.map((data: any) => {
				const { id, attributes } = data.data;

				const employee: Employee = { id, ...attributes };

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

	static async create(employee: Employee): Promise<Employee> {
		try {
			// api actions
			return {};
		} catch (error) {
			return {};
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
