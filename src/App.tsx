import React from 'react';
import './App.css';
import Phonebook from './Phonebook/Phonebook';
import DataForCountries from './DataForCountries/DataForCountries';

const App = () => {
    return (
        <div className="App">
            {/* <Phonebook /> */}
            <DataForCountries />
        </div>
    );
};

export default App;
