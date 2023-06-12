const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.querySelector('.weather-info');

form.addEventListener('submit', (e) => {
   e.preventDefault();
  const location = locationInput.value;
  fetchWeatherData(location);
});

function fetchWeatherData(location) {
  const apiKey = '3265874a2c77ae4a04bb96236a642d2f'; //  API key
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      updateWeatherData(data);
    })
    .catch(error => {
      console.log('An error occurred while fetching weather data:', error);
    });
}

function updateWeatherData(data) {
  const locationElement = weatherInfo.querySelector('.location');
  const temperatureElement = weatherInfo.querySelector('.temperature');
  const descriptionElement = weatherInfo.querySelector('.description');
  const iconElement = weatherInfo.querySelector('.icon img');

  const location = data.name;
  //convert
  const temperature = Math.round(data.main.temp - 273.15); 
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  locationElement.textContent = location;
  temperatureElement.textContent = temperature + '°C';
  descriptionElement.textContent = description;
  iconElement.src = iconUrl;
}
