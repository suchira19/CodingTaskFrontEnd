import React,  { useState, useEffect } from 'react';
import Split from 'react-split';

export const Editor1 = ({serverTime, metrics, isLoaded}) => {

    const [result, setResult] = useState('00:00:00');

    useEffect(() => {
      const interval = setInterval(() => {
        const secondsSinceEpoch = Math.round(Date.now() / 1000);
        setResult(result => result = new Date(((secondsSinceEpoch - serverTime)+1) * 1000).toISOString().slice(11, 19));
      }, 1000);
      return () => clearInterval(interval);
    }, []);  

  return (
    <Split
      direction='vertical'
      sizes={[60, 40]}
      style={{ height: `100vh` }}
    >
      <Split style={{ display: `flex` }} sizes={[40, 80]} minSize={[10, 90]}>
        <div style={{ backgroundColor: `blue` }}>{serverTime}<p>{result}</p></div>
        <div style={{ backgroundColor: `green`, overflowY: `scroll` }}>{metrics}</div>
      </Split>
        { !isLoaded && <div style={{ backgroundColor: `gray` }}>Loading...</div> }
    </Split>
  );
};