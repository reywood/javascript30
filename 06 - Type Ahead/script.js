const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data));

const search = document.querySelector('.search-form .search');
const suggestions = document.querySelector('.search-form .suggestions');

function formatNumber(n) {
    let formatted = n.toString();
    for (let i = formatted.length - 3; i > 0; i -= 3) {
        formatted = `${formatted.substr(0, i)},${formatted.substr(i)}`;
    }
    return formatted;
}

function displayMatches() {
    if (this.value.length <= 0) {
        return;
    }

    const regex = new RegExp(this.value, 'gi');
    const matches = cities
        .filter(city => city.city.match(regex) || city.state.match(regex))
        .sort((cityA, cityB) => (cityA.city < cityB.city ? -1 : 1));

    suggestions.innerHTML = matches.map((city) => {
        const cityName = city.city.replace(regex, val => `<span class="hl">${val}</span>`);
        const stateName = city.state.replace(regex, val => `<span class="hl">${val}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${formatNumber(city.population)}</span>
            </li>
        `;
    }).join('');
}

search.addEventListener('input', displayMatches);
