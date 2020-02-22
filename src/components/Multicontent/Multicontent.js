import React, {Component} from 'react';
import { Form, TextArea, Dropdown } from "semantic-ui-react";
import ModalNoteAdd from '../Notes/ModalNoteAdd';
import ModalTodoAdd from '../Todo/ModalTodoAdd';
import 'semantic-ui-css/components/form.min.css';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/transition.min.css';
import './Multicontent.scss';

const MULTICONTENT_INPUT_NAME = 'multicontentValue';

class Multicontent extends Component {
    state = {
        openModalNoteAdd: false,
        openModalTodoAdd: false,
        openModalEventAdd: false,
        openModalBookmarkAdd: false,
        openModalDocAdd: false,
        openModalContactAdd: false,
        openModalPassAdd: false,
        [MULTICONTENT_INPUT_NAME]: '',
    };

    handleOption = (e, {action}) => this.setState({[action]: true});

    handleOnChange = (e, {name, value}) => this.setState({[name]: value});

    render() {

        const {
            openModalNoteAdd,
            openModalTodoAdd,
            openModalEventAdd,
            openModalBookmarkAdd,
            openModalDocAdd,
            openModalContactAdd,
            openModalPassAdd,
        } = this.state;
        const options = [
            {
                text: "Notatka",
                icon: 'sticky note outline',
                description: 'Not ready',
                action: 'openModalNoteAdd'
            },
            {
                text: "Zadanie",
                icon: 'calendar check outline',
                action: 'openModalTodoAdd'
            },
            {divider: true},
            {
                text: "Wydarzenie",
                icon: 'calendar outline',
                description: 'Not ready',
                action: 'openModalEventAdd'
            },
            {
                text: "Zakładka",
                icon: 'external',
                description: 'Not ready',
                action: 'openModalBookmarkAdd'
            },
            {
                text: "Dokument",
                icon: 'question',
                description: 'Not ready',
                action: 'openModalDocAdd'
            },
            {
                text: "Kontakt",
                icon: 'question',
                description: 'Not ready',
                action: 'openModalContactAdd'
            },
            {
                text: "Kod/hasło",
                icon: 'question',
                description: 'Not ready',
                action: 'openModalPassAdd'
            },
        ];

        return (
            <div className="multicontent">
                <Form method="POST" className="multicontent__form">

                    <TextArea
                        className='multicontent__textarea icon'
                        name={[MULTICONTENT_INPUT_NAME]}
                        rows="2"
                        value={this.state[MULTICONTENT_INPUT_NAME]}
                        onChange={this.handleOnChange}
                    />

                    <Dropdown className='multicontent__button' text='Dodaj nowy' button>
                        <Dropdown.Menu>
                            {options.map((option, i) => {
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

                {openModalTodoAdd && <ModalTodoAdd
                    open={openModalTodoAdd}
                    trueCallback={() => console.log('trueCallback')}
                    falseCallback={() => this.setState({openModalTodoAdd: false})}
                />}

                {openModalNoteAdd && <ModalNoteAdd
                    value={this.state.multicontentValue}
                    trueCallback={() => console.log('trueCallback')}
                    falseCallback={() => this.setState({openModalNoteAdd: false})}
                />}
            </div>
        );
    }
}

export default Multicontent;
