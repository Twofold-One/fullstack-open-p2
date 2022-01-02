import React from 'react';

interface PersonsProps {
    persons: { id: number; name: string; number: string }[];
    newNameFilter: string;
}

const Persons = ({ persons, newNameFilter }: PersonsProps) => {
    return (
        <ul>
            {persons
                .filter((person) => {
                    return person.name
                        .toLowerCase()
                        .includes(newNameFilter.toLocaleLowerCase());
                })
                .map((person) => (
                    <p key={person.id}>{`${person.name} ${person.number}`}</p>
                ))}
        </ul>
    );
};

export default Persons;
