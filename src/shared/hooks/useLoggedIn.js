import { useEffect, useState } from 'react';
import { StorageEnum } from 'shared/consts/StorageEnum';
import { checkAuth } from 'components/Lockscreen/actions';

export function useLoggedIn() {
  const [isLogged, setIsLogged] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [token, setToken] = useState(
    sessionStorage.getItem(StorageEnum.AUTH_TOKEN)
  );

  const checkIfLogged = function () {
    setIsCheckingAuth(true);
    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    checkAuth({ token })
      .then(({ data }) => {
        setIsLogged(true);
        setIsCheckingAuth(false);
      })
      .catch((error) => {
        console.error(error);
        setIsCheckingAuth(false);
      });
  };

  const handleSetToken = function (token) {
    sessionStorage.setItem(StorageEnum.AUTH_TOKEN, token);
    setToken(token);
    setIsLogged(true);
  };

  useEffect(checkIfLogged, []);

  return { isLogged, setToken: handleSetToken, isCheckingAuth };
}
