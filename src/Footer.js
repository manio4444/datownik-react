import React, {Component} from 'react';
import BuildDate from "./BuildDate";

class Footer extends Component {

    render() {
        return (
            <footer className="App-Footer">
                <BuildDate/>
            </footer>
        );
    }
}

export default Footer;
