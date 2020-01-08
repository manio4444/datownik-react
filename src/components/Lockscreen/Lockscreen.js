import React, {Component} from 'react';
import './Lockscreen.css';
import 'animate.css'

class Lockscreen extends Component {
    state = {
        opened: true,
        codeInput: '',
        lockInput: false,
        resetCodeAnimation: false,
        allowCodeAnimation: false,
    };

    keyCodesMap = [
        {keyCode: 48, clickNumber: "0"}, //0
        {keyCode: 49, clickNumber: "1"}, //1
        {keyCode: 50, clickNumber: "2"}, //2
        {keyCode: 51, clickNumber: "3"}, //3
        {keyCode: 52, clickNumber: "4"}, //4
        {keyCode: 53, clickNumber: "5"}, //5
        {keyCode: 54, clickNumber: "6"}, //6
        {keyCode: 55, clickNumber: "7"}, //7
        {keyCode: 56, clickNumber: "8"}, //8
        {keyCode: 57, clickNumber: "9"}, //9
        {keyCode: 96, clickNumber: "0"}, //numpad 0
        {keyCode: 97, clickNumber: "1"}, //numpad 1
        {keyCode: 98, clickNumber: "2"}, //numpad 2
        {keyCode: 99, clickNumber: "3"}, //numpad 3
        {keyCode: 100, clickNumber: "4"}, //numpad 4
        {keyCode: 101, clickNumber: "5"}, //numpad 5
        {keyCode: 102, clickNumber: "6"}, //numpad 6
        {keyCode: 103, clickNumber: "7"}, //numpad 7
        {keyCode: 104, clickNumber: "8"}, //numpad 8
        {keyCode: 105, clickNumber: "9"}, //numpad 9
    ];

    numberClick = (e) => {
        const number = e.target.attributes['data-button'].value;

        this.updateCode(number);
    };

    updateCode = (number) => {
        if (this.state.lockInput) return;

        const newCode = `${this.state.codeInput}${number}`;

        this.setState({
            codeInput: newCode,
        });

        if (newCode.length >= 4) {
            this.setState({
                lockInput: true,
            });
            this.tryCode(newCode);
        }
    };

    tryCode = (code) => {
        console.log('xhr');
        if (code === "1111") { //TODO - temp
            this.allowCode();
        } else {
            this.resetCode();
        }
    };

    resetCode = () => {
        this.setState({
            resetCodeAnimation: true,
        });
        setTimeout(() => {

            this.setState({
                codeInput: '',
                lockInput: false,
                resetCodeAnimation: false,
            });
        },
            1000
        );
    };

    allowCode = () => {
        this.setState({
            allowCodeAnimation: true,
        });
        setTimeout(() => {
                this.setState({
                    codeInput: '',
                    allowCodeAnimation: false,
                });
                this.props.isLogged(); //TODO - temp ?
            },
            1000
        );
    };

    onKeyDown = e => {
        const keyCode = e.keyCode;
        this.keyCodesMap.forEach((item) => {
            if (item.keyCode === keyCode) {
                this.updateCode(item.clickNumber);
            }
        })
    };

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    createButtonsRow = ({ buttons }) => <div className="lockscreen__buttons_row">
        {buttons.map((button) => <button data-button={button} onClick={this.buttonClick}>{button}</button>)}
    </div>;

    createInputsRow = ({count, className}) => {
        const codeLength = this.state.codeInput.length;
        let inputs = [];

        for (let i = 0; i < count; i++) {
            inputs.push(<span data-input={i} className={(codeLength > i) ? 'filled' : ''} />)
        }

        return <div className={`lockscreen__inputs ${className}`}>{inputs}</div>
    };

    render() {
        const dotsInputClasses = (this.state.resetCodeAnimation) ? 'animated shake' : '';
        const lockscreenClasses = ((this.state.lockInput) ? 'lockscreen--locked' : '')
        + ((this.state.allowCodeAnimation) ? ' lockscreen--allowed' : '');
        return (
            <section className={`lockscreen ${lockscreenClasses}`}>
                <div className="lockscreen__container">
                    <div className="lockscreen__title">Enter Passcode</div>
                    {this.createInputsRow({ count: 4, className: dotsInputClasses })}
                    {this.createButtonsRow({ buttons: [1,2,3] })}
                    {this.createButtonsRow({ buttons: [4,5,6] })}
                    {this.createButtonsRow({ buttons: [7,8,9] })}
                    {this.createButtonsRow({ buttons: [0] })}
                </div>
            </section>
        );
    }
}

export default Lockscreen;
