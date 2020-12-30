import React, { useState } from 'react';
import ListNotes from "../../components/Notes/ListNotes";
import SearchNotes from "../../components/Notes/SearchNotes";

const PageNotes = ({location: {state: {queryString} = {}}}) => {

    const [searchQuery, setSearchQuery] = useState(queryString ? queryString : '');

    return (
        <React.Fragment>
            <section className="notes">
                <SearchNotes
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <ListNotes
                    viewOnly={false}
                    limit={0}
                    searchQuery={searchQuery}
                />

            </section>
        </React.Fragment>
    );
};

export default PageNotes;
