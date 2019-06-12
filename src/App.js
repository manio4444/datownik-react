import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'dotenv';
import './css/reset.css';
import './css/main.css';
import PageStart from './PageStart';
import PageNotes from './PageNotes';
import PageTodo from './PageTodo';
import MainMenu from './MainMenu';
import Footer from './Footer';
import Lockscreen from './Lockscreen';

class App extends Component {
    state = {
        isBlurPage: false,
        isLogged: false, //TODO - CREATE QUERY FOR CHECKING
    };

    setIsLogged = () => {
        this.setState({
            isLogged: true,
        });
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
        if (!this.state.isLogged) {
            return (
                <Lockscreen isLogged={this.setIsLogged}/>
            )
        }
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <MainMenu blurPage={this.blurPage} unBlurPage={this.unBlurPage}/>
                    </header>
                    <main style={this.getBlurStyles()}>
                        <Route path="/" exact component={PageStart}/>
                        <Route path="/notatki" component={PageNotes}/>
                        <Route path="/do-zrobienia" component={PageTodo}/>
                    </main>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
