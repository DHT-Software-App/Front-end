import "cookie-store/dist/index";

export class CookieObserver {
	#cookies = new Map();

	constructor() {
		this.#onChange();
	}

	#onChange() {
		window.cookieStore.onchange = ({ changed, deleted }) => {
			changed.forEach((cookie) => {
				this.#cookies.get(cookie.name)?.onCreated(cookie);
			});

			deleted.forEach((cookie) => {
				this.#cookies.get(cookie.name)?.onDelete(cookie);
			});
		};
	}

	subscribe(name, onCreated, onDelete) {
		this.#cookies.set(name, {
			onCreated,
			onDelete,
		});
	}

	unsuscribe(name) {
		this.#cookies.delete(name);
	}
}