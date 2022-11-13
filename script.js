const locationInput = document.querySelector("#location-input");
const form = document.querySelector("form");
const locationPara = document.querySelector("#location");
const weatherInfo = document.querySelector("#weather-info");
const mainTemperature = document.querySelector("#main-temperature");
const changeUnitButton = document.querySelector("#change-unit");
const feelsLike = document.querySelector("#feels-like");
const maxTemp = document.querySelector("#temp-max");
const minTemp = document.querySelector("#temp-min");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const dayOneDay = document.querySelector("#day-one-day");
const dayOneTemperature = document.querySelector("#day-one-temperature");
const dayOneMinTemp = document.querySelector("#day-one-min-temp");
const dayOneIcon = document.querySelector("#day-one-icon");
const dayTwoDay = document.querySelector("#day-two-day");
const dayTwoTemperature = document.querySelector("#day-two-temperature");
const dayTwoMinTemp = document.querySelector("#day-two-min-temp");
const dayTwoIcon = document.querySelector("#day-two-icon");
const dayThreeDay = document.querySelector("#day-three-day");
const dayThreeTemperature = document.querySelector("#day-three-temperature");
const dayThreeMinTemp = document.querySelector("#day-three-min-temp");
const dayThreeIcon = document.querySelector("#day-three-icon");
const dayFourDay = document.querySelector("#day-four-day");
const dayFourTemperature = document.querySelector("#day-four-temperature");
const dayFourMinTemp = document.querySelector("#day-four-min-temp");
const dayFourIcon = document.querySelector("#day-four-icon");
const dayFiveDay = document.querySelector("#day-five-day");
const dayFiveTemperature = document.querySelector("#day-five-temperature");
const dayFiveMinTemp = document.querySelector("#day-five-min-temp");
const dayFiveIcon = document.querySelector("#day-five-icon");
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function fetchWeatherInfo(location, unit, sign, speed) {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=20aabfa94b4008606bb8a7b86312b3d2&units=${unit}`,
    { mode: "cors" }
  );
  try {
    const weather = await weatherResponse.json();
    locationPara.textContent = weather.name;
    weatherInfo.textContent = weather.weather[0].description;
    mainTemperature.textContent = `${Math.round(weather.main.temp)}${sign}`;
    feelsLike.textContent = `Feels like: ${Math.round(
      weather.main.feels_like
    )}${sign}`;
    maxTemp.textContent = `Max Temp: ${Math.round(
      weather.main.temp_max
    )}${sign}`;
    minTemp.textContent = `Min Temp: ${Math.round(
      weather.main.temp_min
    )}${sign}`;
    humidity.textContent = `Humidity: ${weather.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${weather.wind.speed}${speed}`;
    console.log(weather);
    locationInput.value = "";
    locationPara.style.color = "white";
  } catch (err) {
    locationPara.textContent = "Not a valid location";
    locationPara.style.color = "red";
  }
}

async function fetchForecast(unit, sign) {
  const forecastResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=London&APPID=20aabfa94b4008606bb8a7b86312b3d2&units=${unit}`,
    { mode: "cors" }
  );
  try {
    // Day One
    const forecast = await forecastResponse.json();
    const d = new Date();
    console.log(forecast);
    dayOneDay.textContent = weekdays[d.getDay() + 1];
    dayOneTemperature.textContent = `${Math.round(
      forecast.list[8].main.temp
    )}${sign}`;
    dayOneMinTemp.textContent = `${Math.round(
      forecast.list[8].main.temp_min
    )}${sign}`;
    dayOneIcon.textContent = forecast.list[8].weather[0].icon;
    // Day Two
    dayTwoDay.textContent = weekdays[d.getDay() + 2];
    dayTwoTemperature.textContent = `${Math.round(
      forecast.list[16].main.temp
    )}${sign}`;
    dayTwoMinTemp.textContent = `${Math.round(
      forecast.list[16].main.temp_min
    )}${sign}`;
    dayTwoIcon.textContent = forecast.list[16].weather[0].icon;
    // Day Three
    dayThreeDay.textContent = weekdays[d.getDay() + 3];
    dayThreeTemperature.textContent = `${Math.round(
      forecast.list[24].main.temp
    )}${sign}`;
    dayThreeMinTemp.textContent = `${Math.round(
      forecast.list[24].main.temp_min
    )}${sign}`;
    dayThreeIcon.textContent = forecast.list[24].weather[0].icon;
    // Day Four
    dayFourDay.textContent = weekdays[d.getDay() + 4];
    dayFourTemperature.textContent = `${Math.round(
      forecast.list[32].main.temp
    )}${sign}`;
    dayFourMinTemp.textContent = `${Math.round(
      forecast.list[32].main.temp_min
    )}${sign}`;
    dayFourIcon.textContent = forecast.list[32].weather[0].icon;
    // Day Five
    dayFiveDay.textContent = weekdays[d.getDay() + 5];
    dayFiveTemperature.textContent = `${Math.round(
      forecast.list[39].main.temp
    )}${sign}`;
    dayFiveMinTemp.textContent = `${Math.round(
      forecast.list[39].main.temp_min
    )}${sign}`;
    dayFiveIcon.textContent = forecast.list[39].weather[0].icon;
  } catch {
    alert("Error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeatherInfo(locationInput.value, "metric", "°C", "m/s");
  fetchForecast("metric", "°C");
});

changeUnitButton.addEventListener("click", () => {
  if (changeUnitButton.textContent == "Change to °F") {
    fetchWeatherInfo(locationPara.textContent, "imperial", "°F", "m/h");
    fetchForecast("imperial", "°F");
    changeUnitButton.textContent = "Change to °C";
  } else {
    fetchWeatherInfo(locationPara.textContent, "metric", "°C", "m/s");
    fetchForecast("metric", "°C");
    changeUnitButton.textContent = "Change to °F";
  }
});
