import { motion } from "motion/react";
import { Fragment, memo, useMemo } from "react";
import { AnimatedContainer } from "@/components/shared";
import {
  fastStaggerContainerVariants,
  getGrayscaleAnimation,
  getOpacityAnimation,
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

const WorkItemComponent = ({
  logo,
  alt,
  children,
  showGlow = false,
  grayScale = false,
}: WorkItemProps) => {
  const isAnimated = !showGlow && grayScale;

  // Memoize animation configurations to prevent recalculation
  const grayscaleAnimation = useMemo(
    () => getGrayscaleAnimation(isAnimated),
    [isAnimated]
  );
  const opacityAnimation = useMemo(
    () => getOpacityAnimation(isAnimated),
    [isAnimated]
  );

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
        loading="lazy"
      />
      <motion.span
        {...opacityAnimation}
        className="text-[var(--color-fg-secondary)]"
      >
        {children}
      </motion.span>
      {showGlow && (
        <motion.img
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute top-0 -left-2 -z-[1] size-[4rem] object-cover blur-xl saturate-150"
          src={logo}
          alt={alt}
          loading="lazy"
        />
      )}
    </motion.div>
  );
};

const WorkItem = memo(WorkItemComponent);

const WorkSection = () => {
  const currentWork = WORK_ITEMS[0];

  // const { setActiveTab } = useContext(TabContext) as ITabContext;

  // const handleClick = () => {
  // 	setActiveTab("contact");
  // };

  return (
    <>
      <h3>
        I'm currently working at{" "}
        <a href={currentWork.link} target="_blank" rel="noreferrer">
          {currentWork.alt}
        </a>
        {/* I'm currently looking for new{" "}
				<a role="button" onClick={handleClick}>
					opportunities
				</a> */}
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
