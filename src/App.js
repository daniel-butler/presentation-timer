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
        remainingSeconds: null
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
      if (this.state.timerSeconds > 0 ){
        const warningTimerId = setTimeout(this._display_warning, this.state.timerSeconds * 1000* .8);
        const endTimerId = setTimeout(this._display_end, this.state.timerSeconds * 1000);

        this.setState({
            displayClass: 'count-display-green',
            countDown: true,
            warningTimerId: warningTimerId,
            endTimerId: endTimerId,
        })
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
            clickStart={this.handleStart}
            inputMinute={this.handleMinuteInput}
          />
        </div>
    )
  }
}


export default App;
