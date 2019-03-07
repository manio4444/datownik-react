import React, {Component} from 'react';
import './css/reset.css';
import './css/main.css';
import PageStart from './PageStart';
import MainMenu from './MainMenu';

class App extends Component {
    state = {
        isBlurPage: false,
    };

    getBlurStyles = () => {
        return {
            filter: this.state.isBlurPage ? 'blur(4px)' : '',
            pointerEvents: this.state.isBlurPage ? 'none' : '',
        }
    };

    blurPage = () => this.setState({isBlurPage: true});

    unBlurPage = () => this.setState({isBlurPage: false});

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <MainMenu blurPage={this.blurPage} unBlurPage={this.unBlurPage} />
                </header>
                <main style={this.getBlurStyles()}>
                    <PageStart />
                </main>
            </div>
        );
    }
}

export default App;
