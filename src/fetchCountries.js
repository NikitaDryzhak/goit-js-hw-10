export default function fetchCountries(name) {
const options = `?fields=name,capital,population,flags,languages`
const address = 'https://restcountries.com/v3.1/name/';
  return  fetch(`${address}${name}${options}`).then(r => {
            if (!r.ok) {
                throw new Error(r.status) };
            return r.json();
        }); 
}