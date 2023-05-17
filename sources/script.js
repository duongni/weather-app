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
  console.log(response);
  let currentTemp = document.querySelector("#current-temp");
  let currentCity = document.querySelector("#city");
  let currentWeatherDescription = document.querySelector("#description");
  let feelLikeTemp = document.querySelector("#current-feel-like-temp");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  let iconElement = document.querySelector("#icon");
  currentCity.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  currentWeatherDescription.innerHTML = response.data.condition.description;
  feelLikeTemp.innerHTML = Math.round(response.data.temperature.feels_like);
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `sources/images/${response.data.condition.icon}.png`
  );
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

searchCity("New York");

let citySearch = document.querySelector("#citySearchBar");
citySearch.addEventListener("submit", handleInput);

function searchLocation(position) {
  let apiKey = "8161b4309ee03faae957729ba7104797";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apikKey}`;

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
