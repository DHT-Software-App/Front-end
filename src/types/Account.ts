import { Profile } from "./Profile";

export interface Account {
	id?: number;
	email_address?: string;
	password?: string;
	confirm_password?: string;
	profile?: Profile;
}
