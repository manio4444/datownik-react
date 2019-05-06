import React, {Component} from 'react';
import SingleNote from './SingleNote';
import './css/notes.css';
import notesData from './ExampleNotes';
import axios from 'axios';

class ListNotes extends Component {

    getNotesList() {
        return notesData; //todo - temp of cors
    };

    componentDidMount() {
        axios.post('http://datownik.studiocitrus.pl?ajax_action=notesAjax', {
            ajax_action: 'notesAjax',
            operation: 'getData',
            limit: this.props.limit,
        })
            .then(res => {
                // const posts = res.data.data.children.map(obj => obj.data);
                // this.setState({posts});
                console.log(res);
            })
            .catch(function (error) {
            console.log(error);
        });
    };

    render() {
        const notes = this.getNotesList(this.props.limit);

        return (
            <div className="notes_container">

                <SingleNote/>

                {notes.map((note) => {
                    return (
                        <SingleNote key={note.id} id={note.id} value={note.value}/>
                    );
                })}

            </div>
        );
    }
}

export default ListNotes;
