import React from 'react';
import './Placeholder.scss';
import clsx from 'clsx';

export default ({ inline, width }) => {
  return (
    <div
      className={clsx('placeholder-item', {
        'placeholder-item--inline': inline,
      })}
      style={{ width: width ? width : null }}
    >
      &nbsp;
    </div>
  );
};
