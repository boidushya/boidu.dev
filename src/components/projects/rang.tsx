import React from "react";
import {
	convertHSLValuesToString,
	getRandomColor,
	manipulateColor,
} from "@/utils/functions";

const Rang = () => {
	const color = getRandomColor();
	const manipulatedColor = manipulateColor(color, { l: 10 });

	return (
		<div
			className="absolute inset-0 rang-bg"
			style={
				{
					backgroundColor: convertHSLValuesToString(
						manipulatedColor.h,
						manipulatedColor.s,
						manipulatedColor.l,
					),
				} as React.CSSProperties
			}
		>
			<div className="relative z-10 h-full p-4 overflow-hidden">
				<div
					className="absolute -translate-x-1/2 -translate-y-1/2 border-4 w-36 h-36 top-1/2 left-1/2"
					style={{
						backgroundColor: convertHSLValuesToString(
							color.h,
							color.s,
							color.l,
						),
						borderColor: convertHSLValuesToString(color.h, color.s, 30),
					}}
				/>
			</div>
		</div>
	);
};

export default Rang;
