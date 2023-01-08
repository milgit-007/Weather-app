const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_GEO = 'http://api.openweathermap.org/geo/1.0/direct?q=';
const API_LIMIT = '&limit=1';
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '&appid=e66112d233ee3ef50099df635a7ae89f';
const API_UNITS = '&units=metric';

let lon = null;
let lat = null;


const getWeather1 = async () =>{
	let geoResult = await axios.get(URL_GEO)
	let lon1 = result.data[0].lat

}



const setCoordinates = () => {
	const city = input.value;
	const URL_GEO = API_GEO + city + API_LIMIT + API_KEY;
	return axios.get(URL_GEO).then(res => {
		 lat = 'lat=' + res.data[0].lat;
		 lon = '&lon=' + res.data[0].lon;
	});
};

const getWeather = () => {
	const URL = API_LINK + lat + lon + API_KEY + API_UNITS;

	axios.get(URL).then(res => {
		const temp = res.data.main.temp;
		const hum = res.data.main.humidity;
		const status = res.data.weather[0];

		cityName.textContent = res.data.name;

		weather.textContent = status.main;
		temperature.textContent = Math.floor(temp) + '°C';
		humidity.textContent = hum + '%';

		warning.textContent = '';
		input.value = '';

		if (status.id >= 200 && status.id <= 232) {
			photo.setAttribute('src', './img/thunderstorm.png');
		} else if (status.id >= 300 && status.id <= 321) {
			photo.setAttribute('src', './img/drizzle.png');
		} else if (status.id >= 500 && status.id <= 531) {
			photo.setAttribute('src', './img/rain.png');
		} else if (status.id >= 600 && status.id <= 622) {
			photo.setAttribute('src', './img/ice.png');
		} else if (status.id >= 700 && status.id <= 781) {
			photo.setAttribute('src', './img/fog.png');
		} else if (status.id === 800) {
			photo.setAttribute('src', './img/sun.png');
		} else if (status.id >= 801 && status.id <= 804) {
			photo.setAttribute('src', './img/cloud.png');
		} else {
			photo.setAttribute('src', './img/unknown.png');
		}
	})
	
};

async function showWeather () {
try {
    await setCoordinates()
    await getWeather()
} catch(err) { 
    () => (warning.textContent = 'Wpisz poprawną nazwę miasta!');
}
}

const enterKey = e => {
	if (e.key === 'Enter') {
		showWeather();
	}
};

button.addEventListener('click', showWeather);
input.addEventListener('keyup', enterKey)
