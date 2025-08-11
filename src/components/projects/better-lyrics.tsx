import React from "react";
import { buildClassName } from "@/utils/functions";

const LYRICS = [
	"YouTube Music got me vibin' but the lyrics are trash",
	"Looking like 2016, man they really need a dash",
	"Of something better, something cleaner, something that can flow",
	"So I coded up a fix and now I'm ready for the show",
	"",
	"Better Lyrics in the building, time-synced to perfection",
	"No API keys needed, just pure code connection",
	"Click a line and jump right there, seek like you're a pro",
	"Multi-language support got that global overflow",
	"",
	"Better! Better! Making lyrics shine",
	"Better! Better! Every single line",
	"Chrome, Firefox, Edge - we got 'em all aligned",
	"Open source and lightweight, blowing Google's mind!",
	"",
	"Real-time translations when you need to understand",
	"Full-screen mode activated with cursor that disbands",
	"Blurred album backgrounds got that aesthetic feel",
	"Auto-switch to lyrics tab, keeping everything real",
	"",
	"Started as an Arc Boost for a problem so niche",
	"Now it's got more features than you ever could wish",
	"Logs and customization, make it work your way",
	"While Google stays sleeping, we're improving every day",
	"",
	"Better! Better! Making lyrics shine",
	"Better! Better! Every single line",
	"Lightweight installation, everything by design",
	"Better Lyrics taking over, leave the old behind!",
	"",
	"From UserScript to extension, now we're on the map",
	"YouTube Music's getting schooled by this lyrical rap",
	"Download it, try it, you'll never go back",
	"Better Lyrics revolution - that's a verified fact!",
];

const BetterLyrics = () => {
	const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
	const [currentWordIndex, setCurrentWordIndex] = React.useState(0);

	React.useEffect(() => {
		let lineInterval: number;
		let wordInterval: number;

		const startLineSequence = () => {
			const words = LYRICS[currentLineIndex].split(" ");
			const lineIntervalDuration = words.length * 400;

			lineInterval = window.setInterval(() => {
				setCurrentLineIndex((prev) => {
					const nextLine = (prev + 1) % LYRICS.length;
					setCurrentWordIndex(0);
					return nextLine;
				});
			}, lineIntervalDuration);
		};

		const startWordSequence = () => {
			const words = LYRICS[currentLineIndex].split(" ");

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
	}, [currentLineIndex]);

	const lineRefs = React.useRef<(HTMLDivElement | null)[]>([]);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const canvasRef = React.useRef<HTMLCanvasElement>(null);

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

		const animate = () => {
			time += 0.015; // Faster animation
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Create multiple dynamic gradients
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;

			// First gradient - main purple/pink
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

			// Second gradient - complementary color
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

			// Apply blend mode for more interesting mixing
			ctx.globalCompositeOperation = "overlay";

			ctx.fillStyle = gradient1;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = gradient2;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.globalCompositeOperation = "source-over";

			requestAnimationFrame(animate);
		};

		resizeCanvas();
		animate();

		const handleResize = () => resizeCanvas();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const renderLine = (line: string, lineIndex: number) => {
		const isCurrentLine = lineIndex === currentLineIndex;
		const isPastLine = lineIndex < currentLineIndex;

		if (!line) {
			return (
				<div
					key={lineIndex}
					className="h-4"
					ref={(el) => (lineRefs.current[lineIndex] = el)}
				/>
			);
		}

		const words = line.split(" ");

		return (
			<div
				key={lineIndex}
				ref={(el) => (lineRefs.current[lineIndex] = el)}
				className={buildClassName([
					"my-4 text-xl font-bold transition-all duration-500 delay-200 leading-relaxed",
					isPastLine ? "opacity-10 text-white" : "text-white/30",
				])}
			>
				{words.map((word, wordIndex) => {
					const isHighlighted =
						(isCurrentLine && wordIndex < currentWordIndex) ||
						(isPastLine && wordIndex < words.length);
					const isCurrentWord = isCurrentLine && wordIndex === currentWordIndex;

					return (
						<span
							key={`${lineIndex}-${wordIndex}`}
							className={buildClassName([
								"inline-block mr-1 relative",
								isHighlighted ? "text-white" : "",
							])}
						>
							{isCurrentWord && isCurrentLine && (
								<span
									className="absolute inset-0 text-white animate-reveal-color"
									style={{
										clipPath: "inset(0 100% 0 0)",
									}}
								>
									{word}
								</span>
							)}
							<span>{word}</span>
						</span>
					);
				})}
			</div>
		);
	};

	return (
		<div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 to-pink-950/30 ">
			<canvas
				ref={canvasRef}
				className="absolute inset-0 w-full h-full "
				style={{ zIndex: 0 }}
			/>
			<div className="relative z-10 h-full p-4 overflow-hidden">
				<div ref={containerRef}>
					{LYRICS.map((line, lineIndex) => renderLine(line, lineIndex))}
				</div>
			</div>
		</div>
	);
};

export default BetterLyrics;
