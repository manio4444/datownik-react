import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';

class ModalTodoFinish extends Component {
    handleTrue = () => this.props.trueCallback();
    handleFalse = () => this.props.falseCallback();

    render() {
        const { header, txt } = this.props;

        return (
            <Modal open={this.props.open} basic size='small'>
                <Header icon='archive' content={header}/>
                <Modal.Content>
                    <p>{txt}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' inverted onClick={this.handleFalse}>
                        <Icon name='remove'/> No
                    </Button>
                    <Button color='green' inverted onClick={this.handleTrue}>
                        <Icon name='checkmark'/> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    };
}
export default ModalTodoFinish;
