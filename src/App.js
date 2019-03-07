import React, {Component} from 'react';
import './css/reset.css';
import './css/main.css';
import PageStart from './PageStart';
import MainMenu from './MainMenu';

class App extends Component {
    state = {
        isBlurPage: false,
    };

    getStyles = () => {
        return {
            cursor: 'pointer',
            filter: this.state.isBlurPage ? 'blur(4px)' : '',
            pointerEvents: this.state.isBlurPage ? 'none' : '',
        }
    };

    blurPage = () => {
        console.log('blur');
      this.setState({isBlurPage: true});
    };



    render() {
        return (
            <div className="App" style={this.getStyles()}>
                <header className="App-header">
                    <MainMenu blurPage={this.blurPage}/>
                </header>
                <PageStart/>
            </div>
        );
    }
}

export default App;
