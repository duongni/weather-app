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

let apiKey = "a0a06a4d0t0a9fff1oce244a979b7153";
let city = "Mississippi";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
let imagesPath = "sources/images/";
axios.get(apiUrl).then(showTemp);
