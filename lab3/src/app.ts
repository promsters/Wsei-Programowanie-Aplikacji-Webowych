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
            this.createCityDomElement(city);
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

            this.createCityDomElement(city);
        });
    }

    private createCityDomElement(city: string): void {
        const element = document.createElement('div');
        element.classList.add('city');
        element.innerText = city;

        this.citiesContainer.appendChild(element);
    }

    private async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
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
