const Vinyl = () => {
	return (
		<div className="absolute inset-0 z-0 grid place-items-center bg-gradient-to-br from-red-900 via-pink-900 to-orange-900">
			<div className="relative w-24 h-24 overflow-hidden rounded-full shadow-2xl bg-zinc-950 animate-spin-slow">
				<div className="grid w-full h-full border-2 rounded-full border-zinc-800 place-items-center">
					{/* Vinyl grooves */}
					<div className="absolute border rounded-full inset-1 border-zinc-600/30 opacity-30"></div>
					<div className="absolute border rounded-full inset-2 border-zinc-600/30 opacity-30"></div>
					<div className="absolute border rounded-full inset-3 border-zinc-600/30 opacity-30"></div>
					<div className="absolute border rounded-full inset-4 border-zinc-600/30 opacity-30"></div>
					<div className="absolute border rounded-full inset-5 border-zinc-600/30 opacity-30"></div>
					<div className="absolute border rounded-full inset-6 border-zinc-600/30 opacity-30"></div>
					<div className="absolute border rounded-full inset-7 border-zinc-600/30 opacity-30"></div>
					<div className="absolute border rounded-full inset-8 border-zinc-600/30 opacity-30"></div>

					<img
						src="/flwogb.jpeg"
						alt="Album Art"
						className="relative z-10 object-cover w-6 h-6 rounded-full outline outline-zinc-800"
					/>
				</div>
				<div className="absolute z-20 w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 border rounded-full bg-zinc-900 top-1/2 left-1/2 border-zinc-800"></div>
			</div>
		</div>
	);
};

export default Vinyl;
