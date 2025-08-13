import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const sortingAlgorithms = [
	"Amount (High to Low)",
	"Gas Used (Low to High)",
	"Timestamp (Recent)",
	"Hash (Alphabetical)",
];

const ReefExplorer = () => {
	const [currentSort, setCurrentSort] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setIsAnimating(true);
			setTimeout(() => {
				setCurrentSort((prev) => (prev + 1) % sortingAlgorithms.length);
				setIsAnimating(false);
			}, 500);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-xl">
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

			<div className="relative z-10 flex flex-col h-full p-6">
				<div className="mb-6">
					<div className="flex items-center gap-2 mb-3 text-sm text-purple-300/80">
						<span
							className={`text-white/80 transition-opacity duration-500 ${isAnimating ? "opacity-50" : "opacity-100"}`}
						>
							Sorting by:
						</span>
						<AnimatePresence mode="wait" initial={false}>
							<motion.span
								initial={{ opacity: 0, y: 8, scale: 0.975 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -8, scale: 0.975 }}
								key={sortingAlgorithms[currentSort]}
								className="block font-medium text-purple-300"
							>
								{sortingAlgorithms[currentSort]}
							</motion.span>
						</AnimatePresence>
					</div>

					<div className="flex items-center gap-4 text-xs text-white/80">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
							Live
						</div>
						<div className="text-white/20">|</div>
						<div>12 transactions</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReefExplorer;
