import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {
    PageStart,
    PageNotes,
    PageTodo,
    PageCalendar
} from '../pages';
import MainMenu from '../components/MainMenu/MainMenu';
import Footer from '../components/Footer/Footer';

class MainRouter extends Component {
    state = {
        isBlurPage: false,
    };

    blurPage = () => this.setState({isBlurPage: true});
    unBlurPage = () => this.setState({isBlurPage: false});

    getBlurStyles = () => {
        return {
            filter: this.state.isBlurPage ? 'blur(4px)' : '',
            pointerEvents: this.state.isBlurPage ? 'none' : '',
        }
    };

    render() {
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

export default MainRouter;
