import React, {Component} from 'react';
import SingleNote from './SingleNote';
import './css/notes.css';
import notesData from './ExampleNotes';

class ListNotes extends Component {

    getNotesList = () => {
        return notesData; //todo - temp of cors
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
