import React, {Component} from 'react';
import SingleNote from './SingleNote';
import './css/notes.css';
import axios from 'axios';

class ListNotes extends Component {
    state = {
        list: [],
    };

    getNotesList() {
        axios.post('http://localhost/datownik/?ajax_action=notesAjax', {
            ajax_action: 'notesAjax',
            operation: 'getData',
            limit: this.props.limit,
        })
            .then(res => {
                const list = res.data.result.map(note => {
                    return {
                        id: note.id,
                        value: note.txt,
                    }
                });
                this.setState({list});

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getNotesList();
    };

    render() {
        const notes = this.state.list;

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
