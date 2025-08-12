import { useEffect, useState } from "react";

const Rezonance = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTrack, setCurrentTrack] = useState(0);
	const tracks = [
		"Bohemian Rhapsody",
		"Stairway to Heaven",
		"Hotel California",
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setIsPlaying((prev) => !prev);
			if (!isPlaying) {
				setCurrentTrack((prev) => (prev + 1) % tracks.length);
			}
		}, 3000);
		return () => clearInterval(interval);
	}, [isPlaying]);

	return (
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="text-center">
				<div className="mb-4">
					<div className="flex items-center justify-center w-8 h-8 mx-auto mb-3 rounded-full bg-white/20">
						<div
							className={`transition-transform duration-300 ${isPlaying ? "scale-110" : "scale-100"}`}
						>
							{isPlaying ? "⏸" : "▶"}
						</div>
					</div>
					<div className="px-2 mb-1 text-xs truncate text-white/80">
						{tracks[currentTrack]}
					</div>
				</div>
				<div className="flex justify-center gap-1">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className={`w-0.5 bg-white/60 transition-all duration-150 ${
								isPlaying ? `h-${i * 2 + 2} animate-pulse` : "h-2"
							}`}
							style={{
								animationDelay: `${i * 100}ms`,
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Rezonance;
