import { motion } from "motion/react";

const Blog = () => {
  return (
    <div className="absolute inset-0 z-0 grid place-items-center blog-bg">
      <motion.button
        className="grid pb-[5px] px-[6px] pt-[6px] border border-white/10 bg-red-500 rounded-full place-items-center mb-6"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.2, 0.9, 1.05, 1],
          rotate: [0, -5, 5, -2, 0],
          y: [0, -2, 2, -2, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-5 fill-white"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 5, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </motion.svg>
      </motion.button>
    </div>
  );
};

export default Blog;
