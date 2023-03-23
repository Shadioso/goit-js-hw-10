import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector(`#search-box`);
const countryInfo = document.querySelector(`.country-info`);
const countryList = document.querySelector(`.country-list`);
let searchName = ``;

const searchCountry = evt => {
  searchName = input.value.trim();
  if (searchName === ``) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
  fetchCountries(searchName)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countries.length === 1) {
        countryInfo.insertAdjacentHTML(
          'beforeend',
          renderOneCountry(countries)
        );
      } else if (countries.length >= 2 || countries.length <= 10) {
        countryList.insertAdjacentHTML('beforeend', renderCountry(countries));
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};
//

function renderCountry(countries) {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
  const readyList = countries
    .map(({ name, flags }) => {
      return `<li class="country-list_item">
			  <img src="${flags.svg}" alt="Country flag" class ="country-list_img" width="25", height="25">
			  <span class="country-list_name">${name.official}</span>
		 </li>`;
    })
    .join('');
  return readyList;
}

function renderOneCountry(countries) {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
  const readyList = countries
    .map(({ name, flags, capital, languages, population }) => {
      return `<div class="container"><img src="${
        flags.svg
      }" alt="Country flag" class = "country_img" width="45" , height="40" />
      <h1>${name.official}</h1></div> 
      <ul class= "country-list">
        <li class="country_item">Capital:<span class="country_info">${capital}</span></li>
        <li class="country_item">Population:<span class="country_info">${population}</span></li>
        <li class="country_item">Languages:<span class="country_info">${Object.values(
          languages
        )}</span></li>
      </ul>`;
    })
    .join('');
  return readyList;
}

//
input.addEventListener(`input`, debounce(searchCountry, DEBOUNCE_DELAY));
