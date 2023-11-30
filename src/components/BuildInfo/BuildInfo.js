import React, { useEffect, useState } from 'react';
import preval from 'preval.macro';
import { getSystemInfo } from './actions';

const BuildVersion = () => (
  <div>System Version: {process.env.REACT_APP_VERSION}</div>
);
const BuildDate = () => (
  <div>Build Date: {preval`module.exports = new Date().toLocaleString();`}</div>
);
const BackendEndpoint = () => (
  <div>Backend Endpoint: {process.env.REACT_APP_ENDPOINT_URL}</div>
);
const BackendVersion = () => {
  const [backendVersion, setBackendVersion] = useState('');

  useEffect(() => {
    fetchSystemInfo();
  }, []);

  const fetchSystemInfo = () => {
    getSystemInfo()
      .then((data) => {
        setBackendVersion(data.data.result.system_version);
      })
      .catch((error) => console.error(error));
  };
  return <div>Backend Version: {backendVersion}</div>;
};

export { BuildVersion, BuildDate, BackendEndpoint, BackendVersion };
