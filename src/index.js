import "./css/styles.css";
import debounce from "lodash.debounce";
import { Notify } from "notiflix";
import { fetchCountries } from "./fetchCountries.js";

const inputbox = document.querySelector("#search-box");
const contryList = document.querySelector(".country-list");
const contryCard = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;
inputbox.addEventListener(
	"input",
	debounce(() => {
		if (!inputbox.value.trim()) {
			return;
		}
		fetchCountries(inputbox.value)
			.then((recivedCountryData) => {
				console.log(recivedCountryData.length);
				if (recivedCountryData.length > 10) {
					Notify.info(
						"Too many matches found. Please enter a more specific name.",
					);
					return;
				}
				if (recivedCountryData.length > 1) {
					console.log("lista");
					return;
				}
				const [ourContry] = recivedCountryData;
				contryCard.innerHTML = `
				<div><img src=${ourContry.flags.svg} alt=${ourContry.flags.alt}/>
				<h3>${ourContry.name.official}<h3></div>
				<div><h4>Capital:</h4><p>${ourContry.capital}</p></div>
				<div><h4>Population:</h4><p>${ourContry.population}</p></div>
				<div><h4>Languages:</h4><p> ${Object.values(ourContry.languages).join(
					", ",
				)}</p></div>`;

				console.log(recivedCountryData);
			})
			.catch(() => {
				Notify.failure("Oops, there is no country with that name");
			});
	}, 300),
);
