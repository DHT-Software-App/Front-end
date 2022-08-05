import { signout_auth_request, sign_auth_request } from "actions/auth";
import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { Ability } from "types/Ability";
import { Employee } from "types/Employee";
import { User } from "types/User";
import { SuccessResponse } from "utils/Responses/SuccessResponse";

type AuthProps = {
	isAuthenticated: boolean;
	loading: boolean;
	auth: string;
	errors: Error[];
	success: SuccessResponse;
	employee: Employee;
};

export const useAuth = () => {
	const dispatch = useDispatch();

	const {
		isAuthenticated,
		loading,
		auth,
		errors,
		success,
		employee,
	}: AuthProps = useSelector(({ auth }: any) => auth);

	const [displays, setDisplays] = useState<any>({});

	useEffect(() => {
		if (auth && isExpired(auth)) {
			signout();
		}
	}, [auth]);

	useEffect(() => {
		if (employee?.abilities) {
			const abilitiesForVerb: any = {};

			employee.abilities.forEach(({ name, title }: Ability) => {
				const [verb] = name!.split(":");

				if (!abilitiesForVerb[verb]?.includes(title)) {
					abilitiesForVerb[verb] = [...(abilitiesForVerb[verb] ?? []), title];
				}
			});

			setDisplays(abilitiesForVerb);
		}
	}, [employee]);

	const sign = (user: User) => {
		dispatch(sign_auth_request(user));
	};

	const signout = () => {
		dispatch(signout_auth_request(auth));
	};

	const can = (verb: string, module: string) => {
		return !!displays[verb]?.includes(module);
	};

	return {
		isAuthenticated,
		loading,
		auth,
		errors,
		sign,
		signout,
		success,
		employee,
		can,
	};
};