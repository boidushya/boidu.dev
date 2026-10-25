import { useEffect, useRef } from "react";
import { VideoPreview } from "@/components/shared";
import { SHOWREEL, showreelTime } from "@/utils/showreel";

const DRIFT_TOLERANCE_S = 0.05;

const Composer = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		let raf = 0;
		const sync = (now: number) => {
			const video = videoRef.current;
			if (video && !video.paused) {
				const target = showreelTime(now) - SHOWREEL.startS;
				const drift = Math.abs(video.currentTime - target);
				const isWrapping = drift > SHOWREEL.durationS - DRIFT_TOLERANCE_S;
				if (drift > DRIFT_TOLERANCE_S && !isWrapping) {
					video.currentTime = target;
				}
			}
			raf = requestAnimationFrame(sync);
		};
		raf = requestAnimationFrame(sync);
		return () => cancelAnimationFrame(raf);
	}, []);

	return <VideoPreview ref={videoRef} src="/composer.mp4" />;
};

export default Composer;
