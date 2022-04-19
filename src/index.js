import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

input.addEventListener('input', debounce(InputValue, DEBOUNCE_DELAY))


function InputValue() {
   const query = input.value.trim()
    fetchCountries(query).then(RenderList).catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name')
        console.log(error)
    })
    countryList.innerHTML = ''
    countryInfo.innerHTML= ''
}


function RenderList(country) {
    let markup;
    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return
    }
    if (country.length > 1) {
        markup = country.map(
            ({ flags: { png }, name: { common } }) => {
                return `<li class="country-item">
    <img class="item-img" src="${png}" alt="flag"/>
    <p class="name">${common}</p>
</li>`}).join('')
        countryList.insertAdjacentHTML('beforeend', markup)
    }
    if (country.length === 1) {
        markup = country.map(
            ({ flags, name, population, capital, languages }) => {
                return `<div class="country-card"><div class='country'>
                <img class="item-img" src="${flags.png}" alt="flag"/>
                <p class="country-name">${name.common}</p></div>
                <ul class='item-info'>
                <li><span class="info-key">Capital: </span>${capital}</li>
                <li><span class="info-key">Population: </span>${population}</li>
                <li><span class="info-key">Languages: </span>${Object.values(languages).join(', ')}</li>
                </ul></div>
                `}).join('')
        countryInfo.insertAdjacentHTML('afterbegin', markup)
    
    }
}
                