import { useEffect, useRef } from "react";

interface BackgroundEffectsProps {
	colors: string[];
	children?: React.ReactNode;
	className?: string;
	variant?: "perlin";
}

const BackgroundEffects = ({
	colors,
	children,
	className = "",
	variant = "perlin",
}: BackgroundEffectsProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let animationId: number;

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const parseColor = (color: string) => {
			const match = color.match(
				/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%,?\s*([\d.]*)\)/,
			);
			if (!match) return [255, 255, 255, 255];

			const [, h, s, l, a] = match;
			const hue = parseInt(h) / 360;
			const sat = parseInt(s) / 100;
			const light = parseInt(l) / 100;
			const alpha = a ? parseFloat(a) * 255 : 255;

			const hue2rgb = (p: number, q: number, t: number) => {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1 / 6) return p + (q - p) * 6 * t;
				if (t < 1 / 2) return q;
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
				return p;
			};

			let r, g, b;
			if (sat === 0) {
				r = g = b = light;
			} else {
				const q = light < 0.5 ? light * (1 + sat) : light + sat - light * sat;
				const p = 2 * light - q;
				r = hue2rgb(p, q, hue + 1 / 3);
				g = hue2rgb(p, q, hue);
				b = hue2rgb(p, q, hue - 1 / 3);
			}

			return [
				Math.round(r * 255),
				Math.round(g * 255),
				Math.round(b * 255),
				alpha,
			];
		};

		const noise = (x: number, y: number, time: number) => {
			const n1 =
				Math.sin(x * 0.1 + time * 0.001) * Math.cos(y * 0.1 + time * 0.0013);
			const n2 =
				Math.sin(x * 0.05 + time * 0.0007) * Math.cos(y * 0.05 + time * 0.0011);
			const n3 =
				Math.sin(x * 0.02 + time * 0.0005) * Math.cos(y * 0.02 + time * 0.0009);
			return (n1 + n2 * 0.5 + n3 * 0.25) / 1.75;
		};

		const createPerlinGradient = (time: number) => {
			const imageData = ctx.createImageData(canvas.width, canvas.height);
			const data = imageData.data;

			const pixelDensity = 2;

			for (let y = 0; y < canvas.height; y += pixelDensity) {
				for (let x = 0; x < canvas.width; x += pixelDensity) {
					const noiseValue = noise(x, y, time);
					const colorIndex = Math.floor(((noiseValue + 1) / 2) * colors.length);
					const clampedIndex = Math.max(
						0,
						Math.min(colorIndex, colors.length - 1),
					);
					const color = parseColor(colors[clampedIndex]);

					for (let dy = 0; dy < pixelDensity && y + dy < canvas.height; dy++) {
						for (let dx = 0; dx < pixelDensity && x + dx < canvas.width; dx++) {
							const index = ((y + dy) * canvas.width + (x + dx)) * 4;
							data[index] = color[0];
							data[index + 1] = color[1];
							data[index + 2] = color[2];
							data[index + 3] = color[3];
						}
					}
				}
			}

			ctx.putImageData(imageData, 0, 0);
		};

		const animate = (time: number) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			switch (variant) {
				case "perlin":
					createPerlinGradient(time);
					break;
				default:
					createPerlinGradient(time);
			}

			animationId = requestAnimationFrame(animate);
		};

		animate(0);

		return () => {
			window.removeEventListener("resize", resizeCanvas);
			cancelAnimationFrame(animationId);
		};
	}, [colors, variant]);

	return (
		<div className={`absolute inset-0 ${className}`}>
			<canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
			{children && (
				<div className="relative z-10 flex items-center justify-center h-full p-4">
					{children}
				</div>
			)}
		</div>
	);
};

export default BackgroundEffects;
