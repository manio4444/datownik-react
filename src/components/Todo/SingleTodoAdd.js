import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/card.min.css';
import 'semantic-ui-css/components/icon.min.css';

const SingleTodoAdd = ({ handleAddNew }) => {
  return (
    <Card onClick={handleAddNew} className={`todo_element todo_element--new`}>
      <Card.Content>
        <Icon name="plus" size="huge" />
      </Card.Content>

      <Button>
        <Icon name={'plus'} /> Dodaj nowy
      </Button>
    </Card>
  );
};

export default SingleTodoAdd;
