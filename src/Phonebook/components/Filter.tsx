import React from 'react';

interface FilterProps {
    newNameFilter: string;
    handleNameFilterInputChange: any;
}

const Filter = ({
    newNameFilter,
    handleNameFilterInputChange,
}: FilterProps) => {
    return (
        <div>
            Filter shown with
            <input
                value={newNameFilter}
                onChange={handleNameFilterInputChange}
                placeholder="a filter..."
            />
        </div>
    );
};

export default Filter;
