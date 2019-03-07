import React, {Component} from 'react';
import './MainMenu.css';

class MainMenu extends Component {
    openState = () => {
        console.log(this.state.opened);

        this.setState({
            opened: !this.state.opened,
        });

        this.props.blurPage();
    };
    state = {
        opened: false
    };

    render() {
        return (
            <div className="MainMenu">
                <button type="button" className="hamburger" onClick={this.openState}><span className="hamburger_line"></span></button>
                <div className="MainMenuWrapper">
                <nav>
                    <button type="button" className="hamburger_close"><span className="hamburger_line"></span></button>
                    <ul>
                        <li><a href="<?php $explode = explode('?', $_SERVER['REQUEST_URI'], 2); echo $explode[0]; ?>">Main</a></li>
                        <li><a href="?page=kalendarz">Kalendarz</a></li>
                        <li><a href="?page=zakladki">Zakladki</a></li>
                        <li><a href="?page=notatki">Notatki</a></li>
                        <li><a href="?page=dokumenty">Dokumenty</a></li>
                        <li><a href="?page=do-zrobienia">To do</a></li>
                        <li><a href="?page=kontakty">Kontakty</a></li>
                        <li><a href="?page=pliki">Pliki</a></li>
                        <li><a href="?page=ustawienia">Ustawienia</a></li>
                    </ul>
                </nav>
                </div>
            </div>
        );
    }
}

export default MainMenu;
