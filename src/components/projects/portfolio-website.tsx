import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const MacOSDock = () => {
	const [mouseX, setMouseX] = useState(0);
	const controls = useAnimation();
	const width = 176;

	const animationSpeed = 1.5;

	useEffect(() => {
		const animate = async () => {
			await controls.start({
				x: [16, width - 16, 16],
				transition: { duration: 4, ease: "easeInOut", repeat: Infinity },
			});
		};
		animate();
	}, [controls]);

	useEffect(() => {
		const id = setInterval(() => {
			const t = Date.now() * 0.001 * animationSpeed;
			setMouseX((Math.sin(t) + 1) * 0.5 * (width - 32) + 16);
		}, 30);
		return () => clearInterval(id);
	}, []);

	const getSize = (i: number) => {
		const iconPos = 16 + i * 24;
		const dist = Math.abs(mouseX - iconPos);
		const maxDistance = 60;
		const baseSize = 16;

		if (dist < maxDistance) {
			const influence = Math.cos(((dist / maxDistance) * Math.PI) / 2);
			return baseSize + influence * 16;
		}
		return baseSize;
	};

	return (
		<div
			className="absolute inset-0 z-0 grid px-4 place-items-center"
			style={{
				backgroundImage: "url('/mac.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="relative inline-flex items-end h-[34px] gap-2 p-2 mb-6 origin-bottom border border-white/20 rounded-xl bg-white/20 backdrop-blur">
				{[0, 1, 2, 3].map((i) => (
					<motion.div
						key={i}
						className="flex-shrink-0 rounded-lg shadow-sm bg-gradient-to-br from-orange-200 to-orange-400"
						animate={{
							width: getSize(i),
							height: getSize(i),
						}}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
					/>
				))}
			</div>
		</div>
	);
};

const PortfolioWebsite = () => {
	return (
		<div className="absolute inset-0 z-0 grid place-items-center">
			<MacOSDock />
		</div>
	);
};

export default PortfolioWebsite;
