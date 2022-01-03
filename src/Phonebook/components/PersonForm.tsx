import React from 'react';

interface PersonFormProps {
    newName: string;
    addName: any;
    handleNameInputChange: any;
    newNumber: string;
    handleNumberInputChange: any;
}

const PersonForm = ({
    newName,
    addName,
    handleNameInputChange,
    newNumber,
    handleNumberInputChange,
}: PersonFormProps) => {
    return (
        <form onSubmit={addName}>
            <div>
                Name:{' '}
                <input
                    value={newName}
                    onChange={handleNameInputChange}
                    placeholder="a new name..."
                />
            </div>
            <div>
                Number:{' '}
                <input
                    value={newNumber}
                    onChange={handleNumberInputChange}
                    placeholder="a number..."
                />
            </div>
            <div>
                <button className="add-btn" type="submit">
                    Add
                </button>
            </div>
        </form>
    );
};

export default PersonForm;
