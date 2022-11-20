import './App.css';
import React, { Component } from 'react';
import { Editor1 } from './components/Editor1';

let recentlyFetchedServerTime = Math.round(Date.now() / 1000);
let errorMsg = {};

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        serverTime: {},
        isLoaded: false,
        timeDiff: 0,
        metrics: ""
      };
  };

  async componentDidMount() {

    let h = new Headers();
    h.append( 'authorization', 'mysecrettoken' );

    fetch('http://localhost:9091/time',{Method:'GET', headers: h})
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded : true,
          serverTime : json,
        })
        if( !json.epoch )
        {
          errorMsg = json;
        }
        else
        {
          recentlyFetchedServerTime = json.epoch.type;
        }
      });

    fetch('http://localhost:9091/metrics',{Method:'GET', headers: h})
      .then(res => res.text())
      .then(text => {
        this.setState({
          isLoaded : true,
          metrics : text
        })
      });

    try {
      
      if( Object.keys(errorMsg).length === 0 && Object.getPrototypeOf(errorMsg) === Object.prototype )
      {
        setInterval(async () => {
          const res = await fetch('http://localhost:9091/time',{Method:'GET', headers: h});
          const epochTime = await res.json();

          const metricsRes = await fetch('http://localhost:9091/metrics',{Method:'GET', headers: h});
          const metricsData = await metricsRes.text();

          this.setState({
            isLoaded : true,
            serverTime : epochTime,
            metrics : metricsData
          })
          if( !epochTime.epoch )
          {
            errorMsg = epochTime;
          }
          else
          {
            recentlyFetchedServerTime = epochTime.epoch.type;
          }
        }, 30000);
      }
    } catch(e) {
      console.log(e);
    }
}

  render() {

    var { isLoaded, metrics } = this.state;

    if( Object.keys(errorMsg).length !== 0 && Object.getPrototypeOf(errorMsg) === Object.prototype )
    {
      return <div>{errorMsg}</div>
    }
    else
    {
      return (
        <Editor1  serverTime={recentlyFetchedServerTime} metrics={metrics} isLoaded={isLoaded}/>
      );
    }
  }
}

export default App;
