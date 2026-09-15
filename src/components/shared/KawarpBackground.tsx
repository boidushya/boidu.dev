import { Kawarp, type KawarpOptions } from "@kawarp/core";
import { useEffect, useRef } from "react";

// Tuned in bls-website (from the better-lyrics theme-eblp shader preset).
const KAWARP_OPTIONS: KawarpOptions = {
	warpIntensity: 1,
	blurPasses: 8,
	animationSpeed: 1,
	transitionDuration: 1000,
	saturation: 2,
	dithering: 0.008,
	scale: 1.25,
};

const RESIZE_DEBOUNCE_MS = 120;

interface KawarpBackgroundProps {
	src: string;
	className?: string;
}

const KawarpBackground = ({ src, className }: KawarpBackgroundProps) => {
	const mountRef = useRef<HTMLDivElement>(null);
	const kawarpRef = useRef<Kawarp | null>(null);
	const srcRef = useRef(src);
	const loadedRef = useRef(src);
	srcRef.current = src;

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		// A fresh canvas per mount: reusing one (e.g. under StrictMode's double
		// mount) reuses the stale WebGL context and desyncs the two buffers kawarp
		// crossfades between, which renders garbage.
		const canvas = document.createElement("canvas");
		canvas.style.cssText = "display:block;width:100%;height:100%;";
		mount.appendChild(canvas);

		const applyCanvasSize = () => {
			const { width, height } = canvas.getBoundingClientRect();
			const w = Math.round(width);
			const h = Math.round(height);
			if (!w || !h || (canvas.width === w && canvas.height === h)) return false;
			canvas.width = w;
			canvas.height = h;
			return true;
		};

		applyCanvasSize();
		const kawarp = new Kawarp(canvas, KAWARP_OPTIONS);
		kawarpRef.current = kawarp;
		kawarp.start();
		void kawarp.loadImage(srcRef.current).catch(() => undefined);

		// Every loadImage swaps one of the two crossfade buffers, so only reload
		// when the canvas genuinely changed size.
		let debounce: ReturnType<typeof setTimeout> | undefined;
		const observer = new ResizeObserver(() => {
			clearTimeout(debounce);
			debounce = setTimeout(() => {
				if (!applyCanvasSize()) return;
				kawarp.resize();
				void kawarp.loadImage(srcRef.current).catch(() => undefined);
			}, RESIZE_DEBOUNCE_MS);
		});
		observer.observe(canvas);

		return () => {
			clearTimeout(debounce);
			observer.disconnect();
			kawarp.dispose();
			kawarpRef.current = null;
			canvas.remove();
		};
	}, []);

	useEffect(() => {
		if (loadedRef.current === src) return;
		loadedRef.current = src;
		void kawarpRef.current?.loadImage(src).catch(() => undefined);
	}, [src]);

	return <div ref={mountRef} className={className} />;
};

export default KawarpBackground;
