import React from 'react';
import './App.css';

class CountDownClock extends React.Component {
    render() {
        return (
            <div className="count-down-clock-wrapper">
              <div className="count-down-clock">
                {this.props.display}
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
            <div className={"count-down-display " + this.props.display} ></div>
        )
    };
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayClass: 'count-display-green',
      countDown: false,
      timerMinutes: null,
      remainingTime: null,
      warningTime: null
    };
  }

  calculateRemainingTime(){
    //Initial count down
    if (this.state.countDown && !this.state.remainingTime){
      this.setState((state, props) => {
        return {remainingTime: state.timerMinutes * 60};  //Return time in seconds
      });
    }
    // Active count down
    else if (this.state.countDown && this.state.remainingTime){
      this.setState((state, props) => {
        return {remainingTime: state.remainingTime - 1}; //subtract a second
      });
    }
    // Paused count down
    else if (!this.state.countDown && this.state.remainingTime){
      this.setState((state, props) => {
        return {remainingTime: state.remainingTime};  //return remaining time since time is paused
      });
    }
    // Count down not started
    else {
      this.setState((state, props) => {
        return {remainingTime : null};  //there is no timer
      });
    }
  }


  render() {
    return (
        <div className="app">
          <CountDownDisplay
            display={this.state.displayClass}
          />
          <CountDownClock
            display={this.state.remainingTime}
          />
          <CountDownInput/>
          <CountDownControl/>
        </div>
    )
  }
}


export default App;
