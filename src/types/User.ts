import { Profile } from "./Profile";

export interface User {
	id?: number;
	email?: string;
	password?: string;
	confirm_password?: string;
	profile?: Profile;
}
