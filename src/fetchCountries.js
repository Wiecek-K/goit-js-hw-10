// import { Notify } from "notiflix";
export const fetchCountries = (name) => {
	// if (!name.trim()) {
	// 	return;
	// }
	const fetchCountry = fetch(
		`https://restcountries.com/v3.1/name/${name.trim()}?fields=name,capital,population,flags,languages`,
	);

	return fetchCountry.then((response) => {
		const data = response.json();
		return data;
	});
	// .then((recivedCountryData) => {
	// 	// console.log("wewnetrzny", recivedCountryData);
	// 	return recivedCountryData;
	// })
	// .catch(() => {
	// 	Notify.failure("Rejected promise  in ms");
	// })
};
