import React, {Component} from 'react';
import { Form, TextArea, Dropdown } from "semantic-ui-react";
import ModalTodoAdd from './ModalTodoAdd';
import 'semantic-ui-css/components/form.min.css';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/transition.min.css';
import './Multicontent.scss';

class Multicontent extends Component {
    state = {
        openModalTodoAdd: false,
    };

    handleOption = (e, {action}) => this.setState({[action]: true});

    render() {

        const {openModalTodoAdd} = this.state;
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
            <React.Fragment>
                <Form method="POST" className="multicontent__form">

                    <TextArea
                        className='multicontent__textarea icon'
                        name="urladd"
                        rows="2"
                    />

                    <Dropdown className='multicontent__button purple' text='Dodaj nowy' button>
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
            </React.Fragment>
        );
    }
}

export default Multicontent;
