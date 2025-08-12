import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useResizeObserver } from "@/utils/hooks";

type StateItem = {
	text: string;
	icon: ReactNode;
	id: string;
};

const states: StateItem[] = [
	{
		text: "Connect",
		icon: (
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M12 5v14M5 12h14" />
			</svg>
		),
		id: "connect",
	},
	{
		text: "Connecting...",
		icon: (
			<motion.svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
			>
				<circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
				<path d="M12 2a10 10 0 0 1 10 10" />
			</motion.svg>
		),
		id: "connecting",
	},
	{
		text: "Connected",
		icon: (
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="20 6 9 17 4 12" />
			</svg>
		),
		id: "connected",
	},
];

const EIP6963 = () => {
	const [index, setIndex] = useState(0);
	const [width, setWidth] = useState<number | "auto">("auto");

	const resizeRef = useResizeObserver(
		useCallback((_: HTMLDivElement, entry: ResizeObserverEntry) => {
			setWidth(entry.contentRect.width + 22);
		}, []),
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % states.length);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="absolute inset-0 z-0 grid place-items-center eip-bg">
			<motion.button
				className="relative flex items-center gap-2 p-2 mb-8 overflow-hidden text-xs font-semibold text-white bg-indigo-600 rounded-xl"
				animate={{ width }}
				transition={{ type: "spring", stiffness: 200, damping: 20 }}
				style={{ width }}
			>
				<div
					ref={resizeRef as React.RefObject<HTMLDivElement>}
					className="absolute flex items-center gap-1.5 opacity-0 pointer-events-none"
				>
					{states[index].icon}
					<span>{states[index].text}</span>
				</div>

				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={states[index].id}
						className="flex items-center gap-1.5"
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.25 }}
					>
						<motion.div
							key={`${states[index].id}-icon`}
							initial={{ scale: 0.85, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.85, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							{states[index].icon}
						</motion.div>
						<motion.span
							key={`${states[index].id}-text`}
							initial={{ opacity: 0, x: 4 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -4 }}
							transition={{ duration: 0.2 }}
						>
							{states[index].text}
						</motion.span>
					</motion.div>
				</AnimatePresence>
			</motion.button>
		</div>
	);
};

export default EIP6963;
