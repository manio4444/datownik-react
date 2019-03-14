import React, {Component} from 'react';
import './Lockscreen.css';
import 'animate.css'

class MainMenu extends Component {
    state = {
        opened: true,
        codeInput: '',
        lockInput: false,
        resetCodeAnimation: false,
        allowCodeAnimation: false,
    };

    numberClick = (e) => {
        if (this.state.lockInput) return;

        const number = e.target.attributes['data-button'].value;
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
        console.log(code);
        if (code == 1111) { //TODO - temp
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

    render() {
        const code = () => this.state.codeInput;
        const dotsInputClasses = (this.state.resetCodeAnimation) ? 'animated shake' : '';
        const lockscreenClasses = ((this.state.lockInput) ? 'lockscreen--locked' : '')
        + ((this.state.allowCodeAnimation) ? ' lockscreen--allowed' : '');
        return (
            <section className={`lockscreen ${lockscreenClasses}`}>
                <div className="lockscreen__container">
                    <div className="lockscreen__title">Enter Passcode</div>
                    <div className={`lockscreen__inputs ${dotsInputClasses}`}>
                        <span data-input="1" className={(code().length >= 1) ? 'filled' : ''} />
                        <span data-input="2" className={(code().length >= 2) ? 'filled' : ''} />
                        <span data-input="3" className={(code().length >= 3) ? 'filled' : ''} />
                        <span data-input="4" className={(code().length >= 4) ? 'filled' : ''} />
                    </div>
                    <div className="lockscreen__buttons_row">
                        <button data-button="1" onClick={this.numberClick}>1</button>
                        <button data-button="2" onClick={this.numberClick}>2</button>
                        <button data-button="3" onClick={this.numberClick}>3</button>
                    </div>
                    <div className="lockscreen__buttons_row">
                        <button data-button="4" onClick={this.numberClick}>4</button>
                        <button data-button="5" onClick={this.numberClick}>5</button>
                        <button data-button="6" onClick={this.numberClick}>6</button>
                    </div>
                    <div className="lockscreen__buttons_row">
                        <button data-button="7" onClick={this.numberClick}>7</button>
                        <button data-button="8" onClick={this.numberClick}>8</button>
                        <button data-button="9" onClick={this.numberClick}>9</button>
                    </div>
                    <div className="lockscreen__buttons_row">
                        <button data-button="0" onClick={this.numberClick}>0</button>
                    </div>
                </div>
            </section>
        );
    }
}

export default MainMenu;
