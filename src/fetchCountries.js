import axios from "axios";
import { Notify } from "notiflix";

export async function fetchCountries(name) {
	try {
		const request = await axios.get(
			`https://restcountries.com/v3.1/name/${name.trim()}?fields=name,capital,population,flags,languages`,
		);
		return request.data;
	} catch (err) {
		Notify.failure("Oops, there is no country with that name");
	}
}
