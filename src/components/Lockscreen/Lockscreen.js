import React, { Component } from 'react';
import './Lockscreen.css';
import 'animate.css'
import axios from "axios";

const LockscreenTitle = ({ resetCodeAnimation, allowCodeAnimation }) => (
    <div className="lockscreen__title">
        {!resetCodeAnimation && !allowCodeAnimation && 'Enter Passcode'}
        {resetCodeAnimation && 'Wrong Code'}
        {allowCodeAnimation && 'OK'}
    </div>
);

const LockscreenButtonsRow = ({ buttons, handleClick }) => (
    <div className="lockscreen__buttons_row">
        {buttons.map((i) => <button className={`btn-${i}`} value={i} onClick={handleClick}>{i}</button>)}
    </div>
);

const LockscreenInputsRow = ({ codeInput, codeMaxLength, resetCodeAnimation }) => {
    const codeLength = codeInput.length;
    const resetClassAnimation = resetCodeAnimation ? ' animated shake' : '';
    let inputs = [];

    for (let i = 0; i < codeMaxLength; i++) {
        inputs.push(<span className={(codeLength > i) ? 'filled' : ''} />)
    }

    return <div className={`lockscreen__inputs${resetClassAnimation}`}>{inputs}</div>
};

class Lockscreen extends Component {
    state = {
        codeInput: '',
        lockInput: false,
        resetCodeAnimation: false,
        allowCodeAnimation: false,
        resetAnimationTimeout: 1000,
        allowAnimationTimeout: 1000,
        codeMaxLength: 4,
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

    handleClick = e => this.updateCode(e.target.value);

    updateCode = number => {
        if (this.state.lockInput) return;

        const newCode = `${this.state.codeInput}${number}`;

        this.setState({
            codeInput: newCode,
        }, () => {
            if (newCode.length >= this.state.codeMaxLength) {
                this.setState({lockInput: true});
                this.tryCode(newCode);
            }
        });
    };

    tryCode = codeInput => {
        axios.post(process.env.REACT_APP_ENDPOINT_URL, {
            ajax_action: 'lockscreenAjax',
            operation: 'tryPasscode',
            code: codeInput,
        })
        .then(res => {
            if (res.data.result.isValid) {
                this.allowCode();
            } else {
                this.resetCode();
            }
        })
        .catch(error => {
            console.log(error);
            this.resetCode();
        })
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
        }, this.state.resetAnimationTimeout);
    };

    allowCode = () => {
        this.setState({
            allowCodeAnimation: true,
        });
        setTimeout(() => {
            this.props.isLogged(); //TODO - temp ?
        }, this.state.allowAnimationTimeout);
    };

    onKeyDown = e => {
        this.keyCodesMap.forEach(item => {
            if (item.keyCode === e.keyCode) {
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

    render() {
        const lockedClass = ((this.state.lockInput) ? 'lockscreen--locked' : '');
        const allowedClass = ((this.state.allowCodeAnimation) ? ' lockscreen--allowed' : '');

        return (
            <section className={`lockscreen ${lockedClass} ${allowedClass}`}>
                <div className="lockscreen__container">
                    <LockscreenTitle
                        resetCodeAnimation={this.state.resetCodeAnimation}
                        allowCodeAnimation={this.state.allowCodeAnimation}
                    />
                    <LockscreenInputsRow
                        codeInput={this.state.codeInput}
                        codeMaxLength={this.state.codeMaxLength}
                        resetCodeAnimation={this.state.resetCodeAnimation}
                    />
                    <LockscreenButtonsRow buttons={[1,2,3]} handleClick={this.handleClick} />
                    <LockscreenButtonsRow buttons={[4,5,6]} handleClick={this.handleClick} />
                    <LockscreenButtonsRow buttons={[7,8,9]} handleClick={this.handleClick} />
                    <LockscreenButtonsRow buttons={[0]} handleClick={this.handleClick} />
                </div>
            </section>
        );
    }
}

export default Lockscreen;
