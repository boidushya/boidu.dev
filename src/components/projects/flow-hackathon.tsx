import { GameOfLife } from "@/components/shared";

const FlowHackathon = () => {
	return (
		<GameOfLife
			colors={[
				"hsla(154,100%,47%,1)",
				"hsla(0,0%,100%,1)",
				"hsla(154,98%,43%,1)",
			]}
		/>
	);
};

export default FlowHackathon;
