
const countryContainer = document.querySelector('.country-details');
const countryCode = location.search.split('country=')[1].toLowerCase();

// show the country details by fetching data from rest countries API
(async function countryDetails() {
  // getting country details using its code
  const data = await fetchCountryDetails(countryCode);
  showCountryDetails(data);
})() 

// async country details
async function fetchCountryDetails(countryCode) {
  const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
  const data = await response.json();
  return data;
}

// border countries name fetch 
async function borderCountries(borderCountries) {
  const codes = await Promise.all(borderCountries.map(async borderCountry => {
    const {name} = await fetchCountryDetails(borderCountry);
    return `
          <a href="countryInfo.html?country=${borderCountry}" class="border-country-link">${name}</a>
        `;
  }));
  return codes.join(''); 
}

async function showCountryDetails(country) {
  const borderCountryNames = await borderCountries(country.borders);
    
  let countryCurrency;
  country.currencies.forEach(currency => {
    countryCurrency =  currency.name;
  });

  function languages() {
    const lang = country.languages.map(lang => {
      return lang.name;
    });
    return lang.join(', ');
  }

  const countryDetailData =  `
      <div class="country-details-container">
        <div class="country-img-container">
          <img src=${country.flag} alt=${country.name} class="country-img">
        </div>
        <div class="country-details-info">
          <h2 class="country-name">${country.name}</h2>
          <div class="col-1">
            <p><strong>Native Name:</strong> ${country.nativeName}</p>
            <p><strong>Population:</strong> ${country.population}</p>
            <p><strong>Region:</strong> <span class="country-region">${country.region}</span></p>
            <p><strong>Sub Region:</strong> ${country.subregion}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
          </div>
          
          <div class="col-2">
            <p><strong>Top Level Domain:</strong> ${country.topLevelDomain}</p>
            <p><strong>Currencies:</strong>${countryCurrency}</p>
            <p><strong>Languages:</strong> ${languages()}</p>
          </div>

          <div>
            <strong>Border Countries:</strong>
            <div class="border-countries">
              ${borderCountryNames}
            </div>
          </div>
        </div>     
      </div>
    `;
  
  countryContainer.innerHTML = countryDetailData;
}
