import type HlsClass from "hls.js";
import { useEffect, useRef, useState } from "react";

interface MotionArtProps {
	hlsSrc: string | null;
	mp4Src: string | null;
	poster?: string;
	className?: string;
	alt?: string;
}

const NATIVE_HLS = "application/vnd.apple.mpegurl";

const MotionArt = ({
	hlsSrc,
	mp4Src,
	poster,
	className,
	alt,
}: MotionArtProps) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.setAttribute("webkit-playsinline", "true");
		const start = () => {
			video.play().catch(() => undefined);
		};

		if (!hlsSrc) {
			if (mp4Src) {
				video.src = mp4Src;
				start();
			}
			return;
		}

		// Prefer hls.js (MSE) over native HLS: Chromium reports a false-positive
		// canPlayType for m3u8 but cannot actually play it, so native is only for
		// real iOS Safari (no MSE).
		let hls: HlsClass | null = null;
		let cancelled = false;
		import("hls.js").then(({ default: Hls }) => {
			if (cancelled || !videoRef.current) return;
			if (Hls.isSupported()) {
				hls = new Hls({
					capLevelToPlayerSize: true,
					startLevel: 0,
					maxBufferLength: 10,
				});
				hls.loadSource(hlsSrc);
				hls.attachMedia(video);
				hls.on(Hls.Events.MANIFEST_PARSED, start);
			} else if (video.canPlayType(NATIVE_HLS)) {
				video.src = hlsSrc;
				start();
			} else if (mp4Src) {
				video.src = mp4Src;
				start();
			}
		});
		return () => {
			cancelled = true;
			hls?.destroy();
		};
	}, [hlsSrc, mp4Src]);

	return (
		<div className={className}>
			{poster && (
				<img src={poster} alt={alt} className="motion-poster" loading="lazy" />
			)}
			<video
				ref={videoRef}
				className="motion-video"
				style={{ opacity: playing ? 1 : 0 }}
				onPlaying={() => setPlaying(true)}
				muted
				loop
				autoPlay
				playsInline
			/>
		</div>
	);
};

export default MotionArt;
