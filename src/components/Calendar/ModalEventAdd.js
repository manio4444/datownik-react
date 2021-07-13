import React, { Component } from 'react'
import {Button, Header, Icon, Modal, Input, Form} from 'semantic-ui-react'
import 'semantic-ui-css/components/modal.min.css';
import 'semantic-ui-css/components/dimmer.min.css';
import 'semantic-ui-css/components/header.min.css';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/input.min.css';
import 'semantic-ui-css/components/form.min.css';
import flatpickr from "flatpickr";
import 'flatpickr/dist/themes/material_red.css'
import 'flatpickr/dist/l10n/pl'
import scrollPlugin from "flatpickr/dist/plugins/scrollPlugin";
import { addNewEvent } from "./actions";

import './ModalEventAdd.scss';

const FLATPICKR_DATETIME_FORMAT = "j F Y, H:i";


    class ModalEventAdd extends Component {
    state = {
        isAdding: false,
        dateTime: this.props.dateTime || '',
        title: this.props.value || '',
    };
    refFlatpickr = React.createRef();

    componentDidMount() {
        const name = 'dateTime';
        flatpickr(this.refFlatpickr.current, {
            "plugins": [new scrollPlugin()],
            ...this.state.dateTime && {defaultDate: this.state.dateTime},
            enableTime: true,
            locale: 'pl',
            altInput: true,
            altFormat: FLATPICKR_DATETIME_FORMAT,
            time_24hr: true,
            onChange: (date, value) => this.handleChange(null, {name, value}),
        });
    };

    handleAddButton = () => {
        this.setState({isAdding: true});

        addNewEvent({
            txt: this.state.title,
            data: this.state.dateTime,
        })
            .then(response => response && this.props.trueCallback(response.data.result.newElement))
            .catch(error => console.error(error))
            .finally(() => this.setState({isAdding: false}));
    };

    handleChange = (e, {name, value}) => this.setState({ [name]: value });
    flatPickrChange = (date, value) => this.setState({ data: value });

    buttonFillDate = () => {
        const dateTime = new Date();
        dateTime.setDate(dateTime.getDate() + 1);
        this.setState({dateTime: dateTime.parse(FLATPICKR_DATETIME_FORMAT)});
    };

    render() {
        const {props, state} = this;

        return (
            <Modal open={true} basic size='small' className={'ModalEventAdd'}>
                <Header icon={'calendar plus'} content={'Dodaj nowe wydarzenie'}/>
                <Modal.Content>
                    <Form inverted>
                        <Form.Field>
                            <label>Tytuł</label>
                            <Input onChange={this.handleChange} name='title' value={state.title}/>
                        </Form.Field>

                        <Form.Field>
                            <label>Data</label>
                            <Form.Field inline className={'inline-with-button'}>
                                <input readOnly ref={this.refFlatpickr}/>
                                <Button onClick={this.buttonFillDate}>
                                    Jutro
                                </Button>
                            </Form.Field>

                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='green'
                        inverted
                        onClick={this.handleAddButton}
                        loading={state.isAdding}
                        disabled={state.isAdding}
                    >
                        <Icon name='checkmark'/> Dodaj
                    </Button>
                    <Button
                        color='red'
                        inverted
                        onClick={props.falseCallback}
                        disabled={state.isAdding}
                    >
                        <Icon name='remove'/> Anuluj
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    };
}
export default ModalEventAdd;
