import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';

class ModalTodoFinish extends Component {
    render() {
        console.log(this.props.open);
        return (

            <Modal open={this.props.open} basic size='small'>
                <Header icon='archive' content='Archive Old Messages'/>
                <Modal.Content>
                    <p>
                        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted>
                        <Icon name='remove'/> No
                    </Button>
                    <Button color='green' inverted>
                        <Icon name='checkmark'/> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    };
}
export default ModalTodoFinish;
