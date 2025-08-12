import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti-boom";
import { convertHSLValuesToString, hslToHex } from "@/utils/functions";
import { useColorAnimation } from "@/utils/hooks";

const Rang = () => {
	const {
		currentColor,
		targetColor,
		isConfettiVisible,
		hexValue,
		backgroundOffset,
	} = useColorAnimation();

	return (
		<div
			className="absolute inset-0 z-0 transition-colors duration-500 rang-bg"
			style={{
				backgroundColor: convertHSLValuesToString(
					backgroundOffset.h,
					backgroundOffset.s,
					backgroundOffset.l,
				),
			}}
		>
			<div className="relative z-10 h-full p-4 overflow-hidden">
				<div
					className="absolute w-40 h-40 transition-colors duration-500 -translate-x-1/2 -translate-y-1/2 border-4 top-1/2 left-1/2"
					style={{
						backgroundColor: convertHSLValuesToString(
							targetColor.h,
							targetColor.s,
							targetColor.l,
						),
						borderColor: convertHSLValuesToString(
							targetColor.h,
							targetColor.s,
							30,
						),
					}}
				>
					<div
						className="absolute bottom-0 right-0 w-20 h-20 transition-colors duration-500"
						style={{
							backgroundColor: convertHSLValuesToString(
								currentColor.h,
								currentColor.s,
								currentColor.l,
							),
						}}
					>
						<AnimatePresence mode="wait">
							<motion.span
								key={hexValue}
								variants={{
									initial: {
										opacity: 0,
										transform: "translate(0%, -50%)",
									},
									animate: {
										opacity: 1,
										transform: "translate(-50%, -50%)",
									},
									exit: {
										opacity: 0,
										transform: "translate(0%, -50%)",
									},
								}}
								initial="initial"
								animate="animate"
								exit="exit"
								className="absolute font-mono text-xs font-semibold tracking-tighter transition-colors duration-500 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
								style={{
									color: convertHSLValuesToString(
										currentColor.h,
										currentColor.s,
										targetColor.l > 50 ? 25 : 75,
									),
								}}
							>
								{hexValue}
							</motion.span>
						</AnimatePresence>
					</div>
				</div>
			</div>
			{isConfettiVisible && (
				<Confetti
					className="z-10"
					particleCount={100}
					shapeSize={24}
					spreadDeg={60}
					launchSpeed={2}
					colors={[
						hslToHex(targetColor.h, targetColor.s, 30),
						hslToHex(targetColor.h, targetColor.s, 50),
						hslToHex(targetColor.h, targetColor.s, 70),
					]}
				/>
			)}
		</div>
	);
};

export default Rang;
