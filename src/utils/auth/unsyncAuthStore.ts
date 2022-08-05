import { Cookie } from "utils/cookies/cookieEnum";

export const unsyncAuthStore = () => {
	document.cookie = `${Cookie.AuthenticationToken}=; max-age=0`;
};