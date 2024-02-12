import React, { useEffect, useState } from 'react';

import LockscreenSection from 'components/Lockscreen/LockscreenSection';

import './Lockscreen.css';
import 'animate.css';

const RESET_ANIMATION_TIMEOUT = 1000;
const CODE_MAX_LENGTH = 4;

const TITLE_DEFAULT = 'Enter Passcode';
const TITLE_OK = 'OK';
const TITLE_CHECKING_AUTH = 'Checking credentials';

export default function Lockscreen(props) {
  const [codeInput, setCodeInput] = useState('');
  const [errorAnimation, setErrorAnimation] = useState(false);

  const isMaxLengthCode = (code) => code.length >= CODE_MAX_LENGTH;

  const updateCode = (number) => {
    if (props.isCheckingAuth) return;

    const newCode = `${codeInput}${number}`;

    setCodeInput(newCode);
    if (isMaxLengthCode(newCode)) {
      props.tryCode(newCode);
    }
  };

  const resetCode = () => {
    if (!codeInput) return;
    setErrorAnimation(true);
    setTimeout(() => {
      setCodeInput('');
      setErrorAnimation(false);
    }, RESET_ANIMATION_TIMEOUT);
  };

  useEffect(() => {
    if (props.error) resetCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.error]);

  const getTitle = () => {
    if (errorAnimation) return props.error;
    if (props.isCheckingAuth && !isMaxLengthCode(codeInput))
      return TITLE_CHECKING_AUTH;
    if (props.authAllowed) return TITLE_OK;
    return TITLE_DEFAULT;
  };

  return (
    <LockscreenSection
      title={getTitle()}
      codeInput={codeInput}
      lockInput={errorAnimation || props.isCheckingAuth || props.authAllowed}
      resetCodeAnimation={errorAnimation}
      pinAllowed={props.authAllowed}
      updateCode={updateCode.bind(this)}
    />
  );
}
