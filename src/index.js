import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector(`#search-box`);
const countryInfo = document.querySelector(`.country-info`);
const countryList = document.querySelector(`.country-list`);
let searchName = ``;
//
const renderCountry = data => {
  data
    .map(
      country => `<li>
  //         <svg class="/" width="10" height="16">
  //           <use href="${country.flags.svg}"></use>
  //         </svg>
  //         <p>${country.name.officialme}</p>
  //       </li>`
    )
    .join(``);
};
//
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
      } else if (countries.length >= 2 || countries.length <= 10) {
        countryList.insertAdjacentHTML('beforeend', renderCountry(countries));
      }
    })
    .catch(error => {
      console.log(`Error`);
    });
};

//
input.addEventListener(`input`, debounce(searchCountry, DEBOUNCE_DELAY));
