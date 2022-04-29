import { Account } from "types/Account";

export class AccountService {
	static async get(account_id: number): Promise<Account> {
		// get information of account without password
		try {
			return {};
		} catch (error) {
			return {};
		}
	}

	static async create(account: Account): Promise<Account> {
		try {
			return {};
		} catch (error) {
			return {};
		}
	}

	static async update(account: Account): Promise<Account> {
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
