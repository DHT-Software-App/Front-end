import { Cookie } from "utils/cookies/cookieEnum";

export const syncAuthStore = (token: string, maxAge?: number) => {
	document.cookie = `${Cookie.AuthenticationToken}=${token}; max-age=${maxAge}`;
};