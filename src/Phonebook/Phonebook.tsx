import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const Phonebook = () => {
    const [persons, setPersons] = useState<
        { id: number; name: string; number: string }[]
    >([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newNameFilter, setNewNameFilter] = useState('');

    useEffect(() => {
        personsService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);
    console.log('render', persons.length, 'notes');

    const checkForNameRepeat = (personObject: {
        id?: number;
        name: string;
        number: string;
    }): boolean => {
        const repeat = persons.filter(
            (person) => person.name === personObject.name
        );
        return repeat.length === 0 ? false : true;
    };

    const checkForNubmerRepeat = (personObject: {
        id?: number;
        name: string;
        number: string;
    }): boolean => {
        const repeat = persons.filter(
            (person) => person.number === personObject.number
        );
        return repeat.length === 0 ? false : true;
    };

    const addName = (event: React.FormEvent) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };

        // ToDo
        const nameRepeat = checkForNameRepeat(personObject);
        const numberRepeat = checkForNubmerRepeat(personObject);

        switch (nameRepeat && numberRepeat) {
        }
        //

        checkForNameRepeat(personObject)
            ? alert(`${newName} is already added`)
            : personsService.create(personObject).then((returnedPerson) => {
                  setPersons(persons.concat(returnedPerson));
              });
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

    const handleDeleteButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const personId = event.currentTarget.id;
        const personName = event.currentTarget.name;
        if (window.confirm(`Delete ${personName} ?`)) {
            personsService.deletePerson(personId);
            personsService.getAll().then((initialPersons) => {
                setPersons(initialPersons);
            });
        }
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
            <Persons
                persons={persons}
                newNameFilter={newNameFilter}
                handleDeleteButtonClick={handleDeleteButtonClick}
            />
        </div>
    );
};

export default Phonebook;
