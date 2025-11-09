import { type HTMLMotionProps, motion } from "motion/react";
import { slideUpItemVariants } from "@/utils/animations";

interface AnimatedLinkProps extends HTMLMotionProps<"a"> {
  children: React.ReactNode;
}

export const AnimatedLink = ({ children, ...props }: AnimatedLinkProps) => {
  return (
    <motion.a variants={slideUpItemVariants} {...props}>
      {children}
    </motion.a>
  );
};
