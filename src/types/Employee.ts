import { Ability } from "./Ability";
import { User } from "./User";
import { Role } from "./Role";

export interface Employee {
	id?: number;
	firstname?: string;
	lastname?: string;
	email_address?: string;
	contacts?: string[];
	state?: string;
	street?: string;
	city?: string;
	zip?: number;
	status?: "active" | "desactive";
	role?: Role;
	abilities?: Ability[];
	user?: User;
}