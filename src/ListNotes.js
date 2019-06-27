import React, {Component} from 'react';
import SingleNote from './SingleNote';
import './assets/css/notes.css';
import axios from 'axios';

class ListNotes extends Component {
    state = {
        list: [],
    };

    getNotesList() {
        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
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
                list.unshift({id: "new"});
                this.setState({list});

            })
            .catch(function (error) {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getNotesList();
    };

    addedNew(newElement) {
        const list = this.state.list.map((element) => {
            if (element.id === 'new') {
                return {
                    id: newElement.id,
                    value: newElement.txt,
                    setFocus: true,
                }
            }
            return element;
        });
        this.setState({list}, () => {
            list.unshift({id: "new"});
            this.setState({list})
        });

    };

    deletedNote(id) {
        const list = this.state.list.filter(element => element.id !== id);
        this.setState({list});
    };

    render() {
        const notes = this.state.list;

        return (
            <div className="notes_container">

                {notes.map((note) => {
                    return (
                        <SingleNote
                            key={note.id}
                            id={note.id}
                            value={note.value}
                            addedNew={this.addedNew.bind(this)}
                            setFocus={note.setFocus}
                            deletedCallback={this.deletedNote.bind(this)}
                        />
                    );
                })}

            </div>
        );
    }
}

export default ListNotes;
