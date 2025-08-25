import "./style.css";

//use OpenWeatherMap.org's Current Weather Data and Geocoding API
function fetchWeather() {
  let searchInput = document.getElementById("search").value;
  const weatherOutputSection = document.getElementById("weather-output");
  weatherOutputSection.style.display = "block";
  const apiKey = "f3c03dd22fa1a6870be0e27b599aa5fcz";

  if (searchInput == "") {
    weatherOutputSection.innerHTML = `
    <div>
      <h2>Please try again with a valid city name</h2>
    <div/>`;
    return;
  }

  async function getLonAndLat() {
    const countryCode = 1;
    const geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`; //spaces must be encoded with %20
    const response = await fetch(geocodeURL);
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
  </div>
  `;
      return;
    } else {
      return data[0];
    }
  }

  async function getWeatherData(lon, lat) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(weatherURL);
    if (!response.ok) {
      console.log("Bad response!", response.status);
      return;
    }
    const data = await response.json();

    weatherOutputSection.innerHTML = `
<img src= "https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png />
<div>
  <h2>${data.name}</h2>
  <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
  <p><strong>Description:</strong> ${data.weather[0].description}</p>
</div>
`;
  }
}
