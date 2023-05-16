function showTemp(response) {
  console.log(response);
  let currentTemp = document.querySelector("#current-temp");
  let currentCity = document.querySelector("#city");
  let currentWeatherDescription = document.querySelector("#description");
  let feelLikeTemp = document.querySelector("#current-feel-like-temp");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentCity.innerHTML = response.data.city;
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  currentWeatherDescription.innerHTML = response.data.condition.description;
  feelLikeTemp.innerHTML = Math.round(response.data.temperature.feels_like);
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "a0a06a4d0t0a9fff1oce244a979b7153";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=mississippi&key=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showTemp);
