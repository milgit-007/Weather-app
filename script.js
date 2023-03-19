const API_GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const API_GEO_RESULT_LIMIT = 1;
const API_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e66112d233ee3ef50099df635a7ae89f';
const API_UNITS = 'metric';
const VALIDATION_MESSAGE = 'Wpisz poprawną nazwę miasta!';

const cityInput = document.querySelector('input');
const checkButton = document.querySelector('button');
const cityNameElement = document.querySelector('.city-name');
const validationElement = document.querySelector('.validation');
const imageElement = document.querySelector('.image');
const weatherDescriptionInfoElement = document.querySelector('.description');
const temperatureInfoElement = document.querySelector('.temperature');
const humidityInfoElement = document.querySelector('.humidity');

let longitude = null;
let latitude = null;
let cityNameValue = null;
let weatherDescriptionId = null;

const setCoordinatesAndCity = () => {
	const urlGeoParametrized = `${API_GEO_URL}?q=${cityInput.value}&limit=${API_GEO_RESULT_LIMIT}&appid=${API_KEY}`;
	return axios.get(urlGeoParametrized).then(response => {
		latitude = response.data[0].lat;
		longitude = response.data[0].lon;
		cityNameValue = response.data[0].name;
	});
};

const setWeather = () => {
	const urlWeatherParametrized = `${API_WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${API_UNITS}`;
	return axios.get(urlWeatherParametrized).then(response => {
		const temperature = response.data.main.temp;
		const humidity = response.data.main.humidity;
		const weatherDescription = response.data.weather[0];

		cityNameElement.textContent = cityNameValue;
		weatherDescriptionInfoElement.textContent = weatherDescription.main;
		temperatureInfoElement.textContent = temperature.toFixed(1) + '°C';
		humidityInfoElement.textContent = humidity + '%';
		weatherDescriptionId = weatherDescription.id;
	});
};

const setWeatherImage = weatherDescriptionId => {
	let imageSrc;
	switch (true) {
		case weatherDescriptionId >= 200 && weatherDescriptionId < 300:
			imageSrc = './img/thunderstorm.png';
			break;
		case weatherDescriptionId >= 300 && weatherDescriptionId < 400:
			imageSrc = './img/drizzle.png';
			break;
		case weatherDescriptionId >= 500 && weatherDescriptionId < 600:
			imageSrc = './img/rain.png';
			break;
		case weatherDescriptionId >= 600 && weatherDescriptionId < 700:
			imageSrc = './img/ice.png';
			break;
		case weatherDescriptionId >= 700 && weatherDescriptionId < 800:
			imageSrc = './img/fog.png';
			break;
		case weatherDescriptionId === 800:
			imageSrc = './img/sun.png';
			break;
		case weatherDescriptionId >= 801 && weatherDescriptionId < 809:
			imageSrc = './img/cloud.png';
			break;
		default:
			imageSrc = './img/unknown.png';
	}
	imageElement.setAttribute('src', imageSrc);
};

const clearValidationMessage = () => (validationElement.textContent = '');
const clearCityInput = () => (cityInput.value = '');

const setValidationMessage = () =>
	(validationElement.textContent = VALIDATION_MESSAGE);

async function showWeather() {
	try {
		await setCoordinatesAndCity();
		await setWeather();
		setWeatherImage(weatherDescriptionId);
		clearValidationMessage();
		clearCityInput();
	} catch (err) {
		console.log(err);
		setValidationMessage();
	}
}

const showWeatherForEnterKey = e => {
	if (e.key === 'Enter') {
		showWeather();
	}
};

checkButton.addEventListener('click', showWeather);
cityInput.addEventListener('keyup', showWeatherForEnterKey);
