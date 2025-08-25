import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", fetchWeather);
});

//use OpenWeatherMap.org's Current Weather Data and Geocoding API
async function fetchWeather() {
  let searchInput = document.getElementById("search").value;
  const weatherOutputSection = document.getElementById("weather-output");
  weatherOutputSection.style.display = "block";
  const apiKey = "f3c03dd22fa1a6870be0e27b599aa5fc";

  if (searchInput == "") {
    weatherOutputSection.innerHTML = `
    <div>
      <h2>Please try again with a valid city name</h2>
    <div/>`;
    return;
  }

  async function getLonAndLat() {
    const countryCode = "US";
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchInput)},${countryCode}&limit=1&appid=${apiKey}`,
    );
    //spaces must be encoded, use encodeURIComaponent

    if (!response.ok) {
      console.log("Bad response!");
      return;
    }
    const data = await response.json();
    if (data.length == 0) {
      console.log("Something went wrong with fetching the data.");
      weatherOutputSection.innerHTML = `
    <div>
      <h2>Invalid Input: "${searchInput}"</h2>
      <p>Please double check city name and try again</p>
    </div>`;
      return;
    } else {
      return data[0];
    }
  }
  async function getWeatherData(lon, lat) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );
    if (!response.ok) {
      console.log("Bad Response!");
      return;
    }
    const data = await response.json();

    weatherOutputSection.style.display = "flex";
    weatherOutputSection.innerHTML = `
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
<div>
  <h2>${data.name}</h2>
  <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
  <p><strong>Description:</strong> ${data.weather[0].description}</p>
</div>
`;
  }
  document.getElementById("search").value = ""; //clear search item
  const geocodeData = await getLonAndLat();
  getWeatherData(geocodeData.lon, geocodeData.lat);
}
