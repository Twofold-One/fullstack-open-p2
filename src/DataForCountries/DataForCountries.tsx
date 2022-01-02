import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataForCountries = () => {
    const [newCountryName, setNewCountryName] = useState('');
    const [countries, setCountries] = useState<any[]>([]);

    useEffect(() => {
        const countryName = newCountryName ? `name/${newCountryName}` : 'all';
        axios
            .get(`https://restcountries.com/v3.1/${countryName}`)
            .then((response) => {
                console.log(response);
                const countries = response.data;
                setCountries(countries);
            });
    }, [newCountryName]);
    console.log('countries', countries.length);

    const handleInputCountryNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(event.target.value);
        setNewCountryName(event.target.value);
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
                          <p key={country.name.official}>
                              {country.name.official}
                          </p>
                      ))
                    : countries.length <= 10
                    ? countries.map((country) => (
                          <p key={country.name.official}>
                              {country.name.common}
                          </p>
                      ))
                    : countries.length > 10
                    ? 'Too many matches, specify another filter'
                    : ''}
            </div>
        </div>
    );
};

export default DataForCountries;
