import { CookieObserver } from "utils/cookies/cookieObserver";
import "cookie-store";

export const onAuthChanged = async (fn: (state: "open" | "closed") => void) => {
	const cookieObserver = new CookieObserver();
	cookieObserver.subscribe(
		"dht-auth-token",
		() => {
			fn("open");
		},
		() => {
			fn("closed");
		}
	);
};
