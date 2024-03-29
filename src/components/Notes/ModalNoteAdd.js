import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';
import SingleNote from './SingleNote';
import { addNewNote } from './actions';

const ModalTodoAdd = ({ value, trueCallback, falseCallback }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddButton = () => {
    setIsAdding(true);

    addNewNote({
      txt: value,
    })
      .then((response) => response && trueCallback(response))
      .catch((error) => console.error(error))
      .finally(() => setIsAdding(false));
  };

  return (
    <Modal open={true} basic size="mini">
      <Header icon={'calendar plus'} content={'Dodaj nową notatkę'} />
      <Modal.Content>
        <SingleNote value={value} readonly />
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
export default ModalTodoAdd;
