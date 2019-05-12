import React, {Component} from 'react';

class SingleNote extends Component {
    fillBar = false; //for logic only, can't be async
    state = {
        txt: this.props.value,
        fillBarAnimation: false,
        fillBarDelay: 700,
    };

    placeholder = {
        adding: "Zacznij wpisywać tekst aby dodać nową notatkę",
        deleting: "Kliknięcie poza notatką spowoduje usunięcie",
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
            console.log('xhr will be here');
            // this.addNew();
            this.fillBar = false;
        }, this.state.fillBarDelay);

    };

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
                />
                <div className={`note_element__progress ${progress}`} style={progressStyle}/>
            </div>

        );
    }
}

export default SingleNote;
