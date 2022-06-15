import React, { useEffect } from 'react';

import { NumericKeyCodesEnum } from 'shared/consts/NumericKeyCodesEnum';

import './Lockscreen.css';
import 'animate.css';

const CODE_MAX_LENGTH = 4;

const LockscreenTitle = ({ title }) => (
  <div className="lockscreen__title">{title}</div>
);

const LockscreenButtonsRow = ({ buttons, handleClick }) => (
  <div className="lockscreen__buttons_row">
    {buttons.map((i) => (
      <button key={i} className={`btn-${i}`} value={i} onClick={handleClick}>
        {i}
      </button>
    ))}
  </div>
);

const LockscreenInputsRow = ({ codeInput, resetCodeAnimation }) => {
  const codeLength = codeInput.length;
  const resetClassAnimation = resetCodeAnimation
    ? ' animate__animated animate__shakeX'
    : '';
  let inputs = [];

  for (let i = 0; i < CODE_MAX_LENGTH; i++) {
    inputs.push(<span key={i} className={codeLength > i ? 'filled' : ''} />);
  }

  return (
    <div className={`lockscreen__inputs${resetClassAnimation}`}>{inputs}</div>
  );
};

export default function LockscreenSection({
  title,
  codeInput,
  lockInput,
  resetCodeAnimation,
  isCheckingAuth,
  pinAllowed,
  updateCode,
}) {
  const handleClick = (e) => updateCode(e.target.value);

  const handleOnKeyDown = (e) => {
    if (NumericKeyCodesEnum[e.keyCode]) {
      updateCode(NumericKeyCodesEnum[e.keyCode]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleOnKeyDown);
    return () => {
      document.removeEventListener('keydown', handleOnKeyDown);
    };
  }, [codeInput]);

  const lockedClass = lockInput || isCheckingAuth ? 'lockscreen--locked' : '';
  const allowedClass = pinAllowed ? ' lockscreen--allowed' : '';

  return (
    <section className={`lockscreen ${lockedClass} ${allowedClass}`}>
      <div className="lockscreen__container">
        <LockscreenTitle title={title} />
        <LockscreenInputsRow
          codeInput={codeInput}
          resetCodeAnimation={resetCodeAnimation}
        />
        <LockscreenButtonsRow buttons={[1, 2, 3]} handleClick={handleClick} />
        <LockscreenButtonsRow buttons={[4, 5, 6]} handleClick={handleClick} />
        <LockscreenButtonsRow buttons={[7, 8, 9]} handleClick={handleClick} />
        <LockscreenButtonsRow buttons={[0]} handleClick={handleClick} />
      </div>
    </section>
  );
}
