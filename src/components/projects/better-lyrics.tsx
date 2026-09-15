import { createLyricsRenderer } from "@braccato/core";
import "@braccato/core/styles/variables.css";
import "@braccato/core/styles/lyrics.css";
import "@braccato/core/styles/instrumental.css";
import { parseTTMLContent } from "@braccato/parsers";
import { useEffect, useMemo, useRef } from "react";
import ttml from "@/assets/lyrics/feels-like-we-only-go-backwards.ttml?raw";
import KawarpBackground from "@/components/shared/KawarpBackground";
import { lonerismArt } from "@/utils/music";
import braccatoTheme from "./braccato-theme.css?raw";
import "./better-lyrics.css";

const ART_URL = lonerismArt(256);

const LOOP_TAIL_S = 2;

const BetterLyrics = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const { lyrics, durationS } = useMemo(() => {
		const parsed = parseTTMLContent(ttml);
		const end = parsed.lyrics.reduce(
			(max, l) => Math.max(max, l.startTimeMs + l.durationMs),
			0,
		);
		return { lyrics: parsed.lyrics, durationS: end / 1000 + LOOP_TAIL_S };
	}, []);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		const renderer = createLyricsRenderer({ document, window, mount });
		renderer.setTheme(braccatoTheme);
		renderer.setLyrics(lyrics);

		let raf = 0;
		let start = performance.now();
		const loop = (now: number) => {
			const t = (now - start) / 1000;
			if (t >= durationS) {
				start = now;
				renderer.tick(0, { isPlaying: true, smoothScroll: false });
			} else {
				renderer.tick(t, { isPlaying: true });
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			renderer.destroy();
		};
	}, [lyrics, durationS]);

	return (
		<div className="absolute inset-0 z-0">
			<KawarpBackground src={ART_URL} className="absolute inset-0" />
			<div className="absolute inset-0 bg-black/30" />
			<div className="absolute inset-0 z-10 overflow-hidden">
				<div ref={mountRef} className="bl-lyrics-mount h-full px-4" />
			</div>
		</div>
	);
};

export default BetterLyrics;
