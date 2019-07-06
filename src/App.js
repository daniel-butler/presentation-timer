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

class CountDownControl extends React.Component {
    render() {
        return (
            <div className="base-control">
                <div className="count-down-input-wrapper">
                  <p>Enter Time in Minutes</p>
                  <input
                      type="number"
                      className="count-down-input"
                      min=".1"
                      step=".1"
                      onBlur={this.props.inputMinute}
                  >
                  </input>
                  <p>Warning will displayed after {/* TODO: Fill in Time */} minute(s).</p>
                </div>
                <div className="count-down-control">
                    <button
                        onClick={this.props.clickStart}
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
                        onClick={this.props.clickStop}
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
            </div>
        )
    };
}


class CountDownDisplay extends React.Component {
    render() {
        return (
            <div className={"count-down-display " + this.props.display} />
        )
    };
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        displayClass: 'count-display-green',
        countDown: false,
        warningTimerId: null,
        endTimerId: null,
        timerSeconds: null,
        remainingSeconds: null,
        clockIntervalId: null
    };
  }

  _display_warning = () => {
      this.setState({displayClass: 'count-display-gold'});
  };

  _display_end = () => {
      this.setState({displayClass: 'count-display-purple'});
  };

  handleMinuteInput = (e) => {
        this.setState({timerSeconds: parseFloat(e.target.value) * 60})
    };

  handleStart = () => {
      // TODO: Handle when in warning state after clicking pause what will the timer be if negative etc...
      // maybe look at the display to see if it is gold then use that to set the timer.
      if (this.state.timerSeconds > 0 && !this.state.endTimerId ){
          // Set at beginning so timer runs
          this.setState({
              countDown: true
          });

          const warningTimerId = setTimeout(this._display_warning, this.state.timerSeconds * 1000* .8);
          const endTimerId = setTimeout(this._display_end, this.state.timerSeconds * 1000);
          const intervalId = setInterval(this.timer, 1000);

          this.setState({
              displayClass: 'count-display-green',
              warningTimerId: warningTimerId,
              endTimerId: endTimerId,
              clockIntervalId: intervalId,
          })
      }
  };

  handleStop = (clearTimer=true) => {
      if (this.state.countDown) {
          clearTimeout(this.state.warningTimerId);
          clearTimeout(this.state.endTimerId);

          if(clearTimer){
              console.log("Clear interval");
              clearInterval(this.state.clockIntervalId);
          }

          this.setState({
              warningTimerId: null,
              endTimerId: null,
              clockIntervalId: clearTimer ? null : this.state.clockIntervalId,
              countDown: clearTimer ? false : this.state.countDown,
              remainingSeconds: clearTimer ? null : this.state.remainingSeconds,
              displayClass: clearTimer ? 'count-display-green' : this.state.displayClass,
          });
      }
  };

  timer = () => {
      if (this.state.countDown) {
          this.setState({
              remainingSeconds: this.state.remainingSeconds ? this.state.remainingSeconds - 1 : this.state.timerSeconds
          });
      }
  };

    render() {
    return (
        <div className="app">
          <CountDownDisplay
            display={this.state.displayClass}
          />
          <CountDownClock
            display={this.state.remainingSeconds}
          />
          <CountDownControl
            inputMinute={this.handleMinuteInput}
            clickStart={this.handleStart}
            clickStop={this.handleStop}
          />
        </div>
    )
  }
}


export default App;
