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
		(
			controller: AbortController,
			animationTarget: { h: number; s: number; l: number },
		) => {
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
										if (hideConfettiTimeout)
											timeoutsRef.current.delete(hideConfettiTimeout);
									}, 5000);
									if (hideConfettiTimeout)
										timeoutsRef.current.add(hideConfettiTimeout);
								}
								if (confettiTimeout)
									timeoutsRef.current.delete(confettiTimeout);
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
