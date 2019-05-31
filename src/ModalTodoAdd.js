import React, { Component } from 'react'
import {Button, Header, Icon, Modal, Input, Form, Checkbox} from 'semantic-ui-react'
import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/input.min.css';
import 'semantic-ui-css/components/form.min.css';

class ModalTodoAdd extends Component {
    state = {
        isDeadline: true,
    };

    handleTrue = () => this.props.trueCallback();
    handleFalse = () => this.props.falseCallback();
    handleToggleDeadline = () => this.setState(prevState => ({isDeadline: !prevState.isDeadline}));


    render() {
        const {isDeadline} = this.state;

        return (
            <Modal open={this.props.open} basic size='small'>
                <Header icon={'calendar plus'} content={'Dodaj nowe zadanie'}/>
                <Modal.Content>
                    <Form inverted>
                        <Form.Field>
                            <label>Tytuł</label>
                            <Input/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                toggle
                                label={<label>enable deadline</label>}
                                onChange={this.handleToggleDeadline}
                                defaultChecked={isDeadline}
                            />
                        </Form.Field>

                        {isDeadline && <Form.Field>
                            <label>Deadline</label>
                            <Input/>
                        </Form.Field>}
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted onClick={this.handleTrue}>
                        <Icon name='checkmark'/> Dodaj
                    </Button>
                    <Button color='red' inverted onClick={this.handleFalse}>
                        <Icon name='remove'/> Anuluj
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    };
}
export default ModalTodoAdd;
