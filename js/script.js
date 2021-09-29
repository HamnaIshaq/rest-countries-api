const container = document.querySelector('.container');
const countries = document.querySelector('.countries');
const filterInput = document.querySelector('#country-searched');
const filterRegion = document.querySelector('#region');
const searchCountry = document.querySelector('#search-country');

document.addEventListener('DOMContentLoaded', loadContent);

function loadContent() {
  // filter countries by input
  filterInput.addEventListener('keyup', filterCountries);
  // filter countries by region
  filterRegion.addEventListener('change', filterCountriesByRegion);
}

// Filter country by input
function filterCountries() {
  
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


(async function fetchAllCountries() {
  const response = await fetch('https://restcountries.com/v2/all');
  const data = await response.json();
  if (data) {
    showAllCountries(data);
  }
  else {
    // if data is not feteched from API
    // Show an error message
    
    countries.innerHTML = ` 
      <div style="margin: 0 auto;">
        <h2 style="text-align: center; font-size:3rem; margin: 0 0 0.5em 0;">Error: 500</h2>
        Request for countries data from https://restcountries.com/v2/all was unsuccessfull. Please try again later.
      </div>
    `;
  }
})()

function showAllCountries(data) {
  
  let countryData = data.map((item) => {
    return `
      <div class="country-container">
        <a href="countryInfo.html?country=${item.alpha3Code}" class="country-link">
          <div class="country-img-container">
            <img class="country-img" src=${item.flags.svg} alt="country">
          </div>
          <div class="country-info-container">
            <h3 class="country-name">${item.name}</h3>
            <p><strong>Population:</strong> <span>${item.population.toLocaleString()}</span></p>
            <p><strong>Region:</strong> <span class="country-region">${item.region}</span></p>
            <p><strong>Capital:</strong> <span>${item.capital}</span></p>
          </div>
        </a>
      </div>
    `;
  });
  countries.innerHTML = countryData.join('');
}