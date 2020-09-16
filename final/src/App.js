import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./index.css";

export default function App() {
  // This is the startTime in Milliseconds
  const startTime = 10000;

  // Use this state value to hold how much time is remaining
  const [timeLeft, setTimeLeft] = useState(startTime);

  // This state value holds whether the timer is paused or not
  const [isPaused, setIsPaused] = useState(false);

  // Used to indicated if the timer has been started or not
  const [isStarted, setIsStarted] = useState(false);

  // UseEffect hook runs every time one of our state values change,
  // and handles the countdown
  useEffect(() => {
    // this function gets called by the setTimeout function.
    // Whenever this function is called, we want to decrease the timeleft by 1000 milliseconds (or, 1 second)
    const countdown = () => {
      // we only want to decrease the timeleft if the timer is started AND the timer hasn't been paused
      if (isStarted && !isPaused) {
        setTimeLeft(timeLeft - 1000);
      }
    };

    // This is just the timeout function. every 1000 milliseconds, the countdown function gets called
    // we store the timeout function in a 'timer' variable so we can clear it later.
    const timer = setTimeout(countdown, 1000);

    // if isStarted is false, it means the timer hasn't been started (ie the app has just loaded)
    // or was reset
    // If this is the case, we want to set the time left to the default (startTime) and we want to
    // clear the timer - setTimeout function stays present until the window was refreshed!
    if (isStarted === false) {
      setTimeLeft(startTime);
      return clearTimeout(timer);
    }

    // if timeleft is 0, we want to clear the timer to stop it from running
    if (timeLeft === 0) {
      return clearTimeout(timer);
    }
  }, [isStarted, timeLeft, isPaused]); // <---- when these variables change, the useEffect hook will run!

  // Since the time remaining is in milliseconds, we want to format this to minutes
  const getMinutes = () => {
    let minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    // This just adds a "0" if the number is less than 10 for formatting purposes
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes;
  };

  // Since the time remaining is in milliseconds, we want to format this to seconds. Returns a string
  const getSeconds = () => {
    let seconds = Math.floor((timeLeft / 1000) % 60);
    // This just adds a "0" if the number is less than 10 for formatting purposes
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return seconds;
  };

  // called when the "reset" button is clicked. This resets our state values, causing the
  // logic in the useEffect hook to rerun
  const resetTimer = () => {
    setIsPaused(false);
    setIsStarted(false);
  };

  return (
    <div className="app">
      <div className="clock-section">
        <div className="clock-container">
          <CircularProgressbar //see the library here: https://www.npmjs.com/package/react-circular-progressbar
            maxValue={startTime}
            value={startTime - timeLeft}
            text={`${getMinutes()}:${getSeconds()}`} //here we call the getMinutes() and getSeconds() to get our displayable strings
          />
        </div>
        <div className="button-section">
          {isStarted ? ( //here we just use a ternary to display different buttons/text, depending on the state values
            <>
              <button onClick={resetTimer}>Reset</button>
              <button onClick={() => setIsPaused(!isPaused)}>
                {isPaused ? "Resume" : "Pause"}
              </button>
            </>
          ) : (
            <button onClick={() => setIsStarted(true)}>Start</button> //this button starts the timer, by changing the "isStarted" state variable
          )}
        </div>
      </div>
    </div>
  );
}
