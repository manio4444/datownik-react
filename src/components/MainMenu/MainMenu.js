import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

const MainMenu = (props) => {
  const [opened, setOpened] = useState(false);
  const refMenu = useRef(null);

  useEffect(() => {
    toggleBlur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  useEffect(() => {
    const handleMousedown = (event) => {
      if (
        refMenu.current &&
        !refMenu.current.contains(event.target) &&
        opened
      ) {
        setOpened(false);
      }
    };

    document.addEventListener('mousedown', handleMousedown);
    return () => {
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, [opened]);

  const handleClickElement = () => {
    toggleState();
  };

  const routeElements = [
    {
      url: '/',
      name: 'Main',
    },
    {
      url: '/kalendarz',
      name: 'Kalendarz',
    },
    {
      url: '/zakladki',
      name: 'Zakladki',
    },
    {
      url: '/notatki',
      name: 'Notatki',
    },
    {
      url: '/dokumenty',
      name: 'Dokumenty',
    },
    {
      url: '/do-zrobienia',
      name: 'To do',
    },
    {
      url: '/kontakty',
      name: 'Kontakty',
    },
    {
      url: '/pliki',
      name: 'Pliki',
    },
    {
      url: '/ustawienia',
      name: 'Ustawienia',
    },
  ];

  const toggleState = () => {
    setOpened((prevOpened) => !prevOpened);
  };

  const toggleBlur = () => {
    if (opened) {
      props.blurPage();
    } else {
      props.unBlurPage();
    }
  };

  const getStylesMenu = () => {
    return {
      transform: !opened ? 'translateX(-100%)' : '',
    };
  };

  return (
    <div className="MainMenu">
      <button type="button" className="hamburger" onClick={toggleState}>
        <span className="hamburger_line" />
      </button>
      <div className="MainMenuWrapper" style={getStylesMenu()} ref={refMenu}>
        <nav>
          <button
            type="button"
            className="hamburger_close"
            onClick={toggleState}
          >
            <span className="hamburger_line" />
          </button>
          <ul>
            {routeElements.map((link, i) => {
              return (
                <li key={i} onClick={handleClickElement}>
                  <Link to={link.url}>{link.name}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MainMenu;
