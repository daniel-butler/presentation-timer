import React from 'react';
import './App.css';
import logo from './logo.png';

class CountDownClock extends React.Component {
    displayCountDown(){
        if(this.props.remainingSeconds !== null) {
            return this.props.formatter(this.props.remainingSeconds);
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
    displayWarningTime(){
        if(this.props.remainingSeconds != null){
            return 'Warning at: ' + this.props.formatter(this.props.warningSeconds);
        } else {
            return '';
        }
    }

    handleEnterKeyUp(event){
        if(event.key === 'Enter'){
            this.props.clickStart();
        }
    }

    render() {
        return (
            <div className="base-control">
                <div className="count-down-input-wrapper">
                    <p>Enter Time in Minutes</p>
                    <input
                        id="timeInMinutes"
                        type="number"
                        className="count-down-input"
                        min=".1"
                        step=".1"
                        onKeyPress={this.props.inputMinute}
                        onKeyUp={this.handleEnterKeyUp.bind(this)}
                    >
                    </input>
                    <p>{this.displayWarningTime()}</p>
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
            <div className={"count-down-display " + this.props.display}>
                {this.props.children}
            </div>
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

    formatSecondsToTimer = (seconds) => {
        let mins = 0;
        if( seconds < -0.1) {  //display negatives correctly. Floor will make -0.1 = -1
            mins = Math.floor(seconds  / 60) + 1;
        } else {
            mins = Math.floor(seconds  / 60);

        }
        let secs = Math.floor(seconds % 60);

        if(mins === 0){
            return secs + 's';
        } else if (secs === 0){
            return mins + 'm';
        } else {
            return mins + 'm ' + secs + 's';
        }
    };

    render() {
        return (
            <div className="app">
                <CountDownDisplay
                    display={this.state.displayClass}
                >
                    <CountDownClock
                        remainingSeconds={this.state.remainingSeconds}
                        formatter={this.formatSecondsToTimer}
                    />
                    <div className="logo-wrapper">
                        <img
                            className="logo"
                            src={logo}
                            alt="The CORE Group"
                        />
                    </div>
                    <CountDownControl
                        inputMinute={this.handleMinuteInput}
                        remainingSeconds={this.state.remainingSeconds}
                        warningSeconds={this.state.warningSeconds}
                        formatter={this.formatSecondsToTimer}
                        clickStart={this.handleStart}
                        clickStop={this.handleStop}
                        clickPause={this.handlePause}
                    />
                </CountDownDisplay>
            </div>
        )
      }
}


export default App;
