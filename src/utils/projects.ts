export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	link: string;
	image: string;
	video?: string;
	component?: React.ComponentType;
}

export const PROJECTS_TEXT = {
	SECTION_TITLE: "Here's some stuff I've built",
} as const;
