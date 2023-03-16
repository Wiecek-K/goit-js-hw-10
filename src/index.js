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
	debounce(async () => {
		if (!inputbox.value.trim()) {
			countryList.innerHTML = "";
			countryCard.innerHTML = "";
			return;
		}
		const recivedData = await fetchCountries(inputbox.value);
		console.log(recivedData);
		if (recivedData.length > 10) {
			Notify.info("Too many matches found. Please enter a more specific name.");
			return;
		}
		if (recivedData.length > 1) {
			countryCard.innerHTML = "";
			createCountryList(recivedData);
			return;
		}
		countryList.innerHTML = "";
		createCountryCard(...recivedData);
	}),
	DEBOUNCE_DELAY,
);

function createCountryList(array) {
	const markup = array
		.map(
			({ flags, name }) =>
				`<li data-name=${name.common}><img   src="${flags.svg}" alt="${flags.alt}"/>
			<p>${name.common}</p></li>`,
		)
		.join("");
	countryList.innerHTML = markup;
	countryList.addEventListener("click", selectCountry);
}
function createCountryCard({ flags, name, capital, population, languages }) {
	countryCard.innerHTML = `
		<div><img src=${flags.svg} alt=${flags.alt}/>
		<h3>${name.common}<h3></div>
		<div><h4>Capital:</h4><p>${capital}</p></div>
		<div><h4>Population:</h4><p>${convertBigNumbers(population)}</p></div>
		<div><h4>Languages:</h4><p> ${Object.values(languages).join(
			", ",
		)}</p></div>`;
}
function convertBigNumbers(x) {
	if (x < 1e3) {
		return x;
	}
	if (x < 1e6) {
		return `${Math.floor(x / 1000)}K ${x % 1000}`;
	}
	if (x < 1e9) {
		return `${Math.floor(x / 1e6)}M ${Math.floor((x % 1e6) / 1000)}K ${
			x % 1000
		}`;
	}
	return `${Math.floor(x / 1e9)}G ${Math.floor((x % 1e9) / 1e6)}M ${Math.floor(
		(x % 1e6) / 1e3,
	)}K ${x % 1000}`;
}
function selectCountry(event) {
	if (event.target.nodeName !== "LI") {
		console.log(event.target.nodeName);
		return;
	}
	const selectedCountry = event.target.dataset.name;
	fetchCountries(selectedCountry).then((recivedData) => {
		countryList.innerHTML = "";
		createCountryCard(...recivedData);
	});
}
