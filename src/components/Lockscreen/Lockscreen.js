import React, { useState } from 'react';

import { tryCode } from './actions';
import LockscreenSection from 'components/Lockscreen/LockscreenSection';

import './Lockscreen.css';
import 'animate.css';

const RESET_ANIMATION_TIMEOUT = 1000;
const ALLOW_ANIMATION_TIMEOUT = 1000;
const CODE_MAX_LENGTH = 4;

const TITLE_DEFAULT = 'Enter Passcode';
const TITLE_OK = 'OK';
const TITLE_ERROR_CODE = 'Wrong Code';
const TITLE_ERROR_CONNECTION = 'Connection error';
const TITLE_ERROR_UNKNOWN = 'Unknown error';
const TITLE_CHECKING_AUTH = 'Checking credentials';

export default function Lockscreen(props) {
  const [codeInput, setCodeInput] = useState('');
  const [lockTitle, setLockTitle] = useState(TITLE_DEFAULT);
  const [lockInput, setLockInput] = useState(false);
  const [resetCodeAnimation, setResetCodeAnimation] = useState(false);
  const [pinAllowed, setPinAllowed] = useState(false);

  const updateCode = (number) => {
    if (lockInput) return;

    const newCode = `${codeInput}${number}`;

    setCodeInput(newCode);
    if (newCode.length >= CODE_MAX_LENGTH) {
      setLockInput(true);
      handleTryCode(newCode);
    }
  };

  const handleTryCode = (codeInput) => {
    tryCode({
      ajax_action: 'lockscreenAjax',
      operation: 'tryPasscode',
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
        resetCode(error.message);
      });
  };

  const resetCode = (errorMgs = TITLE_ERROR_UNKNOWN) => {
    errorMgs = errorMgs !== '' ? errorMgs : 'TITLE_ERROR_UNKNOWN';
    setResetCodeAnimation(true);
    setLockTitle(errorMgs);
    setTimeout(() => {
      setCodeInput('');
      setLockInput(false);
      setResetCodeAnimation(false);
      setLockTitle(TITLE_DEFAULT);
    }, RESET_ANIMATION_TIMEOUT);
  };

  const allowCode = (token) => {
    setPinAllowed(true);
    setLockTitle(TITLE_OK);
    setTimeout(() => {
      props.setToken(token);
    }, ALLOW_ANIMATION_TIMEOUT);
  };

  const title = props.isCheckingAuth ? TITLE_CHECKING_AUTH : lockTitle;

  return (
    <LockscreenSection
      title={title}
      codeInput={codeInput}
      lockInput={lockInput}
      resetCodeAnimation={resetCodeAnimation}
      isCheckingAuth={props.isCheckingAuth}
      pinAllowed={pinAllowed}
      updateCode={updateCode.bind(this)}
    />
  );
}
