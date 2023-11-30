import React from 'react';
import {
  BackendEndpoint,
  BackendVersion,
  BuildDate,
  BuildVersion,
} from 'components/BuildInfo/BuildInfo';

const Footer = () => {
  const getStyles = {
    backgroundColor: '#333333',
    textAlign: 'center',
  };

  return (
    <footer className="App-Footer page__section" style={getStyles}>
      <div className="page__container">
        <BuildVersion />
        <BuildDate />
        <BackendEndpoint />
        <BackendVersion />
      </div>
    </footer>
  );
};

export default Footer;
