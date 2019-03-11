import React, {Component} from 'react';

class SingleNote extends Component {
    state = {
        txt: this.props.value,
    };

    placeholder = {
        adding: "Zacznij wpisywać tekst aby dodać nową notatkę",
        deleting: "Kliknięcie poza notatką spowoduje usunięcie",
    };

    onChange = (e) => {
        this.setState({
            txt: e.target.value
        })
    };

    render() {
        const id = this.props.id;
        const value = this.state.txt;
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
                />
                <div className="note_element__progress"/>
            </div>

        );
    }
}

export default SingleNote;
