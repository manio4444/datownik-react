import React, {Component} from 'react';
import BuildDate from "../BuildDate/BuildDate";

class Footer extends Component {

    getStyles = {
        backgroundColor: '#333333',
        textAlign: 'center',
    };

    render() {
        return (
            <footer className="App-Footer page__section" style={this.getStyles}>
                <div className='page__container'>
                    Build Date: <BuildDate/>
                </div>
            </footer>
        );
    }
}

export default Footer;
