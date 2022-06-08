import WEATHER_API_KEY from './api.js';

let formSearch = document.getElementById("form-search");
let inputSearch = document.getElementById("input-search");
let msgSearch = document.getElementById("msg-search");
let currentSearch = document.getElementById("current-weather");
let favoriteCity = document.getElementById("favorite-cities");

//Favorite List
let citySearch = inputSearch;

addFavorite.onclick = (e) => {
  e.preventDefault();

  if (citySearch.value == '') {
      alert('Please enter the city name.');
      return;
  }

  const option = new Option(citySearch.value, citySearch.value);
 
  favoriteCity.add(option, undefined);

  citySearch.value = '';
  citySearch.focus();
};


//Check weather
formSearch.addEventListener("submit", buttonSearch => {
    buttonSearch.preventDefault();
    let citySearch = inputSearch.value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${WEATHER_API_KEY.WEATHER_API_KEY}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;

      if (document.getElementById("child-search") != undefined)
       currentSearch.removeChild(document.getElementById("child-search"));

      const div = document.createElement("div");
      div.setAttribute("id","child-search");
      div.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      `;
      div.innerHTML = markup;
      currentSearch.appendChild(div);
    })
    .catch(() => {
      msgSearch.textContent = "Confirm the city name";
    });

    msgSearch.textContent = "";

    formSearch.reset();
    inputSearch.focus();
});