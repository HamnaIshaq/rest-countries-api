//let country = window.location.search.substring(1);
//let name = country.toLowerCase();
//console.log(country);

const countryContainer = document.querySelector('.country-details');

const countryCode = location.search.split('country=')[1].toLowerCase();
console.log(countryCode);

// show the country details by fetching data from rest countries API

//fetchCountryDetails()
countryDetails();

async function countryDetails() {
  // getting country details using its code
  const data = await fetchCountryDetails(countryCode);
  console.log(data);
  showCountryDetails(data);
} 

// async country details
async function fetchCountryDetails(countryCode) {
  const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`);
  const data = await response.json();
  return data;
}

// border countries name fetch 
async function borderCountries(countryCode) {
  //const borderCountryData = await fetchCountryDetails(countryCode);
  //console.log(borderCountryData);
  // const {name, alpha3Code} = borderCountryData;
}

function showCountryDetails(country) {
  function borderCountryDetail() {
    const borderCountryCodes = country.borders.map(countryCode => {
     //return countryCode;
      
        return `
          <a href="countryInfo.html?country=${countryCode}" class="border-country-link">${countryCode}</a>
        `;
        
    });
    return borderCountryCodes.join(', '); 
  }
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
              ${borderCountryDetail()}
            </div>
  
          </div>

        </div>     
      </div>
    `;
  
  countryContainer.innerHTML = countryDetailData;
}

/*
---------------Border countries---------------
let borders = [];
  country.borders.forEach(border => {
    //borders.push(border);
    borders.push(`<a href="#" class="border-country-link">${border}</a>`);
    
  });
  console.log(borders);





*/

/*
<div class="country-details-container">
  <div class="country-img-container">
    <img src="#" alt="#" class="country-img">
  </div>
  <div class="country-details-container">
    <h3 class="country-name">Belgium</h3>
    <div class="col-1">
      <p><strong>Native Name:</strong> Belgie</p>
      <p><strong>Population:</strong> 5454646</p>
      <p><strong>Region:</strong> <span class="country-region">Europe</span></p>
      <p><strong>Sub Region:</strong> Western Europe</p>
      <p><strong>Capital:</strong> Brussels</p>
    </div>
    
    <div class="col-2">
      <p><strong>Top Level Domain:</strong> .be</p>
      <p><strong>Currencies:</strong> Euro</p>
      <p><strong>Languages:</strong> Dutch, French, German</p>
    </div>

    <div>
      <strong>Border Countries:</strong>
      <span>France</span>
      <span>Germany</span>
      <span>Netherlands</span>
    </div>
  </div>     
</div>

*/ 
