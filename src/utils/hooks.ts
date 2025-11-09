import React, { useLayoutEffect, useRef } from "react";
import { getRandomColor, hslToHex, manipulateColor } from "./functions";

interface ColorAnimationState {
	currentColor: { h: number; s: number; l: number };
	targetColor: { h: number; s: number; l: number };
	isConfettiVisible: boolean;
	hexValue: string;
	backgroundOffset: { h: number; s: number; l: number };
}

export const useColorAnimation = (): ColorAnimationState => {
	const initialColor = React.useMemo(() => getRandomColor(), []);

	const [currentColor, setCurrentColor] = React.useState(initialColor);
	const [targetColor, setTargetColor] = React.useState(getRandomColor());
	const [isConfettiVisible, setIsConfettiVisible] = React.useState(false);

	const hexValue = hslToHex(currentColor.h, currentColor.s, currentColor.l);
	const backgroundOffset = manipulateColor(targetColor, { l: 10 });

	// Store timeout/interval IDs in refs to ensure cleanup
	const timeoutsRef = React.useRef<Set<number>>(new Set());
	const intervalsRef = React.useRef<Set<number>>(new Set());

	const animateColorTransition = React.useCallback(
		(controller: AbortController, animationTarget: { h: number; s: number; l: number }) => {
			const animationSteps = 5;
			let step = 0;
			let confettiTimeout: number | null = null;
			let hideConfettiTimeout: number | null = null;

			const animationInterval = window.setInterval(() => {
				if (controller.signal.aborted) {
					clearInterval(animationInterval);
					if (confettiTimeout) clearTimeout(confettiTimeout);
					if (hideConfettiTimeout) clearTimeout(hideConfettiTimeout);
					return;
				}

				if (step < animationSteps) {
					setCurrentColor((prev) => {
						const colorDelta = {
							h: (animationTarget.h - prev.h) / (animationSteps - step),
							s: (animationTarget.s - prev.s) / (animationSteps - step),
							l: (animationTarget.l - prev.l) / (animationSteps - step),
						};
						const newColor = manipulateColor(prev, colorDelta);

						if (step === animationSteps - 1) {
							confettiTimeout = window.setTimeout(() => {
								if (!controller.signal.aborted) {
									setIsConfettiVisible(true);
									hideConfettiTimeout = window.setTimeout(() => {
										if (!controller.signal.aborted) {
											setIsConfettiVisible(false);
										}
										if (hideConfettiTimeout) timeoutsRef.current.delete(hideConfettiTimeout);
									}, 5000);
									if (hideConfettiTimeout) timeoutsRef.current.add(hideConfettiTimeout);
								}
								if (confettiTimeout) timeoutsRef.current.delete(confettiTimeout);
							}, 600);
							if (confettiTimeout) timeoutsRef.current.add(confettiTimeout);
						}

						return newColor;
					});
					step++;
				} else {
					setCurrentColor(animationTarget);
					clearInterval(animationInterval);
					intervalsRef.current.delete(animationInterval);

					const nextTimeout = window.setTimeout(() => {
						if (!controller.signal.aborted) {
							const newTarget = getRandomColor();
							setTargetColor(newTarget);
							setCurrentColor(getRandomColor());
							animateColorTransition(controller, newTarget);
						}
						timeoutsRef.current.delete(nextTimeout);
					}, 5000);
					timeoutsRef.current.add(nextTimeout);
				}
			}, 1000);

			intervalsRef.current.add(animationInterval);

			controller.signal.addEventListener("abort", () => {
				clearInterval(animationInterval);
				intervalsRef.current.delete(animationInterval);
				if (confettiTimeout) {
					clearTimeout(confettiTimeout);
					timeoutsRef.current.delete(confettiTimeout);
				}
				if (hideConfettiTimeout) {
					clearTimeout(hideConfettiTimeout);
					timeoutsRef.current.delete(hideConfettiTimeout);
				}
			});
		},
		[],
	);

	React.useEffect(() => {
		const controller = new AbortController();
		animateColorTransition(controller, targetColor);

		return () => {
			controller.abort();
			// Clean up all tracked timeouts and intervals
			for (const timeout of timeoutsRef.current) {
				clearTimeout(timeout);
			}
			for (const interval of intervalsRef.current) {
				clearInterval(interval);
			}
			timeoutsRef.current.clear();
			intervalsRef.current.clear();
			setCurrentColor(initialColor);
		};
	}, [animateColorTransition, initialColor, targetColor]);

	return {
		currentColor,
		targetColor,
		isConfettiVisible,
		hexValue,
		backgroundOffset,
	};
};

