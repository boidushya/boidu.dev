import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const bannerAnimStates = {
  initial: {
    opacity: 0,
    y: "-100%",
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: "-100%",
  },
};

const Banner = () => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
    localStorage.setItem("showBanner", "false");
  };

  React.useEffect(() => {
    if (localStorage.getItem("showBanner") !== "false") {
      setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          variants={bannerAnimStates}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed gap-4 p-5 mb-6 overflow-hidden text-sm border border-indigo-600 rounded-lg shadow-lg top-8 right-8 text-indigo-50 bg-indigo-950"
        >
          <p className="block mb-2 text-2xl font-bold">Psst!</p>
          <p className="pr-8 text-indigo-200 max-w-64">
            While you're here, mind checking out my extension if you use Youtube
            Music? Its called Better Lyrics and it makes your lyrics look 100x
            better!
          </p>
          <div className="flex items-center gap-2">
            <a
              className="flex items-center gap-2 px-3 py-2 pr-4 mt-4 text-xs bg-indigo-900 rounded-lg hover:bg-indigo-800 text-indigo-50 w-fit hover:no-underline"
              href="https://better-lyrics.boidu.dev/"
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="inline size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
              Learn More
            </a>
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-3 py-2 pr-4 mt-4 text-xs border border-indigo-900 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-50 w-fit hover:no-underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              No thanks
            </button>
          </div>

          <img
            src="https://raw.githubusercontent.com/boidushya/better-lyrics/master/images/icons/icon-512.png"
            className="absolute -top-6 -right-6 size-24 opacity-10"
            alt="Better Lyrics for Youtube Music"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Banner;
