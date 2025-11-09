import { type HTMLMotionProps, motion, type Variants } from "motion/react";
import { slideUpItemVariants } from "@/utils/animations";

interface AnimatedListItemProps extends HTMLMotionProps<"li"> {
  variants?: Variants;
  children: React.ReactNode;
}

export const AnimatedListItem = ({
  children,
  variants = slideUpItemVariants,
  ...props
}: AnimatedListItemProps) => {
  return (
    <motion.li variants={variants} {...props}>
      {children}
    </motion.li>
  );
};
