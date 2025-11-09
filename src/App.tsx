import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import BGContainer from "@/components/bg-container";
import HeroWrapper from "@/components/hero-wrapper";
import Nav from "@/components/nav";
import Banner from "@/components/sections/banner";
import ContactSection from "@/components/sections/contact";
import MusicSection from "@/components/sections/music";
import ProjectsSection from "@/components/sections/projects";
import WorkSection from "@/components/sections/work";
import { ITabContext, TabContext } from "@/contexts/TabContext";
import { pageTransitionVariants } from "@/utils/animations";

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
						variants={pageTransitionVariants}
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
