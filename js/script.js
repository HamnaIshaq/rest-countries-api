const container = document.querySelector('.container');
const countries = document.querySelector('.countries');
const filterInput = document.querySelector('#country-searched');
const filterRegion = document.querySelector('#region');
const searchCountry = document.querySelector('#search-country');


fetchAllCountries();

// add event listener on filter input
document.addEventListener('DOMContentLoaded', loadContent);
function loadContent() {

  // filter countries by input
  filterInput.addEventListener('keyup', filterCountries);
  // filter countries by region
  filterRegion.addEventListener('change', filterCountriesByRegion);
  // show country details
  const countryContainer = document.querySelectorAll('.country-container');
    
}

function filterCountries() {
  // get input value
  let filterValue = filterInput.value.toLowerCase();

  const country = countries.querySelectorAll('.country-container');

  country.forEach((country) => {
    const h3 = country.querySelector('.country-name');

    if (h3.textContent.toLowerCase().indexOf(filterValue) > -1) {
      country.style.display = '';
    }
    else {
      country.style.display = 'none';
    }
  });
}

function showCountryDetails(countryContainer) {
  console.log(countryContainer)
}

// filter region using select
function filterCountriesByRegion() {
  let regionSelected = filterRegion.options[filterRegion.selectedIndex].value;

  if(regionSelected !== '') {
    const country = countries.querySelectorAll('.country-container');
    
    country.forEach((country) => {
    const countryRegion = country.querySelector('.country-region');

    if (countryRegion.textContent.toLowerCase().indexOf(regionSelected) > -1) {
      country.style.display = '';
    }
    else {
      country.style.display = 'none';
    }
  });

  }
}

// show all the data on dom load

async function fetchAllCountries() {
  const response = await fetch('https://restcountries.eu/rest/v2/all');
  const data = await response.json();

  if (data) {
    //const {name, flag, capital, population, region} = data;
    //flag, name, population, region, capital
    showAllCountries(data);
  }

  else {
    console.log('please wait');
    //loading screen
  }

}

function showAllCountries(data) {
  let countryData = data.map((item) => {
    return `
      <div class="country-container">
        <a href="countryInfo.html?country=${item.alpha3Code}" class="country-link">
          <div class="country-img-container">
            <img class="country-img" src=${item.flag} alt="country">
          </div>
          <div class="country-info-container">
            <h3 class="country-name">${item.name}</h3>
            <p><strong>Population:</strong> <span>${item.population}</span></p>
            <p><strong>Region:</strong> <span class="country-region">${item.region}</span></p>
            <p><strong>Capital:</strong> <span>${item.capital}</span></p>
          </div>
        </a>
      </div>
    `;
  });
  countries.innerHTML = countryData.join('');
}