function formatDate() {
  let now = new Date();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

  let nowDate = now.getDate();
  let date = `${day}, ${month} ${nowDate} at ${hour}:${mins}`;
  return date;
}
document.querySelector("#date-time").innerHTML = formatDate();

function showTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let currentCity = document.querySelector("#city");
  let currentWeatherDescription = document.querySelector("#description");
  let feelLikeTemp = document.querySelector("#current-feel-like-temp");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.temperature.current;
  currentCity.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
  currentWeatherDescription.innerHTML = response.data.condition.description;
  feelLikeTemp.innerHTML = Math.round(response.data.temperature.feels_like);
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `sources/images/${response.data.condition.icon}.png`
  );

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "a0a06a4d0t0a9fff1oce244a979b7153";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function handleInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

let citySearch = document.querySelector("#citySearchBar");
citySearch.addEventListener("submit", handleInput);

function searchLocation(position) {
  let apiKey = "a0a06a4d0t0a9fff1oce244a979b7153";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=imperial`;

  https: axios.get(apiUrl).then(showTemp);
}
function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-search");
currentLocationButton.addEventListener("click", searchCurrentLocation);

function changeTheme() {
  let body = document.querySelector("body");
  body.classList.toggle("dark");
}
let now = new Date();
let hour = now.getHours();
if (hour > 18) {
  changeTheme();
}
if (hour < 6) {
  changeTheme();
}

function convertCelciusTemp(event) {
  event.preventDefault();
  let currentCelciusTemp = document.querySelector("#current-temp");

  //remove active class from Fahreiheit link
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  let celciusTempElement = ((fahrenheitTemp - 32) * 5) / 9;
  currentCelciusTemp.innerHTML = Math.round(celciusTempElement);
}
function convertFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let fahrenheitTempElement = document.querySelector("#current-temp");

  fahrenheitTempElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <ul class="future-date">
              <li>${convertDate(forecastDay.temperature.day)}</li>
              <li>
                <img src="sources/images/${forecastDay.condition.icon}.png" />
              </li>
              <li><span id="forecast-max">${Math.round(
                forecastDay.temperature.maximum
              )}</span>°/ <span id="forecast-min">${Math.round(
          forecastDay.temperature.minimum
        )}</span>° </li>
            </ul>
`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a0a06a4d0t0a9fff1oce244a979b7153";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}
let fahrenheitTemp = null;
let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertCelciusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertFahrenheitTemp);
searchCity("New York");
