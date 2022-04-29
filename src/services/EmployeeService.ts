import { Employee } from "types/Employee";

export class EmployeeService {
	static async getAll(): Promise<Employee[]> {
		try {
			return [];
		} catch (error) {
			return [];
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
