import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CountryData from './components/CountryData';

const DataForCountries = () => {
    const [newCountryName, setNewCountryName] = useState('');
    const [countries, setCountries] = useState<any[]>([]);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const countryName = newCountryName
                ? `name/${newCountryName}`
                : 'all';
            axios
                .get(`https://restcountries.com/v3.1/${countryName}`)
                .then((response) => {
                    console.log(response);
                    const countries = response.data;
                    setCountries(countries);
                });
        }
    }, [newCountryName]);
    console.log('countries', countries.length);

    const handleInputCountryNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(event.target.value);
        setNewCountryName(event.target.value);
    };

    const onShowButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const currentCountry = countries[Number(event.currentTarget.id)];
        setCountries([currentCountry]);
    };

    return (
        <div>
            <h1>Data for countries</h1>
            <div>
                Find countries
                <input
                    value={newCountryName}
                    onChange={handleInputCountryNameChange}
                    placeholder={'Country name'}
                />
            </div>
            <div>
                {countries.length === 1
                    ? countries.map((country) => (
                          <CountryData
                              key={country.name.official}
                              country={country}
                          />
                      ))
                    : countries.length <= 10 && countries.length >= 2
                    ? countries.map((country, index) => (
                          <div
                              key={country.name.official}
                              className="country-element"
                          >
                              <p>{country.name.common}</p>
                              <button
                                  id={index.toString()}
                                  onClick={onShowButtonClick}
                              >
                                  Show
                              </button>
                          </div>
                      ))
                    : countries.length > 10
                    ? 'Too many matches, specify another filter'
                    : ''}
            </div>
        </div>
    );
};

export default DataForCountries;
