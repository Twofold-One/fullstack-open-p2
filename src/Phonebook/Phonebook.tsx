import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';
import Notification from './components/Notification';

const Phonebook = () => {
    const [persons, setPersons] = useState<
        { id: number; name: string; number: string }[]
    >([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newNameFilter, setNewNameFilter] = useState('');
    const [notification, setNotification] = useState<string | null>(null);

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

    // Harsh one to understand, guess i'll not be able
    // to figure out or remember what's happening here
    const changeNubmerOfPerson = (personObject: {
        id?: number;
        name: string;
        number: string;
    }) => {
        const person = persons.find((p) => p.name === personObject.name);
        const personWithChangedNumber = person
            ? {
                  ...person,
                  number: personObject.number,
              }
            : personObject;
        const personId = person ? person.id.toString() : '';

        personsService
            .replace(personId, personWithChangedNumber)
            .then((returnedPerson) =>
                setPersons(
                    persons.map((person) =>
                        person.name !== personObject.name
                            ? person
                            : returnedPerson
                    )
                )
            )
            .catch((error) => {
                setNotification(
                    `Information of ${personWithChangedNumber.name} has already been removed from server`
                );
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
            });
        setNotification(
            `${personWithChangedNumber.name} number was changed to ${personWithChangedNumber.number}`
        );
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const addName = (event: React.FormEvent) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };

        const nameRepeat = checkForNameRepeat(personObject);
        const numberRepeat = checkForNubmerRepeat(personObject);

        if (nameRepeat && numberRepeat) {
            alert(`${newName} is already added`);
        } else if (nameRepeat && !numberRepeat) {
            console.log('implemented person number change functionality');
            if (
                window.confirm(
                    `${personObject.name} is already added to phonebook, replace old number with a new one?`
                )
            ) {
                changeNubmerOfPerson(personObject);
            }
        } else {
            personsService
                .create(personObject)
                .then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson));
                    setNotification(`Added ${personObject.name}`);
                    setTimeout(() => {
                        setNotification(null);
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }

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

    const handleDeleteButtonClick = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const personId = event.currentTarget.id;
        const personName = event.currentTarget.name;
        if (window.confirm(`Delete ${personName} ?`)) {
            await personsService.deletePerson(personId);
            personsService.getAll().then((initialPersons) => {
                setPersons(initialPersons);
            });
        }
    };

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={notification} />
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
