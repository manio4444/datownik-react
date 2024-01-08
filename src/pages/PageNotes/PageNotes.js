import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router';

import ListNotes from 'components/Notes/ListNotes.js';
import SearchNotes from 'components/Notes/SearchNotes';
import OneNote from 'components/Notes/OneNote';

const PageNotes = () => {
  let location = useLocation();
  let routerParams = useParams();

  const queryString = location.state?.queryString;
  const singleNotesId = routerParams.id;

  const [searchQuery, setSearchQuery] = useState(
    queryString ? queryString : ''
  );

  return (
    <React.Fragment>
      <section className="notes">
        {!singleNotesId && (
          <SearchNotes
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {!singleNotesId && (
          <ListNotes
            viewOnly={false}
            limit={0}
            searchQuery={searchQuery}
            placeholders={8}
          />
        )}

        {singleNotesId && <OneNote id={singleNotesId} />}
      </section>
    </React.Fragment>
  );
};

export default PageNotes;
