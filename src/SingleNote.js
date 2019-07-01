import React, {Component} from 'react';
import axios from "axios";

class SingleNote extends Component {
    fillBar = false; //for logic only, can't be async
    state = {
        txt: this.props.value,
        fillBarAnimation: false,
        fillBarDelay: 700,
        isAdding: false,
        isEditing: false,
        isDeleting: false,
    };
    setFocusTarget = React.createRef();
    placeholder = {
        adding: "Zacznij wpisywać tekst aby dodać nową notatkę",
        deleting: "Kliknięcie poza notatką spowoduje usunięcie, naciśnij Ctrl + Z, aby przywrócić",
    };

    addNew() {
        this.setState({
            isAdding: true,
        });
        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
            ajax_action: 'notesAjax',
            operation: 'addNote',
            txt: this.state.txt,
        })
            .then(res => {
                this.props.addedNew(res.data.result);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
            this.setState({
                isAdding: false,
            });
        });
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

    onBlur = (e) => {
        if (e.target.value === '' && this.props.id !== 'new') {
            this.delete();
        }
    };

        componentDidMount() {
        if (this.props.setFocus) {
            this.setFocusTarget.current.focus();
        }
    }

    render() {
        const id = this.props.id;
        const value = this.state.txt;
        const progress = (this.state.fillBarAnimation) ? 'fill' : '';
        const progressStyle = {
            transitionDuration: this.state.fillBarDelay + 'ms',
        };
        const placeholder = (id === "new") ? this.placeholder.adding : this.placeholder.deleting;
        const isDeleting = (this.state.isDeleting) ? 'deleting' : '';
        return (

            <div
                className={`note_element ${isDeleting}`}
                data-note={id}
            >
                <textarea
                    name="note"
                    placeholder={placeholder}
                    value={value}
                    onChange={this.onChange}
                    ref={this.setFocusTarget}
                    onBlur={this.onBlur}
                />
                <div className={`note_element__progress ${progress}`} style={progressStyle}/>
            </div>

        );
    }
}

export default SingleNote;
