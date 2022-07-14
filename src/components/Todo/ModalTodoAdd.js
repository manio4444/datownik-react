import React, { Component } from 'react';
import {
  Button,
  Header,
  Icon,
  Modal,
  Input,
  Form,
  Checkbox,
} from 'semantic-ui-react';
import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/input.min.css';
import 'semantic-ui-css/components/form.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_red.css';
import 'flatpickr/dist/l10n/pl';
import scrollPlugin from 'flatpickr/dist/plugins/scrollPlugin';
import { addNewTodo } from './actions';

class ModalTodoAdd extends Component {
  state = {
    isAdding: false,
    isDeadline: true,
    deadline: '',
    title: this.props.value || '',
  };
  refFlatpickr = React.createRef();

  componentDidMount() {
    flatpickr(this.refFlatpickr.current, {
      plugins: [new scrollPlugin()],
      enableTime: true,
      locale: 'pl',
      altInput: true,
      altFormat: 'j F Y, H:i',
      time_24hr: true,
      onChange: (date, value) => this.flatPickrChange(date, value),
    });
  }

  handleAddButton = () => {
    this.setState({ isAdding: true });

    addNewTodo({
      txt: this.state.title,
      no_deadline: this.state.isDeadline ? '0' : '1',
      deadline: this.state.deadline,
    })
      .then(
        (response) =>
          response && this.props.trueCallback(response.data.result.newElement)
      )
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isAdding: false }));
  };

  handleToggleDeadline = () =>
    this.setState((prevState) => ({ isDeadline: !prevState.isDeadline }));
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  flatPickrChange = (date, value) => this.setState({ deadline: value });

  render() {
    const { props, state } = this;

    return (
      <Modal open={true} basic size="small">
        <Header icon={'calendar plus'} content={'Dodaj nowe zadanie'} />
        <Modal.Content>
          <Form inverted>
            <Form.Field>
              <label>Tytuł</label>
              <Input
                onChange={this.handleChange}
                name="title"
                value={state.title}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                toggle
                label={<label>enable deadline</label>}
                onChange={this.handleToggleDeadline}
                name="isDeadline"
                defaultChecked={state.isDeadline}
              />
            </Form.Field>

            {state.isDeadline && (
              <Form.Field>
                <label>Deadline</label>
                <input readOnly ref={this.refFlatpickr} />
              </Form.Field>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={this.handleAddButton}
            loading={state.isAdding}
            disabled={state.isAdding}
          >
            <Icon name="checkmark" /> Dodaj
          </Button>
          <Button
            color="red"
            inverted
            onClick={props.falseCallback}
            disabled={state.isAdding}
          >
            <Icon name="remove" /> Anuluj
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default ModalTodoAdd;
