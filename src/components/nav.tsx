import React from "react";
import { ITabContext, TabContext, TTab } from "../contexts/TabContext";

const ListItem = ({
	children,
	value,
}: {
	children: React.ReactNode;
	value: TTab;
}) => {
	const { activeTab, setActiveTab } = React.useContext(
		TabContext,
	) as ITabContext;

	const handleClick = () => {
		setActiveTab(value);
	};

	return (
		<li
			data-value={value}
			data-active={activeTab === value}
			onClick={handleClick}
			className="relative cursor-pointer transition-opacity duration-200 data-[active=false]:opacity-50"
		>
			{children}
		</li>
	);
};

const ExternalArrow = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 16 16"
		fill="currentColor"
		className="inline size-4"
	>
		<path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
		<path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
	</svg>
);

const EXTERNAL_LINKS = [
	{ href: "https://blog.boidu.dev", label: "Blog" },
	{ href: "/resume.pdf", label: "Resume" },
];

const ExternalNavLink = ({ href, label }: { href: string; label: string }) => (
	<a
		href={href}
		target="_blank"
		rel="noreferrer"
		className="flex items-center gap-1 p-0 m-0 font-bold transition-opacity duration-200 opacity-50 hover:opacity-100"
	>
		{label}
		<ExternalArrow />
	</a>
);

const Nav = () => {
	return (
		<nav className="flex flex-wrap items-center py-4 gap-x-8">
			<ul className="flex items-center gap-8 p-0 m-0 mt-8 mb-2 font-bold list-none">
				<ListItem value="projects">Projects</ListItem>
				<ListItem value="work">Work</ListItem>
				<ListItem value="music">Music</ListItem>
				<ListItem value="contact">Contact</ListItem>
			</ul>
			<div className="flex items-center gap-8 mt-4 mb-2 md:mt-8 basis-full md:basis-auto">
				{EXTERNAL_LINKS.map((link) => (
					<ExternalNavLink key={link.href} {...link} />
				))}
			</div>
		</nav>
	);
};

export default Nav;