interface LyricsAnimationState {
	currentLineIndex: number;
	currentWordIndex: number;
	containerRef: React.RefObject<HTMLDivElement>;
	lineRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
	canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const useLyricsAnimation = (lyrics: string[]): LyricsAnimationState => {
	const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
	const [currentWordIndex, setCurrentWordIndex] = React.useState(0);

	const lineRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const canvasRef = React.useRef<HTMLCanvasElement>(null);

	React.useEffect(() => {
		let lineInterval: number;
		let wordInterval: number;

		const startLineSequence = () => {
			const words = lyrics[currentLineIndex].split(" ");
			const lineIntervalDuration = words.length * 400;

			lineInterval = window.setInterval(() => {
				setCurrentLineIndex((prev) => {
					const nextLine = (prev + 1) % lyrics.length;
					setCurrentWordIndex(0);
					return nextLine;
				});
			}, lineIntervalDuration);
		};

		const startWordSequence = () => {
			const words = lyrics[currentLineIndex].split(" ");

			wordInterval = window.setInterval(() => {
				setCurrentWordIndex((prev) => (prev < words.length - 1 ? prev + 1 : 0));
			}, 400);
		};

		startLineSequence();
		startWordSequence();

		return () => {
			clearInterval(lineInterval);
			clearInterval(wordInterval);
		};
	}, [currentLineIndex, lyrics]);

	React.useEffect(() => {
		if (lineRefs.current[currentLineIndex] && containerRef.current) {
			const currentLineElement = lineRefs.current[currentLineIndex];
			const containerElement = containerRef.current;
			const parentElement = containerElement.parentElement;

			if (currentLineElement && parentElement) {
				const lineTop = currentLineElement.offsetTop;
				const parentHeight = parentElement.clientHeight;
				const lineHeight = currentLineElement.offsetHeight;

				const offset = 72;

				const targetTranslate =
					lineTop - parentHeight / 2 + lineHeight / 2 + offset;

				containerElement.style.transform = `translateY(-${Math.max(0, targetTranslate)}px)`;
				containerElement.style.transition =
					"transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)";
			}
		}
	}, [currentLineIndex]);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		};

		let time = 0;
		let animationFrameId: number;

		const animate = () => {
			time += 0.015;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			const gradient1 = ctx.createRadialGradient(
				centerX + Math.sin(time) * 150,
				centerY + Math.cos(time * 0.8) * 120,
				0,
				centerX + Math.sin(time) * 150,
				centerY + Math.cos(time * 0.8) * 120,
				Math.max(canvas.width, canvas.height) * 0.9,
			);

			const hue1 = 280 + Math.sin(time * 0.5) * 40;
			gradient1.addColorStop(0, `hsla(${hue1}, 70%, 45%, 0.2)`);
			gradient1.addColorStop(0.6, `hsla(${hue1 + 30}, 65%, 50%, 0.1)`);
			gradient1.addColorStop(1, "transparent");

			const gradient2 = ctx.createRadialGradient(
				centerX - Math.cos(time * 1.2) * 100,
				centerY - Math.sin(time * 0.9) * 80,
				0,
				centerX - Math.cos(time * 1.2) * 100,
				centerY - Math.sin(time * 0.9) * 80,
				Math.max(canvas.width, canvas.height) * 0.7,
			);

			const hue2 = 320 + Math.cos(time * 0.7) * 35;
			gradient2.addColorStop(0, `hsla(${hue2}, 75%, 40%, 0.2)`);
			gradient2.addColorStop(0.5, `hsla(${hue2 - 20}, 60%, 45%, 0.1)`);
			gradient2.addColorStop(1, "transparent");

			ctx.globalCompositeOperation = "overlay";

			ctx.fillStyle = gradient1;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = gradient2;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.globalCompositeOperation = "source-over";

			animationFrameId = requestAnimationFrame(animate);
		};

		resizeCanvas();
		animate();

		const handleResize = () => resizeCanvas();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);

	return {
		currentLineIndex,
		currentWordIndex,
		containerRef,
		lineRefs,
		canvasRef,
	};
};

export function useResizeObserver<T extends HTMLElement>(
	callback: (target: T, entry: ResizeObserverEntry) => void,
) {
	const ref = useRef<T>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: The element being observed is the ref itself.
	useLayoutEffect(() => {
		const element = ref.current;

		if (!element) {
			return;
		}

		const observer = new ResizeObserver((entries) => {
			callback(element, entries[0]);
		});

		observer.observe(element);

		// eslint-disable-next-line consistent-return
		return () => {
			observer.disconnect();
		};
	}, [callback, ref]);

	return ref;
}
