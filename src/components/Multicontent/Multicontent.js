import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, TextArea, Dropdown, Button } from "semantic-ui-react";

import { DropdownOptions, DropdownDefault } from "./const";
import ModalNoteAdd from '../Notes/ModalNoteAdd';
import ModalTodoAdd from '../Todo/ModalTodoAdd';

import 'semantic-ui-css/components/form.min.css';
import 'semantic-ui-css/components/button.min.css';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/transition.min.css';
import './Multicontent.scss';

const MULTICONTENT_INPUT_NAME = 'multicontentValue';

class Multicontent extends Component {
    state = {
        modalNoteAdd: false,
        modalTodoAdd: false,
        modalEventAdd: false,
        modalBookmarkAdd: false,
        modalDocAdd: false,
        modalContactAdd: false,
        modalPassAdd: false,
        [MULTICONTENT_INPUT_NAME]: '',
        lastUsedAction: '',
    };

    closeModal = modalName => this.setState({[modalName]: false});

    getLastUsedActionName = () => {
        if (!this.state.lastUsedAction) {
            return DropdownDefault.text;
        }
        const {text} = this.getModalConfig(this.state.lastUsedAction) || {};
        return DropdownDefault.prefix + text;
    };

    getModalConfig = modalName => DropdownOptions.find(option => option.action === modalName);

    handleAction = action => this.setState({[action]: true});

    handleButton = () => {
        if (this.state.lastUsedAction) {
            this.handleAction(this.state.lastUsedAction);
        }
    };

    handleOption = (e, {action}) => {
        if (!action) {
            console.error('[Multicontent] - No action specified');
            return;
        }
        this.handleAction(action);
        this.setState({lastUsedAction: action});
    };

    handleOnChange = (e, {name, value}) => this.setState({[name]: value});

    handleTrueCallback = (modalName) => {
        const {redirectAfter} = this.getModalConfig(modalName);

        if (redirectAfter) {
            this.props.history.push(`/${redirectAfter}`);
        } else {
            this.setState({
                [MULTICONTENT_INPUT_NAME]: '',
                [modalName]: false,
            });
        }
    };

    render() {
        const {state} = this;

        return (
            <div className="multicontent">
                <Form method="POST" className="multicontent__form">

                    <TextArea
                        className='multicontent__textarea icon'
                        name={[MULTICONTENT_INPUT_NAME]}
                        rows="4"
                        value={this.state[MULTICONTENT_INPUT_NAME]}
                        onChange={this.handleOnChange}
                    />

                    <Button.Group fluid>
                        <Button onClick={this.handleButton}>
                            {this.getLastUsedActionName()}
                        </Button>

                        <Dropdown
                            className='multicontent__button-change button icon'
                            color={'grey'}
                            trigger={<></>}
                        >
                            <Dropdown.Menu>
                                {DropdownOptions.map((option, i) => {
                                    if (option.divider === true) return (<Dropdown.Divider key={i}/>);
                                    return (
                                        <Dropdown.Item
                                            key={i}
                                            text={option.text}
                                            icon={option.icon}
                                            description={option.description}
                                            action={option.action}
                                            onClick={this.handleOption}
                                        />
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Button.Group>



                </Form>

                {state.modalTodoAdd && <ModalTodoAdd
                    value={state.multicontentValue}
                    trueCallback={() => this.handleTrueCallback('modalTodoAdd')}
                    falseCallback={() => this.closeModal('modalTodoAdd')}
                />}

                {state.modalNoteAdd && <ModalNoteAdd
                    value={state.multicontentValue}
                    trueCallback={() => this.handleTrueCallback('modalNoteAdd')}
                    falseCallback={() => this.closeModal('modalNoteAdd')}
                />}
            </div>
        );
    }
}

export default withRouter(Multicontent);
