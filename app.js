document.addEventListener('DOMContentLoaded', () => {

    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.querySelector('.navbar').classList.toggle('dark-mode');
        document.querySelector('.search-container').classList.toggle('dark-mode');
    });


    
    const regions = ['Asia', 'Europe', 'Americas', 'Africa', 'Oceania'];
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const countryListingContainer = document.querySelector('.countrylisting');
    const searchInput = document.getElementById('searchInput');
    let countryData = [];

    const displayCountries = (countries) => {
        const countryListingContainer = document.querySelector('.countrylisting');
        countryListingContainer.innerHTML = ''; 
        countries.forEach(country => {
          const countryName = encodeURIComponent(country.name);
          const column = `
            <div class="col-md-6 col-lg-4 col-xl-3 mb-5">
              <a href="detail.html?country=${countryName}" class="text-decoration-none country-link">
                <div class="card card-container h-100">
                  <img src="${country.flag}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <h6 class="fw-bold ms-2">${country.name}</h6>
                    <div class="details">
                      <h5 class="ms-2 fs-6"><span class="fw-bold">population:</span> ${country.population}</h5>
                      <h5 class="ms-2 fs-6"><span class="fw-bold">region:</span> ${country.region}</h5>
                      <h5 class="ms-2 fs-6"><span class="fw-bold">capital:</span> ${country.capital}</h5>
                    </div>
                  </div>
                </div>
              </a>
            </div>`;
          countryListingContainer.innerHTML += column;
        });
      };
    const filterByRegion = (region) => {
        const filteredCountries = countryData.filter(country => country.region === region);
        displayCountries(filteredCountries);
    };


    const searchCountries = (searchTerm) => {
        const filteredCountries = countryData.filter(country => country.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
        displayCountries(filteredCountries);
    };


    regions.forEach(region => {
        const listItem = document.createElement('li');
        const linkItem = document.createElement('a');
        linkItem.className = 'dropdown-item';
        linkItem.href = '#';
        linkItem.textContent = region;
        linkItem.addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelectorAll('.dropdown-item').forEach(item => item.classList.remove('active'));
            linkItem.classList.add('active');

            filterByRegion(region);
        });
        listItem.appendChild(linkItem);
        dropdownMenu.appendChild(listItem);
    });


    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        searchCountries(searchTerm);
    });

    // Fetch country data and display initially
    fetch('./rest-countries-api-with-color-theme-switcher-master/data.json')
    .then(response => response.json())
    .then(data => {
        countryData = data; // Store the country data for filtering
        displayCountries(countryData); // Display all countries initially
    })
    .catch(error => console.error('Error fetching data:', error));
});
