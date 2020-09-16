import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function App() {
	const startTime = 10000; // this is the startTime in milliseconds
	const [timeLeft, setTimeLeft] = useState(startTime);

	useEffect(() => {
		//HINT - you'll have to do something in here to decrease the timeLeft
		//setTimeout function will help!
	});

	const getMinutes = () => {
    // Since the timeLeft is in milliseconds, we want to format this to minutes
    return "00"
	};

	const getSeconds = () => {
    // Since the timeLeft is in milliseconds, we want to format this to seconds. Returns a string
    return "00"
	};

	return (
		<div className='app'>
			<div className='clock-section'>
				<div className='clock-container'>
					<CircularProgressbar //see the library here: https://www.npmjs.com/package/react-circular-progressbar
						maxValue={startTime}
						value={startTime - timeLeft}
						text={`${getMinutes()}:${getSeconds()}`} //here we call the getMinutes() and getSeconds() to get our displayable strings
					/>
				</div>
				<div className='button-section'>
					{false ? ( //HINT replace "false" with some value to indicate that the timer was started or not
						<>
							<button>Reset</button>
							<button>Pause</button>
						</>
					) : (
						<button>Start</button> //this button starts the timer, by changing the "isStarted" state variable
					)}
				</div>
			</div>
		</div>
	);
}
