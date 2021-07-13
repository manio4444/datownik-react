import React, { Component } from 'react';

import { tryCode } from "./actions";

import './Lockscreen.css';
import 'animate.css'

const RESET_ANIMATION_TIMEOUT = 1000;
const ALLOW_ANIMATION_TIMEOUT = 1000;
const CODE_MAX_LENGTH = 4;

const TITLE_DEFAULT = 'Enter Passcode';
const TITLE_OK = 'OK';
const TITLE_ERROR_CODE = 'Wrong Code';
const TITLE_ERROR_CONNECTION = 'Connection error';
const TITLE_ERROR_UNKNOWN = 'Unknown error';

const LockscreenTitle = ({ title }) => (
    <div className="lockscreen__title">{title}</div>
);

const LockscreenButtonsRow = ({ buttons, handleClick }) => (
    <div className="lockscreen__buttons_row">
        {buttons.map(i => <button key={i} className={`btn-${i}`} value={i} onClick={handleClick}>{i}</button>)}
    </div>
);

const LockscreenInputsRow = ({ codeInput, resetCodeAnimation }) => {
    const codeLength = codeInput.length;
    const resetClassAnimation = resetCodeAnimation ? ' animate__animated animate__shakeX' : '';
    let inputs = [];

    for (let i = 0; i < CODE_MAX_LENGTH; i++) {
        inputs.push(<span key={i} className={(codeLength > i) ? 'filled' : ''} />)
    }

    return <div className={`lockscreen__inputs${resetClassAnimation}`}>{inputs}</div>
};

class Lockscreen extends Component {
    state = {
        codeInput: '',
        lockTitle: TITLE_DEFAULT,
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

    handleClick = e => this.updateCode(e.target.value);

    updateCode = number => {
        if (this.state.lockInput) return;

        const newCode = `${this.state.codeInput}${number}`;

        this.setState({
            codeInput: newCode,
        }, () => {
            if (newCode.length >= CODE_MAX_LENGTH) {
                this.setState({lockInput: true});
                this.tryCode(newCode);
            }
        });
    };

    tryCode = codeInput => {
        tryCode({
            ajax_action: 'lockscreenAjax',
            operation: 'tryPasscode',
            code: codeInput,
        })
        .then(res => {
            if (!res) {
                throw new Error(TITLE_ERROR_CONNECTION);
            }
            if (!res.data.result.isValid) {
                throw new Error(TITLE_ERROR_CODE);
            }
            if (res.data.result.isValid) {
                this.allowCode();
                return;
            }
            throw new Error();
        })
        .catch(error => {
            console.error(error);
            this.resetCode(error.message);
        })
    };

    resetCode = (errorMgs = TITLE_ERROR_UNKNOWN) => {
        errorMgs = errorMgs !== '' ? errorMgs : 'TITLE_ERROR_UNKNOWN';
        this.setState({
            resetCodeAnimation: true,
            lockTitle: errorMgs,
        });
        setTimeout(() => {
            this.setState({
                codeInput: '',
                lockInput: false,
                resetCodeAnimation: false,
                lockTitle: TITLE_DEFAULT,
            });
        }, RESET_ANIMATION_TIMEOUT);
    };

    allowCode = () => {
        this.setState({
            allowCodeAnimation: true,
            lockTitle: TITLE_OK,
        });
        setTimeout(() => {
            this.props.isLogged(); //TODO - temp ?
        }, ALLOW_ANIMATION_TIMEOUT);
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
        const {state} = this;

        return (
            <section className={`lockscreen ${lockedClass} ${allowedClass}`}>
                <div className="lockscreen__container">
                    <LockscreenTitle title={state.lockTitle}/>
                    <LockscreenInputsRow
                        codeInput={this.state.codeInput}
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
