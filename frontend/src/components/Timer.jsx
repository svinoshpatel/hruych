import { useEffect, useState } from "react";

export default function Timer({ remainingSeconds }) {
	const [totalSeconds, setTotalSeconds] = useState(remainingSeconds);

	useEffect(() => {
		if (totalSeconds <= 0) return;

		const intervalId = setInterval(() => {
			setTotalSeconds(prev => prev > 0 ? prev - 1 : 0);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [totalSeconds]);

	const displaySeconds = totalSeconds % 60;
	const displayMinutes = Math.floor((totalSeconds % 3600) / 60);
	const displayHours = Math.floor(totalSeconds % (24 * 3600) / 3600);
	const displayDays = Math.floor(totalSeconds / (24 * 3600));

	return(
		<div className='text-center text-2xl p-2'>
			{totalSeconds <= 0
				? `Auction ended`
				: displayDays > 0
				? `${displayDays} days and
					${displayHours.toString().padStart(2, '0')} hours`
				: `${displayHours.toString().padStart(2, '0')} :
					${displayMinutes.toString().padStart(2, '0')} :
					${displaySeconds.toString().padStart(2, '0')}`
			}
		</div>
	);
};
