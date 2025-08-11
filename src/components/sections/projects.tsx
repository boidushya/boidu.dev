import { AnimatePresence } from "framer-motion";
import { BentoProjectCard } from "@/components/projects/BentoProjectCard";
import { AnimatedContainer } from "@/components/shared";
import { BENTO_GRID_CLASSES, BENTO_LAYOUT_ORDER } from "@/utils/bento-config";
import { PROJECT_ITEMS } from "@/utils/constants";
import { PROJECTS_TEXT } from "@/utils/projects";

const ProjectsSection = () => {
	return (
		<>
			<h3>{PROJECTS_TEXT.SECTION_TITLE}</h3>
			<AnimatePresence initial={true} mode="popLayout">
				<AnimatedContainer className={`${BENTO_GRID_CLASSES} w-full`}>
					{BENTO_LAYOUT_ORDER.map(({ id, size }) => {
						const item = PROJECT_ITEMS.find(project => project.id === id);
						if (!item) return null;
						
						return (
							<BentoProjectCard
								key={item.id}
								id={item.id}
								title={item.title}
								description={item.description}
								link={item.link}
								image={item.image}
								size={size}
								PreviewComponent={item.component}
							/>
						);
					})}
				</AnimatedContainer>
			</AnimatePresence>
		</>
	);
};

export default ProjectsSection;
