import { CookieObserver } from "utils/cookies/cookieObserver";
import "cookie-store";
import { Cookie } from "utils/cookies/cookieEnum";

export const onAuthChanged = async (fn: (token: string | null) => void) => {
	const cookieObserver = new CookieObserver();

	const authCookie = await window.cookieStore.get(Cookie.AuthenticationToken);

	// init
	if (authCookie) {
		const { value: token } = authCookie;
		fn(token);
	} else {
		fn(null);
	}

	// observer
	cookieObserver.subscribe(
		Cookie.AuthenticationToken,
		(cookie: any) => {
			const { value: token } = cookie;
			fn(token);
		},
		() => {
			fn(null);
		}
	);
};
