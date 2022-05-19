import { User } from "types/User";

export class UserService {
	static async get(user_id: number): Promise<User> {
		// get information of account without password
		try {
			return {};
		} catch (error) {
			return {};
		}
	}

	static async create(user: User): Promise<User> {
		try {
			return {};
		} catch (error) {
			return {};
		}
	}

	static async update(user: User): Promise<User> {
		try {
			return {};
		} catch (error) {
			return {};
		}
	}

	static async exists(email: string): Promise<boolean> {
		try {
			return false;
		} catch (error) {
			return false;
		}
	}
}
