export interface SocialLink {
	href: string;
	label: string;
}

export const CONTACT_TEXTS = {
	SECTION_TITLE: "Catch me on your favorite social media",
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
	{
		href: "https://twitter.com/boidushya",
		label: "Twitter",
	},
	{
		href: "https://warpcast.com/boi",
		label: "Warpcast",
	},
	{
		href: "https://t.me/boidushyaB",
		label: "Telegram",
	},
	{
		href: "https://github.com/boidushya",
		label: "Github",
	},
	{
		href: "https://linkedin.com/in/boidushya",
		label: "Linkedin",
	},
	{
		href: "mailto:hi@boidushya.com?subject=Hi Boidushya!&body=I'm coming from your website, are you up for a chat?",
		label: "Email",
	},
];

export const LINK_PROPS = {
	target: "_blank",
	rel: "noreferrer",
} as const;
