import React from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';

import { LANG_ARR_MONTHS } from './const';
import Placeholder from 'components/Placeholder/Placeholder';

import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/form.min.css';

const ModalDayView = ({ dateIso, events, day, loading, falseCallback }) => {
  const month = new Date(dateIso).getMonth();

  return (
    <Modal open={true} basic size="small">
      <Header
        icon={'calendar plus'}
        content={`${day} ${LANG_ARR_MONTHS[month]}`}
      />
      <Modal.Content>
        <Form inverted>
          {!loading &&
            events.map((event) => (
              <Form.Field
                key={`${event.type}-${event.id}`}
                className={`${event.type}`}
              >
                <label>{event.date}</label>
                <p>
                  {event.type === 'birthdays' && <Icon name="birthday cake" />}{' '}
                  {event.txt}
                </p>
              </Form.Field>
            ))}
          {loading && <Placeholder />}
          {loading && <Placeholder />}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" inverted onClick={falseCallback}>
          <Icon name="remove" /> Zamknij
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalDayView;
