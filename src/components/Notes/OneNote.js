import React, { useEffect, useState } from 'react';

import { getSingleNote } from 'components/Notes/actions';
import SingleNote from 'components/Notes/SingleNote';
import { Button, Message } from 'semantic-ui-react';

import 'semantic-ui-css/components/message.min.css';
import { Link } from 'react-router-dom';
import { RouterPaths } from 'router/consts';

const OneNote = ({ id }) => {
  const [noteData, setNoteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSingleNote({ id })
      .then(({ data }) => {
        setNoteData(data.result);
      })
      .catch((error) => {
        if (error?.message?.response?.data?.message) {
          setError(error?.message?.response?.data?.message);
        } else if (error?.message?.message) {
          setError(error?.message?.message);
        } else {
          setError('error, check logs');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="notes_container">
      {loading && <SingleNote key={0} placeholder={true} />}
      {!loading && deleted && (
        <Message
          error
          header="Notatka usunięta"
          content={ReturnToNotesButton}
          style={{ minWidth: 280 }}
        />
      )}
      {!loading && error && (
        <Message
          error
          header="Błąd"
          content={
            <>
              {error} {ReturnToNotesButton}
            </>
          }
          style={{ minWidth: 280 }}
        />
      )}

      {!loading && !deleted && !error && (
        <SingleNote
          key={id}
          id={id}
          value={noteData.txt}
          deletedCallback={() => setDeleted(true)}
          showLink={false}
        />
      )}
    </div>
  );
};

const ReturnToNotesButton = (
  <Link to={`/${RouterPaths.NOTES}`}>
    <Button fluid style={{ marginTop: '1em' }}>
      Powrót do notatek
    </Button>
  </Link>
);

export default OneNote;
