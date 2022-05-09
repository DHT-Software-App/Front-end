import "cookie-store";

export const syncAuthStore = async (token: string) => {
	await window.cookieStore.set("auth-token", token);
};
