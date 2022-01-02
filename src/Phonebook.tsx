import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const Phonebook = () => {
    const [persons, setPersons] = useState([
        { id: 1, name: 'Arto Hellas', number: '111-222333' },
        { id: 2, name: 'Bert Madness', number: '111-444555' },
        { id: 3, name: 'Calvin Gerard', number: '111-666777' },
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newNameFilter, setNewNameFilter] = useState('');

    const checkForNameRepeat = (personObject: {
        id: number;
        name: string;
        number: string;
    }): boolean => {
        const repeat = persons.filter(
            (person) => person.name === personObject.name
        );
        return repeat.length === 0 ? false : true;
    };

    const addName = (event: React.FormEvent) => {
        event.preventDefault();
        const personObject = {
            id: persons.length + 1,
            name: newName,
            number: newNumber,
        };
        checkForNameRepeat(personObject)
            ? alert(`${newName} is already added`)
            : setPersons(persons.concat(personObject));
        setNewName('');
        setNewNumber('');
    };

    const handleNameInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewName(event.target.value);
    };

    const handleNumberInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewNumber(event.target.value);
    };

    const handleNameFilterInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewNameFilter(event.target.value);
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter
                newNameFilter={newNameFilter}
                handleNameFilterInputChange={handleNameFilterInputChange}
            />
            <h2>Add a new person</h2>
            <PersonForm
                newName={newName}
                addName={addName}
                handleNameInputChange={handleNameInputChange}
                newNumber={newNumber}
                handleNumberInputChange={handleNumberInputChange}
            />
            <h2>Numbers</h2>
            <Persons persons={persons} newNameFilter={newNameFilter} />
        </div>
    );
};

export default Phonebook;
