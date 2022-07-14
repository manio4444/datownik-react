import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';

class ModalYesNo extends Component {
  handleTrue = () => this.props.trueCallback();
  handleFalse = () => this.props.falseCallback();

  render() {
    const { open, header, txt, icon } = this.props;

    return (
      <Modal open={open} basic size="small">
        <Header icon={icon} content={header} />
        <Modal.Content>
          <p>{txt}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={this.handleTrue}>
            <Icon name="checkmark" /> Yes
          </Button>
          <Button color="red" inverted onClick={this.handleFalse}>
            <Icon name="remove" /> No
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default ModalYesNo;
