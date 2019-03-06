import React, { Component } from 'react';
import './css/reset.css';
import './css/main.css';
import PageStart from './PageStart';
import MainMenu from './MainMenu';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MainMenu />
        </header>
        <PageStart />
      </div>
    );
  }
}

export default App;
