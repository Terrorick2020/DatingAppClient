export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
	}
	return `${age} ${txt}`;
}

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
