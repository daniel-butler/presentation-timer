import React from 'react';
import './App.css';

class CountDownClock extends React.Component {
    displayCountDown = (warning=false) => {
        if(this.props.display !== null) {
            let minutes = 0;
            if(this.props.display < -0.1) {  //display negatives correctly. Floor will make -0.1 = -1
                minutes = Math.floor(this.props.display  / 60) + 1;
            } else {
                minutes = Math.floor(this.props.display  / 60);

            }
            let seconds = Math.floor(this.props.display % 60);
            return minutes + 'm ' + seconds + 's';
        } else{
            return 'Enter Time Below';
        }
    };

    render() {
        return (
            <div className="count-down-clock-wrapper">
              <h1 className="count-down-clock">
                {this.displayCountDown()}
              </h1>
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
                        onClick={this.props.clickPause}
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
        paused: false,
        timerSeconds: null,
        remainingSeconds: null,
        warningSeconds: null,
        clockIntervalId: null
    };
  }

  handleMinuteInput = (e) => {
        this.setState({timerSeconds: parseFloat(e.target.value) * 60})
    };

  handleStart = () => {
      if (this.state.timerSeconds > 0 && !this.state.clockIntervalId ){
          // Set at beginning so timer runs
          this.setState({
              countDown: true,
              paused: false,
              warningSeconds: Math.floor(this.state.timerSeconds * 0.20)
          });

          // create timer
          const intervalId = setInterval(this.timer, 1000);

          this.setState({
              displayClass: 'count-display-green',
              clockIntervalId: intervalId,
          })
      } else if (this.state.paused) {
          this.setState({
              paused: false,
              countDown: true
          });
      }
  };

  handleStop = () => {
      if (this.state.countDown) {
          clearInterval(this.state.clockIntervalId);
          this.setState({
              countDown: false,
              paused: false,
              clockIntervalId: null,
              remainingSeconds: null,
              displayClass: 'count-display-green'
          });
      }
  };

  handlePause = () => {
      this.setState({
          paused: true
      });
  };

  timer = () => {
      // Handles the remaining time
      if (this.state.countDown && !this.state.paused) {
          let remainingSeconds = 0;
          if (this.state.remainingSeconds > -1000 && this.state.remainingSeconds !== null){
              remainingSeconds = this.state.remainingSeconds - 1;
          } else {
              remainingSeconds = this.state.timerSeconds;
          }

          let displayColor = '';
          if(remainingSeconds > this.state.warningSeconds){
              displayColor = 'count-display-green';
          } else if (remainingSeconds > 0 && remainingSeconds <= this.state.warningSeconds){
              displayColor = 'count-display-gold';
          } else {
              displayColor = 'count-display-purple';
          }

          this.setState({
              remainingSeconds: remainingSeconds,
              displayClass: displayColor
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
            timer={this.state.remainingSeconds}
            clickStart={this.handleStart}
            clickStop={this.handleStop}
            clickPause={this.handlePause}
          />
        </div>
    )
  }
}


export default App;
