import React, { useState, useEffect } from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';

import 'semantic-ui-css/components/grid.min.css';

import { getBirthdaysAll } from 'components/Calendar/actions';
import Placeholder from 'components/Placeholder/Placeholder';
import ModalBirthdayAdd from 'components/Calendar/ModalBirthdayAdd';

const PageBirthdays = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [modalEventAdd, setModalEventAdd] = useState(false);

  useEffect(() => {
    fetchPeriodicEvents();
  }, []);

  const fetchPeriodicEvents = () => {
    setLoading(true);
    getBirthdaysAll()
      .then((data) => {
        setEvents(data.data.result);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <React.Fragment>
      <section className="calendar">
        <h1>Wydarzenia cykliczne</h1>

        <Grid columns={3}>
          <Grid.Column />

          <Grid.Column textAlign={'center'}>
            <Button
              icon
              labelPosition="left"
              onClick={() => setModalEventAdd(true)}
            >
              <Icon name="plus" />
              Dodaj
            </Button>
          </Grid.Column>

          <Grid.Column />
        </Grid>

        <div style={{ margin: '1em 0' }}>
          {loading && <Placeholder />}
          {loading && <Placeholder />}
          {loading && <Placeholder />}
          {loading && <Placeholder />}
          {loading && <Placeholder />}

          {!loading &&
            events.map((event) => (
              <div key={event.id}>
                [{event.id}] {event.date} {event.txt}
              </div>
            ))}
        </div>
      </section>

      {modalEventAdd && (
        <ModalBirthdayAdd
          trueCallback={() => {
            setModalEventAdd(false);
            fetchPeriodicEvents();
          }}
          falseCallback={() => setModalEventAdd(false)}
        />
      )}
    </React.Fragment>
  );
};

export default PageBirthdays;
