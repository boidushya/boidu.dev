// public/composer.mp4 is rendered from exactly this window of the song.
export const SHOWREEL = { startS: 3.5, durationS: 18.5 } as const;

export const showreelTime = (nowMs: number = performance.now()): number =>
	SHOWREEL.startS + ((nowMs / 1000) % SHOWREEL.durationS);
