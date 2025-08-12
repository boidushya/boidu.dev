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

export const hslToHex = (h: number, s: number, l: number): string => {
	const hNorm = h / 360;
	const sNorm = s / 100;
	const lNorm = l / 100;

	const hue2rgb = (p: number, q: number, t: number): number => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1/6) return p + (q - p) * 6 * t;
		if (t < 1/2) return q;
		if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
		return p;
	};

	let r: number, g: number, b: number;

	if (sNorm === 0) {
		r = g = b = lNorm;
	} else {
		const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
		const p = 2 * lNorm - q;
		r = hue2rgb(p, q, hNorm + 1/3);
		g = hue2rgb(p, q, hNorm);
		b = hue2rgb(p, q, hNorm - 1/3);
	}

	const toHex = (c: number): string => {
		const hex = Math.round(c * 255).toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	};

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
