import React, { useState } from 'react';
import { Input } from "semantic-ui-react";

const SearchNotes = ({searchQuery, setSearchQuery}) => {
    const [value, setValue] = useState(searchQuery);

    const handleSetValue = ({target}) => {
        setValue(target.value);
        setSearchQuery(target.value);
    };

    return <div className={'notes_search'}>
        <Input
            fluid
            placeholder='Szukaj notatek'
            icon={'search'}
            iconPosition='left'
            value={value}
            onChange={handleSetValue}
        />
    </div>
};

export default SearchNotes;