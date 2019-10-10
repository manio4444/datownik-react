import React from 'react'
import preval from 'preval.macro'

const buildDate = () => (
    <div className="App-buildtime">
        <span className="App-buildtime__string">
            {preval`module.exports = new Date().toLocaleString();`}
        </span>
    </div>
);

export default buildDate;