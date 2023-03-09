import "./css/styles.css";
import debounce from "lodash.debounce";
import { Notify } from "notiflix";
import { fetchCountries } from "./fetchCountries.js";

const inputbox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryCard = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;

inputbox.addEventListener(
	"input",
	debounce(() => {
		if (!inputbox.value.trim()) {
			countryList.innerHTML = "";
			countryCard.innerHTML = "";
			return;
		}
		fetchCountries(inputbox.value)
			.then((recivedData) => {
				if (recivedData.length > 10) {
					Notify.info(
						"Too many matches found. Please enter a more specific name.",
					);
					return;
				}
				if (recivedData.length > 1) {
					countryCard.innerHTML = "";
					createCountryList(recivedData);
					return;
				}
				countryList.innerHTML = "";
				createCountryCard(...recivedData);
			})
			.catch(() => {
				Notify.failure("Oops, there is no country with that name");
			});
	}, DEBOUNCE_DELAY),
);
function createCountryList(array) {
	const markup = array
		.map(
			({ flags, name }) =>
				`<li><img src="${flags.svg}" alt="${flags.alt}" />
			<p>${name.common}</p></li>`,
		)
		.join("");
	countryList.innerHTML = markup;
}
function createCountryCard({ flags, name, capital, population, languages }) {
	countryCard.innerHTML = `
		<div><img src=${flags.svg} alt=${flags.alt}/>
		<h3>${name.common}<h3></div>
		<div><h4>Capital:</h4><p>${capital}</p></div>
		<div><h4>Population:</h4><p>${population}</p></div>
		<div><h4>Languages:</h4><p> ${Object.values(languages).join(
			", ",
		)}</p></div>`;
}
