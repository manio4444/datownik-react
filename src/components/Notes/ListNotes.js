import React, { Component } from 'react';
import SingleNote from './SingleNote';
import '../../assets/css/notes.css';
import axios from 'axios';

import './ListNotes.scss';

class ListNotes extends Component {
  state = {
    list: [],
    fetchingData: true,
    placeholders: Number.isInteger(this.props.placeholders)
      ? this.props.placeholders
      : 4,
  };

  getNotesList() {
    axios
      .post(process.env.REACT_APP_ENDPOINT_URL, {
        ajax_action: 'notesAjax',
        operation: 'getData',
        limit: this.props.limit,
      })
      .then((res) => {
        const list = res.data.result.map((note) => {
          return {
            id: note.id,
            value: note.txt,
          };
        });
        list.unshift({ id: 'new' });
        this.setState({
          list,
          fetchingData: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getNotesList();
  }

  addedNew(newElement) {
    const list = this.state.list.map((element) => {
      if (element.id === 'new') {
        return {
          id: newElement.id,
          value: newElement.txt,
          focusPosition: newElement.focusPosition,
        };
      }
      return element;
    });
    this.setState({ list }, () => {
      list.unshift({ id: 'new' });
      this.setState({ list });
    });
  }

  deletedNote(id) {
    const list = this.state.list.filter((element) => element.id !== id);
    this.setState({ list });
  }

  getSearch() {
    return this.state.list.filter((note) => {
      if (!note.value) return false;

      return (
        note.value
          .toLowerCase()
          .indexOf(this.props.searchQuery.toLowerCase()) !== -1
      );
    });
  }

  render() {
    let notes = [];
    if (this.state.fetchingData) {
      for (let id = 0; id < this.state.placeholders; id++)
        notes.push({
          id,
          placeholder: true,
        });
    } else {
      notes = this.props.searchQuery ? this.getSearch() : this.state.list;
    }

    return (
      <React.Fragment>
        {this.props.searchQuery && (
          <div className={'notes_found'}>
            <p>
              Znaleziono {notes.length} wyników dla "{this.props.searchQuery}"
            </p>
          </div>
        )}

        <div className="notes_container">
          {notes.map((note) => {
            return (
              <SingleNote
                key={note.id}
                id={note.id}
                value={note.value}
                addedNew={this.addedNew.bind(this)}
                focusPosition={note.focusPosition}
                deletedCallback={this.deletedNote.bind(this)}
                placeholder={note.placeholder}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default ListNotes;
