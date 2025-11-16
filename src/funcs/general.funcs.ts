export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fadeOutPreloader() {
	const preloader = document.getElementById( 'preloader' );

	if ( preloader ) {
		preloader.style.animation = 'fadeOut 2s ease-in-out forwards';

		await delay(2000);

		preloader.style.display = 'none';
	}
}

export function ageToStr(age: number | null): string {
    if ( !age ) return 'лет';
	let txt;
	let count = age % 100;
	if (count >= 5 && count <= 20) {
		txt = 'лет';
	} else {
		count = count % 10;
		if (count == 1) {
			txt = 'год';
		} else if (count >= 2 && count <= 4) {
			txt = 'года';
		} else {
			txt = 'лет';
		}
	};

	return `${age} ${txt}`;
};

export function formatDateToUser(dateStr: string): string {
	const date = new Date(dateStr);

	return date.toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
	});
}

export function formatTime (seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function formatTimeLeft(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	return `${hours.toString().padStart(2, '0')}ч. ${minutes.toString().padStart(2, '0')}м.`;
}

export function formatTimeLeftOther(seconds: number, withSecond: boolean = false): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	return `${hours.toString().padStart(2, '0')}:${minutes
	  .toString()
	  .padStart(2, '0')}${withSecond ? ':' + secs.toString().padStart(2, '0') : ''}`;
}

export function formatTimestamp(createdAt: number): string {
	const date = new Date(createdAt);

	return date.toLocaleString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).replace(',', '');
}

export function formatDate(dateString: Date, withTime = true): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        ...(withTime && {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }),
    };

    const formatted = new Intl.DateTimeFormat('ru-RU', options).format(date);
    return formatted.replace(',', ' ');
};
