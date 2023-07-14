// Variables
let continentFilter = 'africa'; // Default continent

// DOM Manipulation
const continentFilterElement = document.getElementById('continent-filter');
const countryGrid = document.getElementById('country-grid');

// Functions
function fetchCountriesByContinent(continent) {
  const apiUrl = `https://restcountries.com/v3.1/region/${continent}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Clear previous country grid
      countryGrid.innerHTML = '';

      // Display countries in the country grid
      data.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        const flag = document.createElement('img');
        flag.src = country.flags.png;
        flag.alt = `${country.name.common} flag`;

        const name = document.createElement('h2');
        name.textContent = country.name.common;

        const population = document.createElement('p');
        population.textContent = `Population: ${country.population}`;

        countryCard.appendChild(flag);
        countryCard.appendChild(name);
        countryCard.appendChild(population);

        countryGrid.appendChild(countryCard);
      });
    })
    .catch(error => {
      console.error('Error fetching country data:', error);
    });
}

// Event listener for continent filter change
continentFilterElement.addEventListener('change', function() {
  continentFilter = continentFilterElement.value;
  fetchCountriesByContinent(continentFilter);
});

// Initial fetch for the default continent
fetchCountriesByContinent(continentFilter);
