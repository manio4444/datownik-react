import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from "../routes";
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
                        <Switch>
                            {routes.map((route, i) => <Route key={i} {...route} />)}
                        </Switch>
                    </main>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

export default MainRouter;
