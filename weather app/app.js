const inputBox = document.querySelector('.input-text');
const searchButton = document.getElementById('button-id');
const iconElement = document.querySelector('.icon');
const placeElement = document.querySelector('.place');
const countryElement = document.querySelector('.country');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');

const apiKey = '642e083e028c045243165a622b1cbf62';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

searchButton.addEventListener('click', () => {
  const place = inputBox.value.trim();
  if (place) {
    fetchData(place);
  }
  inputBox.value = '';
});

const fetchData = (place) => {
  fetch(apiUrl + place)
    .then((Response) => {
      if (!Response.ok) {
        throw new Error('city not found');
      }
      return Response.json();
    })
    .then((data) => {
      console.log(data);
      showWeather(data);
    })
    .catch((error) => {
      alert(error.message);
    });
};

const showWeather = (data) => {
  iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" style='height:6rem'/>`;

  iconElement.setAttribute('alt', data.weather[0].description);
  placeElement.textContent = data.name;
  countryElement.textContent = data.sys.country;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionElement.textContent = data.weather[0].description;
};

inputBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});
