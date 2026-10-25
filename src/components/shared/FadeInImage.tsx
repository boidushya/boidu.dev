import { type ImgHTMLAttributes, useState } from "react";

export const FadeInImage = ({
	alt,
	style,
	...props
}: ImgHTMLAttributes<HTMLImageElement>) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<img
			{...props}
			alt={alt}
			style={{
				...style,
				opacity: loaded ? 1 : 0,
				transition: "opacity 0.5s ease",
			}}
			onLoad={() => setLoaded(true)}
		/>
	);
};
