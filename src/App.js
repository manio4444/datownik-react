import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import 'dotenv';
import './assets/css/reset.css';
import './assets/css/main.css';
import './assets/scss/page.scss';
import PageStart from './pages/PageStart/PageStart';
import PageNotes from './pages/PageNotes/PageNotes';
import PageTodo from './pages/PageTodo/PageTodo';
import PageCalendar from './pages/PageCalendar/PageCalendar';
import MainMenu from './components/MainMenu/MainMenu';
import Footer from './components/Footer/Footer';
import Lockscreen from './components/Lockscreen/Lockscreen';

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
            <BrowserRouter>
                <div className="App">
                    <header className="App-header">
                        <MainMenu blurPage={this.blurPage} unBlurPage={this.unBlurPage}/>
                    </header>
                    <main style={this.getBlurStyles()}>
                        <Route path="/" exact component={PageStart}/>
                        <Route path="/notatki" component={PageNotes}/>
                        <Route path="/do-zrobienia" component={PageTodo}/>
                        <Route path="/kalendarz" component={PageCalendar}/>
                    </main>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
