import "cookie-store/dist/index";

export class CookieObserver {
	private cookies = new Map();

	constructor() {
		this.onChange();
	}

	onChange() {
		window.cookieStore.onchange = ({ changed, deleted } :any) => {
			changed.forEach((cookie: any) => {
				this.cookies.get(cookie.name)?.onCreated(cookie);
			});

			deleted.forEach((cookie: any) => {
				this.cookies.get(cookie.name)?.onDelete(cookie);
			});
		};
	}

	subscribe(name: string, onCreated: (cookie: any) => void, onDelete: (cookie: any) => void) {
		this.cookies.set(name, {
			onCreated,
			onDelete,
		});
	}

	unsuscribe(name: string) {
		this.cookies.delete(name);
	}
}