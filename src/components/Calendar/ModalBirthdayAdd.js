import React, { useState } from 'react';
import { Button, Header, Icon, Modal, Input, Form } from 'semantic-ui-react';
import Flatpickr from 'react-flatpickr';
import scrollPlugin from 'flatpickr/dist/plugins/scrollPlugin';

import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/input.min.css';
import 'semantic-ui-css/components/form.min.css';
import './ModalEventAdd.scss';

import { addNewBirthday } from 'components/Calendar/actions';

const FLATPICKR_DATETIME_FORMAT = 'j F Y';

const ModalBirthdayAdd = ({ trueCallback, falseCallback }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  const handleAddButton = () => {
    setIsAdding(true);
    addNewBirthday({
      txt: text,
      data: date,
    })
      .then(
        (response) => response && trueCallback(response.data.result.newElement)
      )
      .catch((error) => console.error(error))
      .finally(() => setIsAdding(false));
  };

  return (
    <Modal open={true} basic size="small" className={'ModalEventAdd'}>
      <Header icon={'calendar plus'} content={'Dodaj nowe wydarzenie'} />
      <Modal.Content>
        <Form inverted>
          <Form.Field>
            <label>Tytuł</label>
            <Input onChange={(e, { value }) => setText(value)} value={text} />
          </Form.Field>

          <Form.Field>
            <label>Data</label>
            <Form.Field inline className={'inline-with-button'}>
              {/*<input readOnly />*/}

              <Flatpickr
                value={date}
                options={{
                  plugins: [new scrollPlugin()],
                  locale: 'pl',
                  altInput: true,
                  altFormat: FLATPICKR_DATETIME_FORMAT,
                  onChange: (date, value) => setDate(value),
                }}
              />
            </Form.Field>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          inverted
          onClick={handleAddButton}
          loading={isAdding}
          disabled={isAdding}
        >
          <Icon name="checkmark" /> Dodaj
        </Button>
        <Button
          color="red"
          inverted
          onClick={falseCallback}
          disabled={isAdding}
        >
          <Icon name="remove" /> Anuluj
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalBirthdayAdd;
