import { type HTMLMotionProps, motion, type Variants } from "framer-motion";
import { staggerContainerVariants } from "@/utils/animations";

interface AnimatedContainerProps extends Omit<HTMLMotionProps<"div">, "as"> {
	variants?: Variants;
	staggerDelay?: number;
	as?: keyof JSX.IntrinsicElements;
}

export const AnimatedContainer = ({
	children,
	variants = staggerContainerVariants,
	staggerDelay,
	as = "div",
	...props
}: AnimatedContainerProps) => {
	const containerVariants = staggerDelay
		? {
				...variants,
				animate: {
					transition: {
						staggerChildren: staggerDelay,
					},
				},
			}
		: variants;

	const MotionComponent = motion[
		as as keyof typeof motion
	] as React.ComponentType<any>;

	return (
		<MotionComponent
			variants={containerVariants}
			initial="initial"
			animate="animate"
			{...props}
		>
			{children}
		</MotionComponent>
	);
};
