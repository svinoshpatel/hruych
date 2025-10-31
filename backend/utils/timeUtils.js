export function getRelativeTime(date) {
	const now = new Date();
	const endTime = new Date(date);

	const diffInSeconds = Math.floor((endTime - now) / 1000);
	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

	if (Math.abs(diffInSeconds) < 60) {
		return rtf.format(diffInSeconds, 'second');
	};
	
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (Math.abs(diffInMinutes) < 60) {
		return rtf.format(diffInMinutes, 'minute');
	};

	const diffInHours = Math.floor(diffInMinutes / 60);
	if (Math.abs(diffInHours) < 24) {
		return rtf.format(diffInHours, 'hour');
	};

	const diffInDays = Math.floor(diffInHours / 24);
		return rtf.format(diffInDays, 'day');
};

export function calculateRemainingDuration(endTime) {
	const diff = Date.parse(endTime) - Date.now();
	let seconds = Math.floor(diff / 1000);

	return seconds;
};

