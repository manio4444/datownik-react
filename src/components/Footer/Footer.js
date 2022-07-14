import React, { Component } from 'react';
import {
  BuildDate,
  BuildEnv,
  BuildVersion,
} from 'components/BuildInfo/BuildInfo';

class Footer extends Component {
  getStyles = {
    backgroundColor: '#333333',
    textAlign: 'center',
  };

  render() {
    return (
      <footer className="App-Footer page__section" style={this.getStyles}>
        <div className="page__container">
          <BuildVersion />
          <BuildDate />
          <BuildEnv />
        </div>
      </footer>
    );
  }
}

export default Footer;
