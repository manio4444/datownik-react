import React, { Component } from 'react';
import './assets/css/reset.css';
import './assets/css/main.css';
import './assets/scss/page.scss';
import MainRouter from './router';
import Lockscreen from './components/Lockscreen/Lockscreen';

class App extends Component {
  state = {
    isLogged: process.env.REACT_APP_ENV === 'dev', //TODO - CREATE QUERY FOR CHECKING
  };

  setIsLogged = () => {
    this.setState({
      isLogged: true,
    });
  };

  render() {
    const pageConfig = {};

    if (!this.state.isLogged) {
      return <Lockscreen isLogged={this.setIsLogged} />;
    }
    return <MainRouter pageConfig={pageConfig} />;
  }
}

export default App;
