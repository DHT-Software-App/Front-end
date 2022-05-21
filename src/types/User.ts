import { Profile } from "./Profile";

export interface User {
	id?: number;
	email?: string;
	email_verified_at?: any;
	password?: string;
	confirm_password?: string;
	profile?: Profile;
}
