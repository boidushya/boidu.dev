import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

const Rezonance = () => {
	const name = "Feels Like We Only Go Backwards";
	const artist = "Tame Impala";
	const trackLength = 94;

	const albumArt = "/flwogb.jpeg";

	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime((prev) => {
				if (prev >= trackLength) {
					return 0;
				}
				return prev + 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const progress = (currentTime / trackLength) * 100;

	const mm = Math.floor(currentTime / 60);
	const ss = Math.floor(currentTime % 60);

	return (
		<div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900 via-orange-900 to-pink-900">
			<div className="relative w-full max-w-sm p-8 mx-4 -top-20">
				<div className="text-center">
					<div className="mb-2">
						<img
							src={albumArt}
							alt={`${name} album art`}
							className="object-cover w-48 h-48 mx-auto rounded-lg shadow-2xl"
						/>
					</div>

					<div className="my-4">
						<h3 className="my-0 text-sm font-semibold text-white truncate">
							{name}
						</h3>
						<p className="mt-0 text-xs text-white/70">{artist}</p>
					</div>

					<div className="mb-6">
						<div className="h-1 mb-2 rounded-full bg-white/20">
							<div
								className="h-1 transition-[width] duration-200 ease-linear bg-white rounded-full"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<div className="flex justify-between text-xs text-white/60">
							<span>
								<NumberFlow value={mm} format={{ minimumIntegerDigits: 2 }} />
								<NumberFlow
									prefix=":"
									value={ss}
									digits={{ 1: { max: 5 } }}
									format={{ minimumIntegerDigits: 2 }}
								/>
							</span>
							<span>{formatTime(trackLength)}</span>
						</div>
					</div>

					<div className="flex items-center justify-center space-x-6">
						<button className="transition-colors text-white/60 hover:text-white">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
							</svg>
						</button>

						<div className="flex items-center justify-center w-12 h-12 text-black bg-white rounded-full shadow-lg">
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
							</svg>
						</div>

						<button className="transition-colors text-white/60 hover:text-white">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rezonance;
