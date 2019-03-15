import React, {Component} from 'react';

class SingleNote extends Component {
    state = {
        txt: this.props.value,
        fillBar: false,
        fillBarDelay: 700,
    };

    placeholder = {
        adding: "Zacznij wpisywać tekst aby dodać nową notatkę",
        deleting: "Kliknięcie poza notatką spowoduje usunięcie",
    };

    onChange = (e) => {
        if (this.state.fillBar === true) {
            this.setState({
                fillBar: false,
            });
            clearTimeout(this.fillBarTimeout);
        }

        this.setState({
            txt: e.target.value,
        });

        setTimeout(() => this.setState({fillBar: true}), 0);

        this.fillBarTimeout = setTimeout(() => {
            console.log('xhr will be here');
        }, this.state.fillBarDelay);

    };

    render() {
        const id = this.props.id;
        const value = this.state.txt;
        const progress = (this.state.fillBar) ? 'fill' : '';
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
                />
                <div className={`note_element__progress ${progress}`} style={progressStyle}/>
            </div>

        );
    }
}

export default SingleNote;
