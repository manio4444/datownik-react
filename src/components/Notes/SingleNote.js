import React, { Component } from 'react';
import axios from 'axios';
import Linkify from 'react-linkify';

import { addNewNote } from './actions';
import Placeholder from '../Placeholder/Placeholder';

import './SingleNote.scss';

const FILL_BAR_DELAY = 700;

class SingleNote extends Component {
  fillBar = false; //for logic only, can't be async
  state = {
    txt: this.props.value,
    fillBarAnimation: false,
    isAdding: false,
    isEditing: false,
    isDeleting: false,
    isFocus: false,
  };
  textareaRef = React.createRef();
  placeholder = {
    adding: 'Zacznij wpisywać tekst aby dodać nową notatkę',
    deleting:
      'Kliknięcie poza notatką spowoduje usunięcie, naciśnij Ctrl + Z, aby przywrócić',
    empty: 'Notatka jest pusta',
  };

  addNew() {
    const focusPosition = this.textareaRef.current.selectionStart;
    this.setState({ isAdding: true });

    addNewNote({
      txt: this.state.txt,
    })
      .then((res) => this.props.addedNew({ ...res.data.result, focusPosition }))
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isAdding: false }));
  }

  edit() {
    this.setState({
      isEditing: true,
    });
    axios
      .post(process.env.REACT_APP_ENDPOINT_URL, {
        ajax_action: 'notesAjax',
        operation: 'editNote',
        id: this.props.id,
        txt: this.state.txt,
      })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          isEditing: false,
        });
      });
  }

  delete() {
    axios
      .post(process.env.REACT_APP_ENDPOINT_URL, {
        ajax_action: 'notesAjax',
        operation: 'deleteNote',
        id: this.props.id,
      })
      .then((res) => {
        this.setState(
          {
            isDeleting: true,
          },
          () => {
            setTimeout(() => {
              this.props.deletedCallback(this.props.id);
            }, 300);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {
    if (this.props.readonly) return;

    this.setState({
      fillBarAnimation: false,
      txt: e.target.value,
    });

    if (this.fillBar === true) {
      clearTimeout(this.fillBarTimeout);
      this.fillBar = false;
    }

    this.fillBar = true;
    setTimeout(() => this.setState({ fillBarAnimation: true }), 0);

    this.fillBarTimeout = setTimeout(() => {
      if (this.state.txt === '') {
        return;
      }

      if (this.props.id === 'new') {
        this.addNew();
      } else {
        this.edit();
      }
      this.fillBar = false;
    }, FILL_BAR_DELAY);
  };

  onFocus = () => this.setState({ isFocus: true });

  onBlur = (e) => {
    this.setState({ isFocus: false });
    if (e.target.value === '' && this.props.id !== 'new') {
      this.delete();
    }
  };

  componentDidMount() {
    if (this.props.focusPosition) {
      const textareaRef = this.textareaRef.current;

      textareaRef.focus();
      textareaRef.selectionStart = textareaRef.selectionEnd =
        this.props.focusPosition;
    }
  }

  LinkifyComponentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );

  render() {
    const { id, readonly, style } = this.props;
    const { state } = this;
    const progress = this.state.fillBarAnimation ? 'fill' : '';
    const progressStyle = {
      transitionDuration: FILL_BAR_DELAY + 'ms',
    };
    const urlifyStyle = {
      display: this.state.isFocus ? 'none' : 'block',
    };
    const placeholder =
      id === 'new' ? this.placeholder.adding : this.placeholder.deleting;
    const isDeletingClass = this.state.isDeleting ? 'deleting' : '';

    if (this.props.placeholder) {
      return (
        <div className={'note-element'}>
          <div className={'note-element__urlify'}>
            <Placeholder />
            <Placeholder />
            <Placeholder />
          </div>
        </div>
      );
    }

    return (
      <div className={`note-element ${isDeletingClass}`} style={style}>
        <textarea
          name="note"
          placeholder={readonly ? this.placeholder.empty : placeholder}
          value={state.txt}
          onChange={this.onChange}
          ref={this.textareaRef}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          disabled={readonly || state.isAdding}
        />
        <div
          className={`note-element__progress ${progress}`}
          style={progressStyle}
        />
        <div className={'note-element__urlify'} style={urlifyStyle}>
          <Linkify componentDecorator={this.LinkifyComponentDecorator}>
            {state.txt}
          </Linkify>
        </div>
      </div>
    );
  }
}

export default SingleNote;
