import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Employee } from "types/Employee";

export const useCan = () => {
	const { employee: authEmployee }: { employee: Employee } = useSelector(
		({ auth }: any) => auth
	);

	const [displays, setDisplays] = useState<any>({});
	const [unloadCan, setUnloadCan] = useState<boolean>(false);

	useEffect(() => {
		if (authEmployee) {
			const feed: any = {};

			for (let abilitiy of authEmployee.abilities!) {
				const [action] = abilitiy.name?.split(":")!;

				if (action in feed && !feed[action].includes(abilitiy.title)) {
					feed[action] = [...feed[action], abilitiy.title];
				} else {
					feed[action] = [abilitiy.title];
				}
			}

			setDisplays(feed);
			setUnloadCan(true);
		}
	}, [authEmployee]);

	const can = (verb: string, module: string) => {
		return !!displays[verb]?.includes(module);
	};

	return {
		can,
		unloadCan,
	};
};
