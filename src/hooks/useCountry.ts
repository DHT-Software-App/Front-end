import { useEffect, useState } from "react";
import { Country } from "types/Country";

export const useCountry = () => {
	const [country, setCountry] = useState<Country>();

	const getCurrentCountry = async () => {
		const response = await fetch("https://ipapi.co/json/");
		const country: Country = (await response.json()) as Country;

		setCountry(country);
	};

	return {
		getCurrentCountry,
		country,
	};
};