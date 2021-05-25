import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { routes } from "../routes";
import MainMenu from '../components/MainMenu/MainMenu';
import Footer from '../components/Footer/Footer';

const MainRouter = () => {
    const [isblurPage, setIsBlurPage] = useState(false);


    const blurPage = () => setIsBlurPage(true);
    const unBlurPage = () => setIsBlurPage(false);

    const getBlurStyles = () => {
        return {
            filter: isblurPage ? 'blur(4px)' : '',
            pointerEvents: isblurPage ? 'none' : '',
        }
    };

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header">
                    <MainMenu blurPage={blurPage} unBlurPage={unBlurPage}/>
                </header>
                <main style={getBlurStyles()}>
                    <Switch>
                        {routes.map((route, i) => <Route key={i} {...route} />)}
                    </Switch>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
};

export default MainRouter;
