import { createLyricsRenderer } from "@braccato/core";
import "@braccato/core/styles/variables.css";
import "@braccato/core/styles/lyrics.css";
import "@braccato/core/styles/instrumental.css";
import { parseTTMLContent } from "@braccato/parsers";
import { useEffect, useMemo, useRef } from "react";
import ttml from "@/assets/lyrics/feels-like-we-only-go-backwards.ttml?raw";
import KawarpBackground from "@/components/shared/KawarpBackground";
import { lonerismArt } from "@/utils/music";
import { showreelTime } from "@/utils/showreel";
import braccatoTheme from "./braccato-theme.css?raw";
import "./better-lyrics.css";

const ART_URL = lonerismArt(256);

const BetterLyrics = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const lyrics = useMemo(() => parseTTMLContent(ttml).lyrics, []);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		const renderer = createLyricsRenderer({ document, window, mount });
		renderer.setTheme(braccatoTheme);
		renderer.setLyrics(lyrics);

		let raf = 0;
		let previous = Number.POSITIVE_INFINITY;
		const loop = (now: number) => {
			const t = showreelTime(now);
			renderer.tick(t, { isPlaying: true, smoothScroll: t >= previous });
			previous = t;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(raf);
			renderer.destroy();
		};
	}, [lyrics]);

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
