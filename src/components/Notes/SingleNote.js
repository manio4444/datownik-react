import React, { Component } from 'react';
import axios from "axios";
import Linkify from 'react-linkify';

import addNewNote from './actions';

import './SingleNote.scss'

class SingleNote extends Component {
    fillBar = false; //for logic only, can't be async
    state = {
        txt: this.props.value,
        fillBarAnimation: false,
        fillBarDelay: 700,
        isAdding: false,
        isEditing: false,
        isDeleting: false,
        isFocus: false,
    };
    setFocusTarget = React.createRef();
    placeholder = {
        adding: "Zacznij wpisywać tekst aby dodać nową notatkę",
        deleting: "Kliknięcie poza notatką spowoduje usunięcie, naciśnij Ctrl + Z, aby przywrócić",
        empty: "Notatka jest pusta",
    };

    addNew() {
        this.setState({isAdding: true});

        addNewNote({
            txt: this.state.txt
        })
            .then(res => this.props.addedNew(res.data.result))
            .catch(error => console.error(error))
            .finally(() => this.setState({isAdding: false}));
    };

    edit() {
        this.setState({
            isEditing: true,
        });
        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
            ajax_action: 'notesAjax',
            operation: 'editNote',
            id: this.props.id,
            txt: this.state.txt,
        })
            .then(res => {
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState({
                    isEditing: false,
                });
            });
    };

    delete() {
        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
            ajax_action: 'notesAjax',
            operation: 'deleteNote',
            id: this.props.id,
        })
            .then(res => {
                this.setState({
                    isDeleting: true,
                }, () => {
                    setTimeout(() => {
                        this.props.deletedCallback(this.props.id);
                    }, 300);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

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
        setTimeout(() => this.setState({fillBarAnimation: true}), 0);

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
        }, this.state.fillBarDelay);

    };

    onFocus = () => this.setState({ isFocus: true });

    onBlur = (e) => {
        this.setState({ isFocus: false });
        if (e.target.value === '' && this.props.id !== 'new') {
            this.delete();
        }
    };

    componentDidMount() {
        if (this.props.setFocus) {
            this.setFocusTarget.current.focus();
        }
    }

    LinkifyComponentDecorator = (href, text, key) => <a href={href} key={key} target="_blank" rel="noopener noreferrer">{text}</a>;

    render() {
        const {id, readonly, style} = this.props;
        const value = this.state.txt;
        const progress = (this.state.fillBarAnimation) ? 'fill' : '';
        const progressStyle = {
            transitionDuration: this.state.fillBarDelay + 'ms',
        };
        const urlifyStyle = {
            display: this.state.isFocus ? 'none' : 'block',
        };
        const placeholder = (id === "new") ? this.placeholder.adding : this.placeholder.deleting;
        const isDeleting = (this.state.isDeleting) ? 'deleting' : '';
        return (

            <div
                className={`note-element ${isDeleting}`}
                style={style}
            >
                <textarea
                    name="note"
                    placeholder={readonly ? this.placeholder.empty : placeholder}
                    value={value}
                    onChange={this.onChange}
                    ref={this.setFocusTarget}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    disabled={readonly}
                />
                <div className={`note-element__progress ${progress}`} style={progressStyle}/>
                <div className={'note-element__urlify'} style={urlifyStyle}>
                    <Linkify componentDecorator={this.LinkifyComponentDecorator}>
                        {value}
                    </Linkify>
                </div>
            </div>

        );
    }
}

export default SingleNote;
