export const buildClassName = (classNames: string[]): string => {
	return classNames.filter(Boolean).join(" ");
};

export const getRandomColor = () => {
	const hue = Math.floor(Math.random() * 360);
	const saturation = Math.floor(Math.random() * 50) + 50; // Ensure saturation is not too low (to avoid gray)
	const lightness = Math.floor(Math.random() * 50) + 50; // Ensure lightness is not too low (to avoid black) or too high (to avoid white)
	return {
		h: hue,
		s: saturation,
		l: lightness,
	};
};

export const manipulateColor = (
	color: { h: number; s: number; l: number },
	changeLog: { [key: string]: number },
) => {
	return {
		h: color.h + (changeLog.h || 0),
		s: color.s + (changeLog.s || 0),
		l: color.l + (changeLog.l || 0),
	};
};

export const convertHSLValuesToString = (
	h: number,
	s: number,
	l: number,
	a?: number,
): string => {
	return `hsla(${h}, ${s}%, ${l}%, ${a ?? 1})`;
};
