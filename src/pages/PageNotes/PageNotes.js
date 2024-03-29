import React, { useState } from 'react';
import { useLocation } from 'react-router';

import ListNotes from 'components/Notes/ListNotes.js';
import SearchNotes from 'components/Notes/SearchNotes';

const PageNotes = () => {
  let location = useLocation();

  const queryString = location.state?.queryString;

  const [searchQuery, setSearchQuery] = useState(
    queryString ? queryString : ''
  );

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
          placeholders={8}
        />
      </section>
    </React.Fragment>
  );
};

export default PageNotes;
