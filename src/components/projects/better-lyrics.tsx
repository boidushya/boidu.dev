import { buildClassName } from "@/utils/functions";
import { useLyricsAnimation } from "@/utils/hooks";

const LYRICS = [
	"It feels like I only go backwards, baby",
	"Every part of me says: Go ahead",
	"I got my hopes up again (oh, no), not again",
	"Feels like we only go backwards, darling",
	"",
	"I know that you think you sound silly when you call my name",
	"But I hear it inside my head all day",
	"When I realise I'm just holding on to the hope that maybe",
	"Your feelings don't show",
	"",
	"It feels like I only go backwards, baby",
	"Every part of me says: Go ahead",
	"I got my hopes up again (oh, no), not again",
	"Feels like we only go backwards, darling",
	"",
	"The seed of all this indecision isn't me, oh, no",
	"'Cause I decided long ago",
	"But that's the way it seems to go when trying so hard to get to something real",
	"It feels",
	"",
	"It feels like I only go backwards, darling",
	"Every part of me says: Go ahead",
	"I got my hopes up again (oh, no), not again",
	"Feels like we only go backwards, darling",
	"",
	"It feels like I only go backwards, baby",
	"Every part of me says: Go ahead",
	"I got my hopes up again (oh, no), not again",
	"Feels like we only go backwards, darling",
	"",
	"It feels like I only go backwards, baby",
	"Every part of me says: Go ahead",
	"I got my hopes up again (oh, no), not again",
	"Feels like we only go backwards, darling",
];

const BetterLyrics = () => {
	const {
		currentLineIndex,
		currentWordIndex,
		lineRefs,
		containerRef,
		canvasRef,
	} = useLyricsAnimation(LYRICS);

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
