import React from 'react';

import 'assets/css/reset.css';
import 'assets/css/main.css';
import 'assets/scss/page.scss';

import MainRouter from 'router';
import Lockscreen from 'components/Lockscreen/Lockscreen';
import { useLoggedIn } from 'shared/hooks/useLoggedIn';

export default function App() {
  const { isLogged, setToken, isCheckingAuth } = useLoggedIn();

  return isLogged ? (
    <MainRouter />
  ) : (
    <Lockscreen setToken={setToken} isCheckingAuth={isCheckingAuth} />
  );
}
