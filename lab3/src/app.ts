export class App {
    private opwApiKey = '50d53005c0fd5f556bb4ef15224c4209';
    private addContainer: HTMLElement;
    private citiesContainer: HTMLElement;
    private cities: string[];

    constructor() {
        this.cities = [];
        this.addContainer = document.querySelector('#addCityContainer');
        this.citiesContainer = document.querySelector('.cities-box');

        this.init();
    }

    private init(): void {
        this.addContainer.querySelector('button').addEventListener('click', () => {
            const city = this.addContainer.querySelector('input').value;
            this.addContainer.querySelector('input').value = null;

            if (this.cities.includes(city)) {
                return;
            }

            this.addCity(city);
        });

        this.getData();

        this.cities.forEach((city) => {
            this.renderCity(city);
        });
    }

    private addCity(city: string): void {
        this.getWeather(city).then((data) => {
            if (data.cod !== 200) {
                alert('City not found');
                return;
            }

            this.cities.push(city);
            this.saveData();

            this.renderCity(city, data);
        });
    }

    private renderCity(city: string, cityData?: ApiCityWeatherData): void {
        if (cityData) {
            this.createCityDomElement(cityData);
            return;
        }

        this.getWeather(city).then((data) => {
            console.log(data);
            this.createCityDomElement(data);
        });
    }

    private createCityDomElement(cityData: ApiCityWeatherData): void {
        const element = this.citiesContainer.querySelector('.city.prototype').cloneNode(true) as HTMLElement;
        element.classList.remove('prototype');

        element.querySelector('.header h2').innerHTML = cityData.name;
        element.querySelector('.header span').innerHTML = `${cityData.main.temp.toFixed(0)}°`;
        element.querySelector('.header img').setAttribute('src', `http://openweathermap.org/img/w/${cityData.weather.pop().icon}.png`)

        element.querySelectorAll('.details div').forEach((detail: HTMLElement) => {
            const valueEl = detail.querySelector('.value');
            let value = '';

            if (detail.dataset.type === 'pressure') {
                value = `${cityData.main.pressure} hPa`;
            } else if (detail.dataset.type === 'humidity') {
                value = `${cityData.main.humidity} %`;
            } else if (detail.dataset.type === 'cloud') {
                value = `${cityData.clouds.all} %`;
            } else if (detail.dataset.type === 'wind') {
                value = `${cityData.wind.speed} m/s <span class="wind-arrow" style="--degree: ${cityData.wind.deg}"></span>`;
            }

            valueEl.innerHTML = value;
        });

        this.citiesContainer.appendChild(element);
    }

    private async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);

        return await weatherResponse.json();
    }

    private saveData() {
        localStorage.setItem('weatherCities', JSON.stringify(this.cities));
    }

    private getData() {
        const data = localStorage.getItem('weatherCities');
        if (data) {
            this.cities = JSON.parse(data);
        }
    }
}

interface ApiCityWeatherData {
    name: string;
    clouds: CloudData;
    weather: WeatherData[];
    main: SensorData;
    wind: WindData;
}

interface CloudData {
    all: number;
}

interface SensorData {
    temp: number;
    humidity: number;
    pressure: number;
}

interface WindData {
    deg: number;
    speed: number;
}

interface WeatherData {
    description: string;
    icon: string;
    id: number;
    main: string;
}
