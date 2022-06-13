import React from 'react'
import preval from 'preval.macro'

const BuildVersion = () => <div>System Version: {process.env.REACT_APP_VERSION}</div>;
const BuildDate = () => <div>Build Date: {preval`module.exports = new Date().toLocaleString();`}</div>;
const BuildEnv = () => <div>System Endpoint: {process.env.REACT_APP_ENDPOINT_URL}</div>;

export {BuildVersion, BuildDate, BuildEnv};
