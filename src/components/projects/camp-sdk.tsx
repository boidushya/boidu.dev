import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const animationVariants = {
  initial: {
    scale: 0.95,
    y: 16,
    opacity: 0,
  },
  animate: {
    scale: 1,
    y: 0,
    opacity: 1,
  },
  exit: {
    scale: 0.95,
    y: 16,
    opacity: 0,
  },
};

const CampSDK = () => {
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCheckmark(true);
      setTimeout(() => setShowCheckmark(false), 1500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 grid bg-[#FFF9EC] place-items-center">
      <AnimatePresence mode="wait" initial={false}>
        {!showCheckmark ? (
          <motion.button
            className="flex items-center gap-1 px-4 py-2 mb-6 text-xs border rounded-full bg-gradient-to-b to-zinc-900 from-zinc-800 border-zinc-600/20"
            variants={animationVariants}
            initial="initial"
            animate={{
              scale: [1, 1.05, 0.95, 1.02, 1],
              y: [0, -2, 2, -2, 0],
              opacity: [1, 1, 1, 1, 1],
            }}
            exit="exit"
            key="sdk-button"
          >
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="overflow-hidden whitespace-nowrap"
            >
              Link with{" "}
            </motion.span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-4"
            >
              <path
                fill="#54ACEE"
                d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23"
              />
            </svg>
          </motion.button>
        ) : (
          <motion.div
            variants={animationVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="mb-6"
            key="checkmark"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="text-[#2D929E] size-14"
            >
              <motion.path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2 }}
              />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampSDK;
