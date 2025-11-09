import type { Variants } from "framer-motion";

// Page transition animations
export const pageTransitionVariants: Variants = {
	initial: {
		opacity: 0.25,
		y: 12,
		filter: "blur(2px)",
	},
	animate: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
	},
	exit: {
		opacity: 0.25,
		y: 12,
		filter: "blur(2px)",
		transition: {
			duration: 0.1,
		},
	},
};

// Stagger container variants
export const staggerContainerVariants: Variants = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

// Fast stagger container for work section
export const fastStaggerContainerVariants: Variants = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.125,
		},
	},
};

// Common item animations - slide up
export const slideUpItemVariants: Variants = {
	initial: {
		opacity: 0,
		filter: "blur(3px)",
		y: 12,
	},
	animate: {
		opacity: 1,
		filter: "blur(0px)",
		y: 0,
	},
};

// Item animations - slide down (for work section)
export const slideDownItemVariants: Variants = {
	initial: {
		opacity: 0,
		filter: "blur(3px)",
		y: -20,
	},
	animate: {
		opacity: 1,
		filter: "blur(0px)",
		y: 0,
	},
};

// Item animations - slide left
export const slideLeftItemVariants: Variants = {
	initial: {
		opacity: 0,
		filter: "blur(3px)",
		x: -20,
	},
	animate: {
		opacity: 1,
		filter: "blur(0px)",
		x: 0,
	},
};

// Item animations - slide right (for music section)
export const slideRightItemVariants: Variants = {
	initial: {
		opacity: 0,
		filter: "blur(3px)",
		x: -12,
	},
	animate: {
		opacity: 1,
		filter: "blur(0px)",
		x: 0,
	},
};

// Hover animations for project items
export const hoverVariants: Variants = {
	initial: {
		opacity: 0,
		filter: "blur(3px)",
		scale: 0.95,
	},
	animate: {
		opacity: 1,
		filter: "blur(0px)",
		scale: 1,
	},
	exit: {
		opacity: 0,
		filter: "blur(5px)",
		scale: 0.95,
		transition: {
			duration: 0.1,
		},
	},
};

// Work item logo glow animation
export const glowVariants: Variants = {
	initial: {
		opacity: 0,
		scale: 0,
	},
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			delay: 0.5,
			duration: 1,
		},
	},
};

// Work item grayscale filter animation config
export const getGrayscaleAnimation = (grayScale: boolean) => ({
	initial: {
		filter: "grayscale(0%)",
	},
	animate: {
		filter: grayScale ? "grayscale(100%)" : "grayscale(0%)",
	},
	transition: {
		delay: 1.25,
		duration: 0.5,
	},
});

export const getOpacityAnimation = (isAnimated: boolean) => ({
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: isAnimated ? 0.6 : 1,
	},
	transition: {
		delay: 1.25,
		duration: 0.5,
	},
});
