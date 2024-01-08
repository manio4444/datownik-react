import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainMenu from 'components/MainMenu/MainMenu';
import Footer from 'components/Footer/Footer';
import {
  PageStart,
  PageNotes,
  PageTodo,
  PageCalendar,
  PageDocs,
  PageBirthdays,
} from 'pages';
import { RouterPaths } from './consts';

const MainRouter = () => {
  const [isblurPage, setIsBlurPage] = useState(false);

  const blurPage = () => setIsBlurPage(true);
  const unBlurPage = () => setIsBlurPage(false);

  const getBlurStyles = () => {
    return {
      filter: isblurPage ? 'blur(4px)' : '',
      pointerEvents: isblurPage ? 'none' : '',
    };
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <MainMenu blurPage={blurPage} unBlurPage={unBlurPage} />
        </header>
        <main style={getBlurStyles()}>
          <Routes>
            <Route path={'/'} element={<PageStart />} exact={true} />
            <Route
              path={`/${RouterPaths.NOTES_SINGLE}`}
              element={<PageNotes />}
            />
            <Route path={`/${RouterPaths.NOTES}`} element={<PageNotes />} />
            <Route path={`/${RouterPaths.TODO}`} element={<PageTodo />} />
            <Route
              path={`/${RouterPaths.CALENDAR_DATE}`}
              element={<PageCalendar />}
            />
            <Route
              path={`/${RouterPaths.CALENDAR}`}
              element={<PageCalendar />}
            />{' '}
            <Route
              path={`/${RouterPaths.CALENDAR_BIRTHDAYS}`}
              element={<PageBirthdays />}
            />
            <Route
              path={`/${RouterPaths.DOCS_SINGLE}`}
              element={<PageDocs />}
            />
            <Route path={`/${RouterPaths.DOCS}`} element={<PageDocs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default MainRouter;
