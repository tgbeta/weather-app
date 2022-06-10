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
    })
      msgSearch.textContent = "Confirm the city name";
    });


const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}
