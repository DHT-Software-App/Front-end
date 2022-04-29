import { Account } from "./Account";
import { Role } from "./Role";

export interface Employee {
	id?: number;
	first_name?: string;
	last_name?: string;
	email_address?: string;
	contact_1?: string;
	contact_2?: string;
	state?: string;
	street?: string;
	city?: string;
	zip?: number;
	status?: "active" | "desactive";
	role?: Role;
	account?: Account;
}
