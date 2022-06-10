import WEATHER_API_KEY from "./api.js";

let formSearch = document.getElementById("form-search");
let inputSearch = document.getElementById("input-search");
let formCities = document.getElementById("form-cities");
let selectCity = document.getElementById("favorite-cities");
let msgSearch = document.getElementById("msg-search");
let currentSearch = document.getElementById("current-weather");
let favoriteCity = document.getElementById("favorite-cities");

//Favorite List
document.addEventListener("DOMContentLoaded", () => {
  let existingFavCities = [];

  existingFavCities = JSON.parse(localStorage.getItem("favoriteCities"));

  if (existingFavCities == null) {
    existingFavCities = [];
  } else {
    localStorage.setItem("favoriteCities", JSON.stringify(existingFavCities));
  }

  for (let i = 0; i < existingFavCities.length; i++) {
    const option = new Option(existingFavCities[i], existingFavCities[i]);
    favoriteCity.add(option, undefined);
  }
});

let citySearch = inputSearch;

addFavorite.onclick = (e) => {
  e.preventDefault();

  if (citySearch.value == "") {
    alert("Please enter the city name.");
    return;
  }

  const option = new Option(citySearch.value, citySearch.value);
  favoriteCity.add(option, undefined);

  citySearch.value = "";
  citySearch.focus();
};

//Check weather - favorites
async function getDataFavorite() {
  let valueSelectCity = selectCity.options[selectCity.selectedIndex].value;
  console.log(valueSelectCity);

  try {
    let citySearch = valueSelectCity;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${WEATHER_API_KEY.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    msgSearch.textContent = "Confirm the city name";
  }
}

formCities.addEventListener("submit", (buttonCheckWeather) => {
  buttonCheckWeather.preventDefault();

  getDataFavorite().then((data) => {
    const { main, name, sys, weather } = data;

    if (document.getElementById("child-search") != undefined)
      currentSearch.removeChild(document.getElementById("child-search"));

    const div = document.createElement("div");
    div.setAttribute("id", "child-search");
    div.classList.add("current-weather");
    const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <span>${weather[0].description}</span>
      `;
    div.innerHTML = markup;
    currentSearch.appendChild(div);

    formCities.reset();
    selectCity.focus();
  });
});


//Check weather - Search bar
async function getData() {
  try {
    let citySearch = inputSearch.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${WEATHER_API_KEY.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);

    return await response.json();
  } catch (error) {
    msgSearch.textContent = "Confirm the city name";
  }
}

formSearch.addEventListener("submit", (buttonSearch) => {
  buttonSearch.preventDefault();

  getData().then((data) => {
    const { main, name, sys, weather } = data;

    if (document.getElementById("child-search") != undefined)
      currentSearch.removeChild(document.getElementById("child-search"));

    const div = document.createElement("div");
    div.setAttribute("id", "child-search");
    div.classList.add("current-weather");
    const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <span>${weather[0].description}</span>
      `;
    div.innerHTML = markup;
    currentSearch.appendChild(div);

    formSearch.reset();
    inputSearch.focus();
  });
});