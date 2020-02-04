import React from 'react'
import preval from 'preval.macro'

const BuildVersion = () => <div>System Version: {process.env.REACT_APP_VERSION}</div>;
const BuildDate = () => <div>Build Date: {preval`module.exports = new Date().toLocaleString();`}</div>;
const BuildEnv = () => <div>System Version: {process.env.REACT_APP_ENV}</div>;

export {BuildVersion, BuildDate, BuildEnv};
