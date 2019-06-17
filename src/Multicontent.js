import React, {Component} from 'react';
import { Form, TextArea, Dropdown } from "semantic-ui-react";
import 'semantic-ui-css/components/form.min.css';
import 'semantic-ui-css/components/dropdown.min.css';
import 'semantic-ui-css/components/transition.min.css';
import './Multicontent.scss';

class Multicontent extends Component {
    render() {
        return (
            <Form method="POST" className="multicontent__form">

                <TextArea className='multicontent__textarea icon' name="urladd" rows="5"/>

                <Dropdown className='multicontent__button' text='Dodaj nowy' button>
                    <Dropdown.Menu>
                        <Dropdown.Item text="Notatka" icon='sticky note outline'/>
                        <Dropdown.Divider/>
                        <Dropdown.Item text="Zadanie" icon='calendar check outline' description='Not ready'/>
                        <Dropdown.Item text="Wydarzenie" icon='calendar outline' description='Not ready'/>
                        <Dropdown.Item text="Zakładka" icon='external' description='Not ready'/>
                        <Dropdown.Item text="Dokument" icon='question' description='Not ready'/>
                        <Dropdown.Item text="Kontakt" icon='question' description='Not ready'/>
                        <Dropdown.Item text="Kod/hasło" icon='question' description='Not ready'/>
                    </Dropdown.Menu>
                </Dropdown>

            </Form>
        );
    }
}

export default Multicontent;
