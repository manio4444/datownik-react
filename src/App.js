import React from 'react';

import 'assets/css/reset.css';
import 'assets/css/main.css';
import 'assets/scss/page.scss';

import MainRouter from 'router';
import Lockscreen from 'components/Lockscreen/Lockscreen';
import { useLoggedIn } from 'shared/hooks/useLoggedIn';

export default function App() {
  const { isLogged, isCheckingAuth, tryCode, logInError, authAllowed, logout } =
    useLoggedIn();

  return isLogged ? (
    <MainRouter logout={logout} />
  ) : (
    <Lockscreen
      isCheckingAuth={isCheckingAuth}
      tryCode={tryCode}
      error={logInError}
      authAllowed={authAllowed}
    />
  );
}
