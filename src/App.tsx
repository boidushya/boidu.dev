import React from "react";
import BGContainer from "./components/bg-container";
import HeroWrapper from "./components/hero-wrapper";
import Nav from "./components/nav";
import ContactSection from "./components/sections/contact";
import MusicSection from "./components/sections/music";
import ProjectsSection from "./components/sections/projects";
import WorkSection from "./components/sections/work";
import { AnimatePresence, motion } from "framer-motion";
import { ITabContext, TabContext } from "./contexts/TabContext";
import Banner from "./components/sections/banner";

const variants = {
  initial: {
    opacity: 0.25,
    y: 24,
    scale: 1.05,
    filter: "blur(3px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0.25,
    y: 24,
    filter: "blur(3px)",
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

const App = () => {
  const { activeTab } = React.useContext(TabContext) as ITabContext;

  return (
    <>
      <BGContainer />
      <HeroWrapper />
      <Nav />
      <main className="pb-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={activeTab}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-start"
          >
            {activeTab === "projects" && <ProjectsSection key="projects" />}
            {activeTab === "work" && <WorkSection key="work" />}
            {activeTab === "music" && <MusicSection key="music" />}
            {activeTab === "contact" && <ContactSection key="contact" />}
          </motion.section>
        </AnimatePresence>
        <Banner />
      </main>
    </>
  );
};

export default App;
