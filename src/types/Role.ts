import { Permission } from "./Permission";

export interface Role {
	role_id?: number;
	name?: string;
	permissions?: Permission[];
}
