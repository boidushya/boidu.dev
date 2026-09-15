import { AnimatePresence, motion } from "motion/react";
import React, { Suspense } from "react";
import { FallbackIcon } from "@/components/shared";
import { hoverVariants, slideUpItemVariants } from "@/utils/animations";
import { BentoSize } from "@/utils/bento-config";
import { buildClassName } from "@/utils/functions";
import type { ProjectItem } from "@/utils/projects";

interface BentoProjectCardProps extends Omit<ProjectItem, "component"> {
	PreviewComponent?: React.ComponentType;
	size?: BentoSize;
	className?: string;
}

const sizeClasses = {
	small: "sm:col-span-1 row-span-1 ",
	medium: "sm:col-span-2 row-span-2",
	large: "sm:col-span-4 row-span-2",
	wide: "sm:col-span-4 row-span-1",
	smallWide: "sm:col-span-2 row-span-1",
	tall: "sm:col-span-1 row-span-1",
};

const BentoProjectCardComponent = ({
	title,
	description,
	link,
	image,
	PreviewComponent,
	size = "small",
	className = "",
}: BentoProjectCardProps) => {
	const [imageError, setImageError] = React.useState(false);

	const styles = React.useMemo(
		() =>
			buildClassName([
				sizeClasses[size],
				className,
				"relative group cursor-pointer min-h-[128px]",
			]),
		[size, className],
	);

	return (
		<motion.div variants={slideUpItemVariants} className={styles}>
			{/* Static render surface (transform-gpu) so the rounded overflow clip is
			    honored for composited children (grayscale filter, WebGL previews) in
			    both Blink and Gecko, with a native smooth corner and a normal border. */}
			<div className="absolute inset-0 overflow-hidden border rounded-2xl isolate border-zinc-500/15 will-change-transform [transform:translateZ(0)]">
				<a
					href={link}
					target="_blank"
					rel="noreferrer"
					className="absolute inset-0 z-10 rounded-2xl focus-visible:[outline-offset:-4px]"
				>
					<span className="sr-only">{title}</span>
				</a>

				{PreviewComponent && (
					<div className="absolute inset-0 overflow-hidden transition-all duration-[400ms] ease-in-out sm:grayscale group-hover:grayscale-0 group-focus-within:grayscale-0 ">
						<Suspense fallback={null}>
							<PreviewComponent />
						</Suspense>
					</div>
				)}

				<div className="absolute inset-0 overflow-hidden bento-content-mask " />

				<div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-2 overflow-hidden ">
					<AnimatePresence mode="popLayout">
						<motion.div
							initial="initial"
							animate="animate"
							exit="exit"
							variants={hoverVariants}
						>
							<div className="flex items-center gap-2 mb-2">
								{imageError ? (
									<FallbackIcon />
								) : (
									<img
										className="flex-shrink-0 w-5 h-5 rounded-sm"
										src={image}
										alt={title}
										onError={() => setImageError(true)}
									/>
								)}
								<h4 className="text-sm font-medium truncate text-white/90">
									{title}
								</h4>
							</div>

							{(size === "medium" || size === "large" || size === "tall") && (
								<p className="text-xs leading-relaxed text-white/70 line-clamp-2">
									{description}
								</p>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</motion.div>
	);
};

export const BentoProjectCard = React.memo(BentoProjectCardComponent);
