import React  from 'react';
import { Input, Icon } from "semantic-ui-react";

const SearchNotes = ({searchQuery, setSearchQuery}) => {

    const handleSetValue = ({target}) => setSearchQuery(target.value);

    const handleClearValue = () => setSearchQuery('');

    return <div className={'notes_search'}>
        <Input
            fluid
            placeholder='Szukaj notatek'
            icon={<Icon
                name={searchQuery ? 'close' : 'search'}
                link={searchQuery}
                onClick={handleClearValue}
            />}
            iconPosition='left'
            value={searchQuery}
            onChange={handleSetValue}
        />
    </div>
};

export default SearchNotes;