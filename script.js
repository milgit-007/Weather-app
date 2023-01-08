const API_GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const API_GEO_RESULT_LIMIT = 1;
const API_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e66112d233ee3ef50099df635a7ae89f';
const API_UNITS = 'metric';
const VALIDATION_MESSAGE = 'Wpisz poprawną nazwę miasta!';

const cityInput = document.querySelector('input');
const checkButton = document.querySelector('button');
const cityNameElement = document.querySelector('.city-name');
const validationElement = document.querySelector('.validation');
const photoElement = document.querySelector('.photo');
const weatherInfoElement = document.querySelector('.weather');
const temperatureInfoElement = document.querySelector('.temperature');
const humidityInfoElement = document.querySelector('.humidity');

let longitude = null;
let latitude = null;
let cityNameValue = null;

const setCoordinatesAndCity = () => {
	const urlGeoParametrized = `${API_GEO_URL}?q=${cityInput.value}&limit=${API_GEO_RESULT_LIMIT}&appid=${API_KEY}`;
	return axios.get(urlGeoParametrized).then(response => {
		latitude = response.data[0].lat;
		longitude = response.data[0].lon;
		cityNameValue = response.data[0].name;
	});
};

const setValidationMessage = () => {
	validationElement.textContent = VALIDATION_MESSAGE;
};

const getWeather = () => {
	const urlWeatherParametrized = `${API_WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${API_UNITS}`;
	return axios.get(urlWeatherParametrized).then(response => {
		const temperature = response.data.main.temp;
		const humidity = response.data.main.humidity;
		const weather = response.data.weather[0];

		cityNameElement.textContent = cityNameValue;
		weatherInfoElement.textContent = weather.main;
		temperatureInfoElement.textContent = temperature.toFixed(1) + '°C';
		humidityInfoElement.textContent = humidity + '%';

		validationElement.textContent = '';
		cityInput.value = '';

		if (weather.id >= 200 && weather.id <= 232) {
			photoElement.setAttribute('src', './img/thunderstorm.png');
		} else if (weather.id >= 300 && weather.id <= 321) {
			photoElement.setAttribute('src', './img/drizzle.png');
		} else if (weather.id >= 500 && weather.id <= 531) {
			photoElement.setAttribute('src', './img/rain.png');
		} else if (weather.id >= 600 && weather.id <= 622) {
			photoElement.setAttribute('src', './img/ice.png');
		} else if (weather.id >= 700 && weather.id <= 781) {
			photoElement.setAttribute('src', './img/fog.png');
		} else if (weather.id === 800) {
			photoElement.setAttribute('src', './img/sun.png');
		} else if (weather.id >= 801 && weather.id <= 804) {
			photoElement.setAttribute('src', './img/cloud.png');
		} else {
			photoElement.setAttribute('src', './img/unknown.png');
		}
	});
};

async function showWeather() {
	try {
		await setCoordinatesAndCity();
		await getWeather();
	} catch (err) {
		console.log(err);
		setValidationMessage();
	}
}

const enterKey = e => {
	if (e.key === 'Enter') {
		showWeather();
	}
};

checkButton.addEventListener('click', showWeather);
cityInput.addEventListener('keyup', enterKey);
