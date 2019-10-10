import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './MainMenu.css';

class MainMenu extends Component {
    state = {
        opened: false
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    };

    setWrapperRef = (node) => {
        this.refMenuWrapper = node;
    };

    handleClickOutside = (event) => {
        if (
            this.refMenuWrapper
            && !this.refMenuWrapper.contains(event.target)
            && this.state.opened
        ) {
            this.toggleState();
        }
    };

    handleClickElement = () => {
        this.toggleState();
    };

    routeElements = [
        {
            url: "/",
            name: "Main",
        },
        {
            url: "/kalendarz",
            name: "Kalendarz",
        },
        {
            url: "/zakladki",
            name: "Zakladki",
        },
        {
            url: "/notatki",
            name: "Notatki",
        },
        {
            url: "/dokumenty",
            name: "Dokumenty",
        },
        {
            url: "/do-zrobienia",
            name: "To do",
        },
        {
            url: "/kontakty",
            name: "Kontakty",
        },
        {
            url: "/pliki",
            name: "Pliki",
        },
        {
            url: "/ustawienia",
            name: "Ustawienia",
        },
    ];

    toggleState = () => {
        this.setState(prevState => ({
            opened: !prevState.opened,
        }), () => {
            this.state.opened ? this.props.blurPage() : this.props.unBlurPage();
        });
    };

    getStylesMenu = () => {
        return {
            transform: !this.state.opened ? 'translateX(-100%)' : '',
        }
    };

    render() {
        return (
            <div className="MainMenu">
                <button type="button" className="hamburger" onClick={this.toggleState}><span className="hamburger_line" /></button>
                <div className="MainMenuWrapper" style={this.getStylesMenu()} ref={this.setWrapperRef}>
                <nav>
                    <button type="button" className="hamburger_close" onClick={this.toggleState}><span className="hamburger_line" /></button>
                    <ul>
                        {this.routeElements.map((link, i) => {
                            return (
                                <li key={i} onClick={this.handleClickElement}>
                                    <Link to={link.url}>{link.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                </div>
            </div>
        );
    }
}

export default MainMenu;
