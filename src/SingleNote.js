import React, {Component} from 'react';
import axios from "axios";

class SingleNote extends Component {
    fillBar = false; //for logic only, can't be async
    state = {
        txt: this.props.value,
        fillBarAnimation: false,
        fillBarDelay: 700,
    };
    setFocusTarget = React.createRef();
    placeholder = {
        adding: "Zacznij wpisywać tekst aby dodać nową notatkę",
        deleting: "Kliknięcie poza notatką spowoduje usunięcie",
    };

    addNew() {
        axios.post('http://localhost/datownik/', {
            ajax_action: 'notesAjax',
            operation: 'addNote',
            txt: this.state.txt,
        })
            .then(res => {
                this.props.addedNew(res.data.result);
            })
            .catch(function (error) {
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
            this.addNew();
            this.fillBar = false;
        }, this.state.fillBarDelay);

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

        return (

            <div
                className="note_element"
                data-note={id}
            >
                <textarea
                    name="note"
                    placeholder={this.placeholder.adding}
                    data-placeholder={this.placeholder.deleting}
                    value={value}
                    onChange={this.onChange}
                    ref={this.setFocusTarget}
                />
                <div className={`note_element__progress ${progress}`} style={progressStyle}/>
            </div>

        );
    }
}

export default SingleNote;
