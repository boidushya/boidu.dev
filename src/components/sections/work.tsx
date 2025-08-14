import { motion } from "framer-motion";
import { Fragment } from "react";
import { AnimatedContainer } from "@/components/shared";
import {
	fastStaggerContainerVariants,
	getGrayscaleAnimation,
	glowVariants,
	slideDownItemVariants,
} from "@/utils/animations";
import { WORK_ITEMS } from "@/utils/constants";

export interface WorkItemProps {
	logo: string;
	alt: string;
	children: React.ReactNode;
	grayScale?: boolean;
	showGlow?: boolean;
}

const WorkItem = ({
	logo,
	alt,
	children,
	showGlow = false,
	grayScale = false,
}: WorkItemProps) => {
	const grayscaleAnimation = getGrayscaleAnimation(!showGlow && grayScale);

	return (
		<motion.div
			variants={slideDownItemVariants}
			className="relative work-title"
		>
			<motion.img
				{...grayscaleAnimation}
				className="work-logo"
				src={logo}
				alt={alt}
			/>
			<span>{children}</span>
			{showGlow && (
				<motion.img
					variants={glowVariants}
					initial="initial"
					animate="animate"
					className="absolute top-0 -left-2 -z-[1] size-[4rem] object-cover blur-xl saturate-150"
					src={logo}
					alt={alt}
				/>
			)}
		</motion.div>
	);
};

const WorkSection = () => {
	const currentWork = WORK_ITEMS[0];

	return (
		<>
			<h3>
				I'm currently working at{" "}
				<a href={currentWork.link} target="_blank" rel="noreferrer">
					{currentWork.alt}
				</a>
			</h3>
			<AnimatedContainer variants={fastStaggerContainerVariants}>
				{WORK_ITEMS.map((item, index) => (
					<Fragment key={item.alt}>
						<WorkItem
							logo={item.logo}
							alt={item.alt}
							showGlow={index === 0}
							grayScale={index !== WORK_ITEMS.length - 1}
						>
							{item.content}
						</WorkItem>
						{index !== WORK_ITEMS.length - 1 && <br />}
					</Fragment>
				))}
			</AnimatedContainer>
		</>
	);
};

export default WorkSection;
