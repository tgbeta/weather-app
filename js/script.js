import WEATHER_API_KEY from "./api.js";

let formSearch = document.getElementById("form-search");
let formCities = document.getElementById("form-cities");
let inputSearch = document.getElementById("input-search");
let msgSearch = document.getElementById("msg-search");
let currentSearch = document.getElementById("current-weather");
let favoriteCity = document.getElementById("favorite-cities");

//Favorite List
let citySearch = inputSearch;

addFavorite.onclick = (e) => {
  e.preventDefault();

  if (citySearch.value == "") {
    alert("Please enter the city name.");
    return;
  }

  let existingFavCities = [];

  existingFavCities = JSON.parse(localStorage.getItem("favoriteCities"));
  if (existingFavCities == null) existingFavCities = [];
  existingFavCities.push(citySearch.value);
  localStorage.setItem("favoriteCities", JSON.stringify(existingFavCities));

  for (let i = 0; i < existingFavCities.length; i++) {
    const option = new Option(existingFavCities[i], existingFavCities[i]);
    favoriteCity.add(option, undefined);
  }

  citySearch.value = "";
  citySearch.focus();
};

//Check weather new
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

    formSearch.reset();
    inputSearch.focus();
  });
});
//End Check weather new

//Check weather old
// formSearch.addEventListener("submit", buttonSearch => {
//     buttonSearch.preventDefault();

//     let citySearch = inputSearch.value;

//     let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${WEATHER_API_KEY.WEATHER_API_KEY}&units=metric`;

//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       const { main, name, sys, weather } = data;
//       console.log(sys);
//       if (document.getElementById("child-search") != undefined)
//        currentSearch.removeChild(document.getElementById("child-search"));

//       const div = document.createElement("div");
//       div.setAttribute("id","child-search");
//       div.classList.add("city");
//       const markup = `
//         <h2 class="city-name" data-name="${name},${sys.country}">
//           <span>${name}</span>
//           <sup>${sys.country}</sup>
//         </h2>
//         <div class="city-temp"><h3>${Math.round(main.temp)}<sup>°C</sup></h3></div>
//         <span>${weather[0].description}</span>
//       `;
//       div.innerHTML = markup;
//       currentSearch.appendChild(div);
//     })
//     .catch(() => {
//       msgSearch.textContent = "Confirm the city name";
//     });

//     msgSearch.textContent = "";

//     formSearch.reset();
//     inputSearch.focus();
// });

// formCities.addEventListener("submit", buttonSearch => {
//   buttonSearch.preventDefault();

//   let citySearch = inputSearch.value;

//   let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${WEATHER_API_KEY.WEATHER_API_KEY}&units=metric`;

//   fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     const { main, name, sys, weather } = data;

//     if (document.getElementById("child-search") != undefined)
//      currentSearch.removeChild(document.getElementById("child-search"));

//     const div = document.createElement("div");
//     div.setAttribute("id","child-search");
//     div.classList.add("city");
//     const markup = `
//       <h2 class="city-name" data-name="${name},${sys.country}">
//         <span>${name}</span>
//         <sup>${sys.country}</sup>
//       </h2>
//       <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//     `;
//     div.innerHTML = markup;
//     currentSearch.appendChild(div);
//   })
//   .catch(() => {
//     msgSearch.textContent = "Confirm the city name";
//   });

//   msgSearch.textContent = "";

//   formSearch.reset();
//   inputSearch.focus();
// });
