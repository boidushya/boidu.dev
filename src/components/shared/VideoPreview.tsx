import { useState } from "react";

export const VideoPreview = ({ src }: { src: string }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div className="relative w-full h-full overflow-hidden">
			<video
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				onLoadedData={() => setIsLoaded(true)}
				className={`w-full h-full object-cover transition-opacity duration-500 ${
					isLoaded ? "opacity-100" : "opacity-0"
				}`}
			>
				<source src={src} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	);
};
