import { WeatherResponse } from '../model/weather_res';

export const SampleWeather: WeatherResponse = {
    'coord': {
        'lon': 2.35,
        'lat': 48.86
    },
    'weather': [
        {
            'id': 800,
            'main': 'Clear',
            'description': 'clear sky',
            'icon': '01n'
        }
    ],
    'base': 'stations',
    'main': {
        'temp': 5.43,
        'pressure': 1024,
        'humidity': 45,
        'temp_min': 3.89,
        'temp_max': 7
    },
    'visibility': 10000,
    'wind': {
        'speed': 3.1,
        'deg': 30
    },
    'clouds': {
        'all': 0
    },
    'dt': 1555104606,
    'sys': {
        'type': 1,
        'id': 6540,
        'message': 0.0049,
        'country': 'FR',
        'sunrise': 1555045578,
        'sunset': 1555094173
    },
    'id': 2988507,
    'name': 'Paris',
    'cod': 200
};
