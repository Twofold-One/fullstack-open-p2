import React from 'react';

interface PersonsProps {
    persons: { id: number; name: string; number: string }[];
    newNameFilter: string;
    handleDeleteButtonClick: any;
}

const Persons = ({
    persons,
    newNameFilter,
    handleDeleteButtonClick,
}: PersonsProps) => {
    return (
        <ul>
            {persons
                .filter((person) => {
                    return person.name
                        .toLowerCase()
                        .includes(newNameFilter.toLocaleLowerCase());
                })
                .map((person) => (
                    <div key={person.id} className="persons">
                        <p>{`${person.name} ${person.number}`}</p>
                        <button
                            className="delete"
                            id={person.id.toString()}
                            name={person.name}
                            onClick={handleDeleteButtonClick}
                        >
                            Delete
                        </button>
                    </div>
                ))}
        </ul>
    );
};

export default Persons;
