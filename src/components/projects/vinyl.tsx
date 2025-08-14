import { motion } from "framer-motion";

const Vinyl = () => {
	return (
		<div className="absolute inset-0 z-0 grid place-items-center bg-gradient-to-br from-pink-900 via-orange-900 to-red-900">
			<div className="relative w-24 h-24 overflow-hidden rounded-full shadow-2xl bg-zinc-950 ">
				<div className="grid w-full h-full border-2 rounded-full border-zinc-800 place-items-center">
					<div className="absolute border rounded-full inset-1 border-zinc-600/30 opacity-30" />
					<div className="absolute border rounded-full inset-2 border-zinc-600/30 opacity-30" />
					<div className="absolute border rounded-full inset-3 border-zinc-600/30 opacity-30" />
					<div className="absolute border rounded-full inset-4 border-zinc-600/30 opacity-30" />
					<div className="absolute border rounded-full inset-5 border-zinc-600/30 opacity-30" />
					<div className="absolute border rounded-full inset-6 border-zinc-600/30 opacity-30" />
					<div className="absolute border rounded-full inset-7 border-zinc-600/30 opacity-30" />
					<div className="absolute border rounded-full inset-8 border-zinc-600/30 opacity-30" />

					<img
						src="/flwogb.jpeg"
						alt="Album Art"
						className="relative z-10 object-cover w-6 h-6 rounded-full outline outline-zinc-800 animate-spin-slow"
					/>
				</div>
				<div className="absolute z-20 w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full bg-zinc-950 top-1/2 left-1/2 border-zinc-800" />
				<div className="absolute w-9 h-[1px] -translate-y-1/2 left-0.5 bg-white/5 top-1/2" />
			</div>
			<motion.div
				animate={{
					transform: [
						"translateY(-50%) translateX(-44px)",
						"translateY(-50%) translateX(-14px)",
					],
				}}
				transition={{
					duration: 94,
					ease: "linear",
					repeat: Infinity,
					repeatType: "reverse",
				}}
				className="absolute z-10 w-4 h-4 rounded shadow-lg bg-gradient-to-br from-zinc-300 to-zinc-500 top-1/2"
			/>
		</div>
	);
};

export default Vinyl;
