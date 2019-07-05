import React from 'react';
import './App.css';

class CountDownClock extends React.Component {
    render() {
        return (
            <div className="count-down-clock-wrapper">
              <div className="count-down-clock">
                {/* TODO */}
              </div>
            </div>
        )
    };
}

class CountDownInput extends React.Component {
    render() {
        return (
            <div className="count-down-input-wrapper">
              <p>Enter Time in Minutes</p>
              <input
                  type="number"
                  className="count-down-input"
                  min="1"
              />
              <p>Warning will displayed after {/* TODO: Fill in Time */} minute(s).</p>
            </div>
        )
    };
}

class CountDownControl extends React.Component {
    render() {
        return (
            <div className="count-down-control">
                <button
                    className="count-down-start"
                >
                  <i className="material-icons">play_arrow</i>
                </button>
                <button
                    className="count-down-pause"
                >
                  <i className="material-icons">pause</i>
                </button>
                <button
                    className="count-down-stop"
                >
                  <i className="material-icons">stop</i>
                </button>
                <button
                    className="count-down-restart"
                >
                  <i className="material-icons">repeat</i>
                </button>
            </div>
        )
    };
}


class CountDownDisplay extends React.Component {
    render() {
        return (
            <div className="count-down-display count-display-green"></div>
        )
    };
}

class App extends React.Component {
  render() {
    return (
        <div className="app">
          <CountDownDisplay/>
          <CountDownClock/>
          <CountDownInput/>
          <CountDownControl/>
        </div>
    )
  }
}


export default App;
