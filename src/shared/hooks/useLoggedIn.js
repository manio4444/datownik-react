import { useEffect, useState } from 'react';
import { StorageEnum } from 'shared/consts/StorageEnum';
import { checkAuth, tryCode } from 'components/Lockscreen/actions';
import { getApiErrorMessage } from 'api/api';

const LOGIN_DELAY_TIMEOUT = 1000;

const TITLE_ERROR_CODE = 'Wrong Code';
const TITLE_ERROR_CONNECTION = 'Connection error';
const TITLE_ERROR_LOGOUT = 'Logged out';

export function useLoggedIn() {
  const [isLogged, setIsLogged] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [token, setToken] = useState(
    sessionStorage.getItem(StorageEnum.AUTH_TOKEN)
  );
  const [authAllowed, setAuthAllowed] = useState(false);
  const [error, setError] = useState('');

  const logout = function (error = TITLE_ERROR_LOGOUT) {
    setIsLogged(false);
    setIsCheckingAuth(false);
    setToken('');
    setAuthAllowed(false);
    setError(error);
  };

  const checkIfLogged = function () {
    setError('');
    setIsCheckingAuth(true);
    if (!token) {
      logout();
      return;
    }

    checkAuth({ token })
      .then(() => {
        setAuthAllowed(true);
        setIsLoggedWithDelay();
      })
      .catch((error) => {
        console.error(error);
        setError(getApiErrorMessage(error));
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  };

  const setIsLoggedWithDelay = function (delay = LOGIN_DELAY_TIMEOUT) {
    setTimeout(() => {
      setIsLogged(true);
    }, delay);
  };

  const handleSetToken = function (token) {
    sessionStorage.setItem(StorageEnum.AUTH_TOKEN, token);
    setToken(token);
  };

  const allowCode = (token) => {
    setAuthAllowed(true);
    handleSetToken(token);
    setIsLoggedWithDelay();
  };

  const handleTryCode = function (codeInput) {
    setError('');
    setIsCheckingAuth(true);
    tryCode({
      code: codeInput,
    })
      .then((res) => {
        if (!res) {
          throw new Error(TITLE_ERROR_CONNECTION);
        }
        if (!res.data.result.isValid) {
          throw new Error(TITLE_ERROR_CODE);
        }
        if (res.data.result.isValid) {
          allowCode(res.data.result.token);
          return;
        }
        throw new Error();
      })
      .catch((error) => {
        console.error(error);
        setError(getApiErrorMessage(error));
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  };

  useEffect(checkIfLogged, [token]);

  return {
    isLogged,
    isCheckingAuth,
    tryCode: handleTryCode,
    logInError: error,
    authAllowed,
    logout,
  };
}
