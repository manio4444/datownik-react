import React, { useEffect } from 'react';

import './Lockscreen.css';
import 'animate.css';

const CODE_MAX_LENGTH = 4;

const keyCodesMap = [
  { keyCode: 48, clickNumber: '0' }, //0
  { keyCode: 49, clickNumber: '1' }, //1
  { keyCode: 50, clickNumber: '2' }, //2
  { keyCode: 51, clickNumber: '3' }, //3
  { keyCode: 52, clickNumber: '4' }, //4
  { keyCode: 53, clickNumber: '5' }, //5
  { keyCode: 54, clickNumber: '6' }, //6
  { keyCode: 55, clickNumber: '7' }, //7
  { keyCode: 56, clickNumber: '8' }, //8
  { keyCode: 57, clickNumber: '9' }, //9
  { keyCode: 96, clickNumber: '0' }, //numpad 0
  { keyCode: 97, clickNumber: '1' }, //numpad 1
  { keyCode: 98, clickNumber: '2' }, //numpad 2
  { keyCode: 99, clickNumber: '3' }, //numpad 3
  { keyCode: 100, clickNumber: '4' }, //numpad 4
  { keyCode: 101, clickNumber: '5' }, //numpad 5
  { keyCode: 102, clickNumber: '6' }, //numpad 6
  { keyCode: 103, clickNumber: '7' }, //numpad 7
  { keyCode: 104, clickNumber: '8' }, //numpad 8
  { keyCode: 105, clickNumber: '9' }, //numpad 9
];

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
    const keyCodeClicked = keyCodesMap.find(
      (item) => item.keyCode === e.keyCode
    );

    if (keyCodeClicked) {
      console.log('### onKeyDown', keyCodeClicked);
      updateCode(keyCodeClicked.clickNumber);
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
