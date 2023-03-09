export const fetchCountries = (name) => {
	const fetchCountry = fetch(
		`https://restcountries.com/v3.1/name/${name.trim()}?fields=name,capital,population,flags,languages`,
	);
	return fetchCountry.then((response) => {
		const data = response.json();
		return data;
	});
};
