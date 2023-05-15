function showTemp(response) {
  console.log(response);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.city;
  let currentWeatherDescription = document.querySelector("description");
  //currentWeatherDescription.innerHTML = response.data.condition.description;
}

let apiKey = "a0a06a4d0t0a9fff1oce244a979b7153";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=New%20York&key=${apiKey}&units=imperial`;

axios.get(apiUrl).then(showTemp);
