import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Form, TextArea, Dropdown } from "semantic-ui-react";

import { DropdownOptions } from "./const";
import ModalNoteAdd from '../Notes/ModalNoteAdd';
import ModalTodoAdd from '../Todo/ModalTodoAdd';

import 'semantic-ui-css/components/form.min.css';
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
    };

    closeModal = modalName => this.setState({[modalName]: false});

    getModalConfig = modalName => DropdownOptions.find(option => option.action === modalName);

    handleOption = (e, {action}) => this.setState({[action]: true});

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

                    <Dropdown className='multicontent__button' text='Dodaj nowy' button>
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
