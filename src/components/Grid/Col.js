import React from 'react';

import 'assets/scss/page.scss';

const Col = ({ size, className, children }) => (
  <div className={`${className} ${size && `page__grid-${size}`}`}>
    {children}
  </div>
);

export default Col;
