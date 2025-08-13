import { useRef, useState } from "react";

const TomJerry = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleLoadedData = () => {
		setIsLoaded(true);
	};

	return (
		<div className="relative w-full h-full overflow-hidden">
			<video
				ref={videoRef}
				src="/etjfo.mp4"
				autoPlay
				loop
				muted
				playsInline
				preload="metadata"
				onLoadedData={handleLoadedData}
				className={`w-full h-full object-cover transition-opacity duration-500 ${
					isLoaded ? "opacity-100" : "opacity-0"
				}`}
			/>
		</div>
	);
};

export default TomJerry;
