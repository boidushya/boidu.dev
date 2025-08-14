import { useRef, useState } from "react";

const WalletConnectDocs = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handleLoadedData = () => {
		setIsLoaded(true);
	};

	return (
		<div className="relative w-full h-full overflow-hidden">
			<video
				ref={videoRef}
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				onLoadedData={handleLoadedData}
				className={`w-full h-full object-cover transition-opacity duration-500 ${
					isLoaded ? "opacity-100" : "opacity-0"
				}`}
			>
				<source src="/wctd.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	);
};

export default WalletConnectDocs;
