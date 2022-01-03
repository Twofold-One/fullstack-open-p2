import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryData = ({ country }: any) => {
    const [weather, setWeather] = useState<any>({
        weather: [{ desription: null, icon: '' }],
        main: {
            temp: null,
        },
        wind: {
            speed: null,
        },
    });
    useEffect(() => {
        console.log(country.capital[0]);
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
            )
            .then((response) => {
                console.log(response.data);
                const weather = response.data;
                setWeather(weather);
            });
    }, [country.capital]);
    return (
        <div>
            <div>
                <h2>{country.name.common}</h2>
                <h3>{country.name.official}</h3>
            </div>
            <div>
                <p>Capital: {country.capital[0]}</p>
                <p>Population: {country.population}</p>
            </div>
            <div>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map((language: any) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
                <div>
                    <img
                        className="flag"
                        src={country.flags.png}
                        alt="country flag"
                    />
                </div>
                <div>
                    <h3>Weather in {country.capital[0]}</h3>
                    <img
                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="weather icon"
                    />
                    <p>{weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp || ''} °C </p>
                    <p>Wind: {weather.wind.speed} m/s </p>
                </div>
            </div>
        </div>
    );
};

export default CountryData;
