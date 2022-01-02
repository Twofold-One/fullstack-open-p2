import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const Phonebook = () => {
    const [persons, setPersons] = useState<
        { id: number; name: string; number: string }[]
    >([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newNameFilter, setNewNameFilter] = useState('');

    useEffect(() => {
        console.log('effect');
        axios.get('http://localhost:3001/persons').then((response) => {
            const persons = response.data;
            console.log(persons);
            setPersons(persons);
        });
    }, []);
    console.log('render', persons.length, 'notes');

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
